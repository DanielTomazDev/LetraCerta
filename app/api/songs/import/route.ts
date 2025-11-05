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
}

