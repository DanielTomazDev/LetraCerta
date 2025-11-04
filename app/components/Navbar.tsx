"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Music, Search, User, LogOut, LogIn } from "lucide-react";
import { motion } from "framer-motion";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="bg-dark-surface border-b border-primary/20 sticky top-0 z-50 backdrop-blur-lg bg-opacity-90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2 group">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <Music className="h-6 w-6 text-primary" />
            </motion.div>
            <span className="text-xl font-bold text-white group-hover:text-primary transition-colors">
              LetraCerta
            </span>
          </Link>

          <div className="flex items-center space-x-4">
            <Link
              href="/"
              className="text-gray-300 hover:text-primary transition-colors flex items-center space-x-1"
            >
              <Search className="h-5 w-5" />
              <span className="hidden sm:inline">Buscar</span>
            </Link>

            {session ? (
              <>
                <Link
                  href="/profile"
                  className="text-gray-300 hover:text-primary transition-colors flex items-center space-x-1"
                >
                  <User className="h-5 w-5" />
                  <span className="hidden sm:inline">{session.user?.name}</span>
                </Link>
                <button
                  onClick={() => signOut()}
                  className="text-gray-300 hover:text-red-400 transition-colors flex items-center space-x-1"
                >
                  <LogOut className="h-5 w-5" />
                  <span className="hidden sm:inline">Sair</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => signIn("google")}
                className="bg-primary hover:bg-secondary text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-1"
              >
                <LogIn className="h-5 w-5" />
                <span>Entrar</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

