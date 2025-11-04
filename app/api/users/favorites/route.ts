import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { supabase } from "@/lib/dbConnect";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Não autorizado" },
        { status: 401 }
      );
    }

    const { songId } = await request.json();

    // Buscar usuário
    const { data: user, error: userError } = await supabase
      .from("users")
      .select("id, favoriteSongs")
      .eq("email", session.user.email)
      .single();

    if (userError || !user) {
      return NextResponse.json(
        { error: "Usuário não encontrado" },
        { status: 404 }
      );
    }

    const currentFavorites = user.favoriteSongs || [];
    const isFavorite = currentFavorites.includes(songId);

    let newFavorites: string[];

    if (isFavorite) {
      // Remover dos favoritos
      newFavorites = currentFavorites.filter((id: string) => id !== songId);
    } else {
      // Adicionar aos favoritos
      newFavorites = [...currentFavorites, songId];
    }

    // Atualizar favoritos
    const { error: updateError } = await supabase
      .from("users")
      .update({ favoriteSongs: newFavorites })
      .eq("id", user.id);

    if (updateError) {
      throw updateError;
    }

    return NextResponse.json({
      message: isFavorite ? "Removido dos favoritos" : "Adicionado aos favoritos",
      isFavorite: !isFavorite,
    });
  } catch (error: any) {
    console.error("Error toggling favorite:", error);
    return NextResponse.json(
      { error: "Erro ao atualizar favoritos" },
      { status: 500 }
    );
  }
}
