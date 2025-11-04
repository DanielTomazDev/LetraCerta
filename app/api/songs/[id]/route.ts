import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { supabase } from "@/lib/dbConnect";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { data: song, error } = await supabase
      .from("songs")
      .select("*, users!songs_createdBy_fkey(id, name, image)")
      .eq("id", params.id)
      .single();

    if (error || !song) {
      return NextResponse.json(
        { error: "Música não encontrada" },
        { status: 404 }
      );
    }

    // Formatar resposta
    const formattedSong = {
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
            _id: song.users.id,
            name: song.users.name,
            image: song.users.image,
          }
        : null,
    };

    return NextResponse.json(formattedSong);
  } catch (error: any) {
    console.error("Error fetching song:", error);
    return NextResponse.json(
      { error: "Erro ao buscar música" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Não autorizado" },
        { status: 401 }
      );
    }

    // Verificar se a música existe
    const { data: song, error: songError } = await supabase
      .from("songs")
      .select("createdBy")
      .eq("id", params.id)
      .single();

    if (songError || !song) {
      return NextResponse.json(
        { error: "Música não encontrada" },
        { status: 404 }
      );
    }

    // Buscar usuário
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

    // Verificar se o usuário é o criador
    if (song.createdBy !== user.id) {
      return NextResponse.json(
        { error: "Não autorizado" },
        { status: 403 }
      );
    }

    const body = await request.json();

    // Atualizar música
    const { data: updatedSong, error: updateError } = await supabase
      .from("songs")
      .update(body)
      .eq("id", params.id)
      .select()
      .single();

    if (updateError) {
      throw updateError;
    }

    const formattedSong = {
      _id: updatedSong.id,
      ...updatedSong,
    };

    return NextResponse.json(formattedSong);
  } catch (error: any) {
    console.error("Error updating song:", error);
    return NextResponse.json(
      { error: "Erro ao atualizar música" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Não autorizado" },
        { status: 401 }
      );
    }

    // Verificar se a música existe
    const { data: song, error: songError } = await supabase
      .from("songs")
      .select("createdBy")
      .eq("id", params.id)
      .single();

    if (songError || !song) {
      return NextResponse.json(
        { error: "Música não encontrada" },
        { status: 404 }
      );
    }

    // Buscar usuário
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

    // Verificar se o usuário é o criador
    if (song.createdBy !== user.id) {
      return NextResponse.json(
        { error: "Não autorizado" },
        { status: 403 }
      );
    }

    // Deletar música
    const { error: deleteError } = await supabase
      .from("songs")
      .delete()
      .eq("id", params.id);

    if (deleteError) {
      throw deleteError;
    }

    return NextResponse.json({ message: "Música deletada com sucesso" });
  } catch (error: any) {
    console.error("Error deleting song:", error);
    return NextResponse.json(
      { error: "Erro ao deletar música" },
      { status: 500 }
    );
  }
}
