import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { supabase } from "@/lib/dbConnect";

// Detectar URL automaticamente em produção
// O NextAuth usa NEXTAUTH_URL automaticamente, mas podemos melhorar a detecção
const getBaseUrl = () => {
  // Prioridade 1: NEXTAUTH_URL (definido manualmente pelo usuário)
  if (process.env.NEXTAUTH_URL) {
    return process.env.NEXTAUTH_URL;
  }
  
  // Prioridade 2: URL do Netlify (fornecida automaticamente)
  if (process.env.URL) {
    return process.env.URL;
  }
  
  // Prioridade 3: VERCEL_URL (para Vercel)
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  
  // Prioridade 4: Deprecated NETLIFY_URL (se ainda existir)
  if (process.env.NETLIFY_URL) {
    return `https://${process.env.NETLIFY_URL}`;
  }
  
  // Fallback para desenvolvimento local
  return "http://localhost:3000";
};

// Definir NEXTAUTH_URL se não estiver definido (para detecção automática)
if (!process.env.NEXTAUTH_URL && process.env.NODE_ENV === "production") {
  process.env.NEXTAUTH_URL = getBaseUrl();
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        try {
          // Verificar se o usuário já existe
          const { data: existingUser } = await supabase
            .from("users")
            .select("id")
            .eq("email", user.email)
            .single();

          // Se não existe, criar novo usuário
          if (!existingUser) {
            const { error } = await supabase.from("users").insert({
              name: user.name,
              email: user.email,
              image: user.image,
              favoriteSongs: [],
            });

            if (error) {
              console.error("Error creating user:", error);
              return false;
            }
          }
        } catch (error) {
          console.error("Error during sign in:", error);
          return false;
        }
      }
      return true;
    },
    async session({ session, token }) {
      if (session?.user?.email) {
        const { data: user } = await supabase
          .from("users")
          .select("id")
          .eq("email", session.user.email)
          .single();

        if (user) {
          session.user.id = user.id;
        }
      }
      return session;
    },
  },
  pages: {
    signIn: "/",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

