/**
 * ⚠️ ATENÇÃO: Esta API foi desabilitada por questões de direitos autorais.
 * 
 * Importar automaticamente conteúdo de outros sites (scraping) pode violar:
 * - Direitos autorais dos sites de origem
 * - Termos de uso dos sites
 * - Leis de propriedade intelectual
 * 
 * Use apenas o método de copiar/colar manual através do modal de importação.
 */

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(request: NextRequest) {
  // API desabilitada - retornar erro imediatamente
  return NextResponse.json(
    { 
      error: "Importação automática por URL foi desabilitada por questões de direitos autorais. Por favor, use o método de copiar/colar manual."
    },
    { status: 403 }
  );

  /* CÓDIGO ORIGINAL COMENTADO - NÃO USAR
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Não autorizado" },
        { status: 401 }
      );
    }

    const { url } = await request.json();

    if (!url) {
      return NextResponse.json(
        { error: "URL é obrigatória" },
        { status: 400 }
      );
    }

    // Tentar buscar conteúdo da URL
    // NOTA: Devido a CORS e políticas de segurança, muitos sites não permitem acesso direto
    // Esta é uma implementação básica que pode não funcionar para todos os sites
    
    try {
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const html = await response.text();
      
      // Tentar extrair informações básicas do HTML
      // Isso é uma implementação simples e pode precisar ser ajustada para sites específicos
      
      // Extrair título (geralmente em <title> ou <h1>)
      const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i) || 
                        html.match(/<h1[^>]*>([^<]+)<\/h1>/i);
      const title = titleMatch ? titleMatch[1].trim() : "Música Importada";
      
      // Tentar encontrar conteúdo de letra/cifra
      // Isso varia muito entre sites, então é uma tentativa genérica
      const contentMatch = html.match(/<div[^>]*class="[^"]*letra[^"]*"[^>]*>([\s\S]*?)<\/div>/i) ||
                          html.match(/<div[^>]*class="[^"]*cifra[^"]*"[^>]*>([\s\S]*?)<\/div>/i) ||
                          html.match(/<pre[^>]*>([\s\S]*?)<\/pre>/i);
      
      let lyrics = "";
      if (contentMatch) {
        // Limpar HTML tags
        lyrics = contentMatch[1]
          .replace(/<[^>]+>/g, "\n")
          .replace(/&nbsp;/g, " ")
          .replace(/&amp;/g, "&")
          .replace(/&lt;/g, "<")
          .replace(/&gt;/g, ">")
          .trim();
      }
      
      // Tentar extrair artista do título (formato comum: "Título - Artista")
      const titleParts = title.split(/[-–]/);
      let songTitle = titleParts[0]?.trim() || title;
      let artist = titleParts[1]?.trim() || "Artista Desconhecido";
      
      return NextResponse.json({
        title: songTitle,
        artist: artist,
        lyrics: lyrics || "Não foi possível extrair a letra automaticamente. Por favor, copie e cole manualmente.",
        chords: null,
        genre: null,
        tags: null,
        originalKey: null,
        isPublic: true,
      });
    } catch (fetchError: any) {
      console.error("Error fetching URL:", fetchError);
      return NextResponse.json(
        { 
          error: "Não foi possível importar da URL. Muitos sites bloqueiam acesso direto por questões de segurança. Por favor, copie e cole o conteúdo manualmente.",
          details: fetchError.message 
        },
        { status: 400 }
      );
    }
  } catch (error: any) {
    console.error("Error importing song:", error);
    return NextResponse.json(
      { error: "Erro ao importar música" },
      { status: 500 }
    );
  }
  */
}

