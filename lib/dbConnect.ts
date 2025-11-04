import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Por favor, defina as variáveis NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY no arquivo .env.local"
  );
}

// Cliente Supabase para uso no servidor
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Cliente Supabase para uso no cliente (browser)
export function createSupabaseClient() {
  return createClient(supabaseUrl, supabaseAnonKey);
}

export default supabase;
