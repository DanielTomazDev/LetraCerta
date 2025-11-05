"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import SongCard from "./components/SongCard";
import AddSongModal from "./components/AddSongModal";
import ImportSongModal from "./components/ImportSongModal";
import axios from "axios";
import { motion } from "framer-motion";
import { Music2, TrendingUp, Star, Plus, Download } from "lucide-react";

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

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddSongModal, setShowAddSongModal] = useState(false);
  const [showImportSongModal, setShowImportSongModal] = useState(false);

  useEffect(() => {
    fetchSongs();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const timeout = setTimeout(() => {
        fetchSongs(searchQuery);
      }, 300);
      return () => clearTimeout(timeout);
    } else {
      fetchSongs();
    }
  }, [searchQuery]);

  const fetchSongs = async (query?: string) => {
    try {
      setLoading(true);
      const params = query ? { search: query } : {};
      const res = await axios.get("/api/songs", { params });
      
      if (res.data && res.data.songs) {
        setSongs(res.data.songs);
      } else {
        setSongs([]);
      }
    } catch (error: any) {
      console.error("Error fetching songs:", error);
      // Se houver erro, ainda exibir array vazio para não quebrar a UI
      setSongs([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="min-h-screen bg-dark-bg">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Encontre suas <span className="text-primary">músicas favoritas</span>
          </h1>
          <p className="text-gray-400 text-lg mb-8">
            Letras, cifras e acordes em um só lugar
          </p>
          <SearchBar onSearch={handleSearch} />
        </motion.div>

        {/* Highlights */}
        {!searchQuery && (
          <div className="mb-12">
            <div className="flex items-center space-x-2 mb-6">
              <TrendingUp className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold text-white">Destaques</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/30 rounded-xl p-6"
                >
                  <Music2 className="h-8 w-8 text-primary mb-3" />
                  <h3 className="text-white font-semibold text-lg mb-2">
                    Música em Destaque {i}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Uma das músicas mais populares da plataforma
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Songs List */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <Music2 className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold text-white">
                {searchQuery ? "Resultados da Busca" : "Músicas Populares"}
              </h2>
            </div>
            {session && (
              <div className="flex items-center space-x-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowImportSongModal(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-secondary hover:bg-secondary/80 text-white rounded-lg transition-colors"
                >
                  <Download className="h-5 w-5" />
                  <span>Importar</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowAddSongModal(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-primary hover:bg-primary/80 text-white rounded-lg transition-colors"
                >
                  <Plus className="h-5 w-5" />
                  <span>Adicionar</span>
                </motion.button>
              </div>
            )}
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="bg-dark-card border border-primary/20 rounded-xl p-6 animate-pulse"
                >
                  <div className="h-6 bg-gray-700 rounded mb-3"></div>
                  <div className="h-4 bg-gray-700 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          ) : songs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {songs.map((song, index) => (
                <motion.div
                  key={song._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <SongCard song={song} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Music2 className="h-16 w-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">
                {searchQuery
                  ? "Nenhuma música encontrada"
                  : "Nenhuma música disponível ainda"}
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Add Song Modal */}
      {session && (
        <>
          <AddSongModal
            isOpen={showAddSongModal}
            onClose={() => setShowAddSongModal(false)}
          />
          <ImportSongModal
            isOpen={showImportSongModal}
            onClose={() => setShowImportSongModal(false)}
          />
        </>
      )}
    </div>
  );
}

