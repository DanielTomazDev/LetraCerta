import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { supabase } from "@/lib/dbConnect";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Não autorizado" },
        { status: 401 }
      );
    }

    // Buscar usuário
    const { data: user, error } = await supabase
      .from("users")
      .select("id, name, email, image, favoriteSongs, createdAt, updatedAt")
      .eq("email", session.user.email)
      .single();

    if (error || !user) {
      return NextResponse.json(
        { error: "Usuário não encontrado" },
        { status: 404 }
      );
    }

    // Buscar músicas favoritas
    let favoriteSongs: any[] = [];
    if (user.favoriteSongs && user.favoriteSongs.length > 0) {
      const { data: songs } = await supabase
        .from("songs")
        .select("*")
        .in("id", user.favoriteSongs);

      favoriteSongs = songs || [];
    }

    // Buscar playlists
    let playlists: any[] = [];
    const { data: userPlaylists } = await supabase
      .from("playlists")
      .select("*")
      .eq("createdBy", user.id);

    playlists = userPlaylists || [];

    // Formatar resposta
    const formattedUser = {
      _id: user.id,
      name: user.name,
      email: user.email,
      image: user.image,
      favoriteSongs: favoriteSongs.map((song) => ({
        _id: song.id,
        title: song.title,
        artist: song.artist,
        genre: song.genre,
        createdBy: song.createdBy,
      })),
      playlists: playlists.map((playlist) => ({
        _id: playlist.id,
        name: playlist.name,
        description: playlist.description,
        songs: playlist.songs,
        isPublic: playlist.isPublic,
      })),
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    return NextResponse.json(formattedUser);
  } catch (error: any) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "Erro ao buscar usuário" },
      { status: 500 }
    );
  }
}
