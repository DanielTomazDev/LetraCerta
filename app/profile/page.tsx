"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Navbar from "@/app/components/Navbar";
import SongCard from "@/app/components/SongCard";
import { motion } from "framer-motion";
import {
  User,
  Heart,
  Music,
  Plus,
  Upload,
  Settings,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { signOut } from "next-auth/react";

interface Song {
  _id: string;
  title: string;
  artist: string;
  genre?: string;
  createdBy?: {
    name: string;
    image?: string;
  };
}

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [favoriteSongs, setFavoriteSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
      return;
    }
    if (session) {
      fetchUserData();
    }
  }, [session, status, router]);

  const fetchUserData = async () => {
    try {
      const res = await axios.get("/api/users");
      setUser(res.data);
      setFavoriteSongs(res.data.favoriteSongs || []);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-dark-bg">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-32 bg-gray-700 rounded"></div>
            <div className="h-64 bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-dark-bg">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-dark-card border border-primary/20 rounded-xl p-8 mb-8"
        >
          <div className="flex items-center space-x-6">
            {session.user?.image ? (
              <img
                src={session.user.image}
                alt={session.user.name || "User"}
                className="w-24 h-24 rounded-full border-2 border-primary"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center border-2 border-primary">
                <User className="h-12 w-12 text-primary" />
              </div>
            )}
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-white mb-2">
                {session.user?.name || "Usuário"}
              </h1>
              <p className="text-gray-400 mb-4">{session.user?.email}</p>
              <div className="flex items-center space-x-6 text-sm text-gray-400">
                <div className="flex items-center space-x-2">
                  <Heart className="h-4 w-4" />
                  <span>{favoriteSongs.length} Favoritos</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Music className="h-4 w-4" />
                  <span>0 Músicas</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => signOut()}
              className="p-3 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors"
              title="Sair"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </motion.div>

        {/* Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-dark-card border border-primary/20 rounded-xl p-6 hover:border-primary transition-all text-left"
          >
            <Plus className="h-6 w-6 text-primary mb-3" />
            <h3 className="text-white font-semibold mb-1">Adicionar Música</h3>
            <p className="text-gray-400 text-sm">
              Faça upload de uma nova música
            </p>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-dark-card border border-primary/20 rounded-xl p-6 hover:border-primary transition-all text-left"
          >
            <Upload className="h-6 w-6 text-primary mb-3" />
            <h3 className="text-white font-semibold mb-1">
              Importar Cifra
            </h3>
            <p className="text-gray-400 text-sm">
              Importe de arquivo .txt ou .chordpro
            </p>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-dark-card border border-primary/20 rounded-xl p-6 hover:border-primary transition-all text-left"
          >
            <Settings className="h-6 w-6 text-primary mb-3" />
            <h3 className="text-white font-semibold mb-1">Configurações</h3>
            <p className="text-gray-400 text-sm">
              Personalize sua experiência
            </p>
          </motion.button>
        </div>

        {/* Favorites */}
        <div>
          <div className="flex items-center space-x-2 mb-6">
            <Heart className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold text-white">Músicas Favoritas</h2>
          </div>

          {favoriteSongs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favoriteSongs.map((song, index) => (
                <motion.div
                  key={song._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <SongCard
                    song={song}
                    isFavorite={true}
                    onFavoriteToggle={fetchUserData}
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-dark-card border border-primary/20 rounded-xl">
              <Heart className="h-16 w-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">
                Você ainda não tem músicas favoritas
              </p>
              <Link
                href="/"
                className="text-primary hover:underline mt-4 inline-block"
              >
                Explorar músicas
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

