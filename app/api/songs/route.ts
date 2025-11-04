import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { supabase } from "@/lib/dbConnect";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    let query = supabase
      .from("songs")
      .select("*, users!songs_createdBy_fkey(id, name, image)", {
        count: "exact",
      })
      .eq("isPublic", true)
      .order("createdAt", { ascending: false })
      .range(from, to);

    if (search) {
      query = query.or(
        `title.ilike.%${search}%,artist.ilike.%${search}%,lyrics.ilike.%${search}%`
      );
    }

    const { data: songs, error, count } = await query;

    if (error) {
      throw error;
    }

    // Formatar dados para manter compatibilidade
    const formattedSongs = songs?.map((song: any) => ({
      _id: song.id,
      title: song.title,
      artist: song.artist,
      lyrics: song.lyrics,
      chords: song.chords,
      genre: song.genre,
      tags: song.tags,
      isPublic: song.isPublic,
      originalKey: song.originalKey,
      createdAt: song.createdAt,
      updatedAt: song.updatedAt,
      createdBy: song.users
        ? {
            name: song.users.name,
            image: song.users.image,
          }
        : null,
    }));

    return NextResponse.json({
      songs: formattedSongs || [],
      total: count || 0,
      page,
      totalPages: Math.ceil((count || 0) / limit),
    });
  } catch (error: any) {
    console.error("Error fetching songs:", error);
    return NextResponse.json(
      { error: "Erro ao buscar músicas" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Não autorizado" },
        { status: 401 }
      );
    }

    const body = await request.json();

    // Buscar usuário pelo email
    const { data: user, error: userError } = await supabase
      .from("users")
      .select("id")
      .eq("email", session.user.email)
      .single();

    if (userError || !user) {
      return NextResponse.json(
        { error: "Usuário não encontrado" },
        { status: 404 }
      );
    }

    // Criar música
    const { data: song, error: songError } = await supabase
      .from("songs")
      .insert({
        ...body,
        createdBy: user.id,
        isPublic: body.isPublic !== undefined ? body.isPublic : true,
      })
      .select()
      .single();

    if (songError) {
      throw songError;
    }

    // Formatar resposta
    const formattedSong = {
      _id: song.id,
      ...song,
    };

    return NextResponse.json(formattedSong, { status: 201 });
  } catch (error: any) {
    console.error("Error creating song:", error);
    return NextResponse.json(
      { error: "Erro ao criar música" },
      { status: 500 }
    );
  }
}
