"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import axios from "axios";
import Navbar from "@/app/components/Navbar";
import TransposeControl from "@/app/components/TransposeControl";
import PerformanceMode from "@/app/components/PerformanceMode";
import { useStore } from "@/app/store/useStore";
import { transposeText } from "@/lib/utils/transpose";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Play,
  Heart,
  Download,
  Upload,
  Edit,
  Share2,
} from "lucide-react";
import Link from "next/link";

interface Song {
  _id: string;
  title: string;
  artist: string;
  lyrics: string;
  chords?: string;
  genre?: string;
  tags?: string[];
  originalKey?: string;
  createdBy?: {
    _id: string;
    name: string;
    image?: string;
  };
}

export default function MusicPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { data: session } = useSession();
  const { transpose, setPerformanceMode, setCurrentSong } = useStore();
  const [song, setSong] = useState<Song | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [userFavorites, setUserFavorites] = useState<string[]>([]);

  useEffect(() => {
    fetchSong();
    if (session) {
      fetchUserFavorites();
    }
  }, [params.id, session]);

  const fetchSong = async () => {
    try {
      const res = await axios.get(`/api/songs/${params.id}`);
      setSong(res.data);
      setCurrentSong(res.data);
    } catch (error) {
      console.error("Error fetching song:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserFavorites = async () => {
    try {
      const res = await axios.get("/api/users");
      setUserFavorites(res.data.favoriteSongs || []);
      setIsFavorite(
        res.data.favoriteSongs?.some(
          (id: string) => id.toString() === params.id
        ) || false
      );
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  };

  const handleFavorite = async () => {
    if (!session) return;
    try {
      const res = await axios.post("/api/users/favorites", {
        songId: params.id,
      });
      setIsFavorite(res.data.isFavorite);
      fetchUserFavorites();
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  const handlePerformanceMode = () => {
    setPerformanceMode(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-bg">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-700 rounded w-1/3"></div>
            <div className="h-4 bg-gray-700 rounded"></div>
            <div className="h-64 bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!song) {
    return (
      <div className="min-h-screen bg-dark-bg">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-8 text-center">
          <p className="text-gray-400 text-lg">Música não encontrada</p>
          <Link href="/" className="text-primary hover:underline mt-4 inline-block">
            Voltar para home
          </Link>
        </div>
      </div>
    );
  }

  const displayLyrics = transpose !== 0 && song.chords
    ? transposeText(song.chords, transpose)
    : song.lyrics;

  return (
    <div className="min-h-screen bg-dark-bg">
      <Navbar />
      <PerformanceMode lyrics={song.lyrics} chords={song.chords} />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-gray-400 hover:text-primary transition-colors mb-4"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Voltar</span>
          </Link>

          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                {song.title}
              </h1>
              <p className="text-xl text-gray-400">{song.artist}</p>
              {song.genre && (
                <span className="inline-block mt-3 px-3 py-1 bg-primary/20 text-primary text-sm rounded">
                  {song.genre}
                </span>
              )}
            </div>

            <div className="flex items-center space-x-2">
              {session && (
                <button
                  onClick={handleFavorite}
                  className="p-3 bg-dark-card border border-primary/20 rounded-lg hover:bg-primary/20 transition-colors"
                  title={isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
                >
                  <Heart
                    className={`h-5 w-5 ${
                      isFavorite ? "text-red-500 fill-red-500" : "text-gray-400"
                    }`}
                  />
                </button>
              )}
              <button
                onClick={handlePerformanceMode}
                className="p-3 bg-primary hover:bg-secondary text-white rounded-lg transition-colors flex items-center space-x-2"
              >
                <Play className="h-5 w-5" />
                <span className="hidden sm:inline">Modo Performance</span>
              </button>
            </div>
          </div>

          <TransposeControl />
        </motion.div>

        {/* Lyrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-dark-card border border-primary/20 rounded-xl p-8"
        >
          <div className="prose prose-invert max-w-none">
            <pre className="whitespace-pre-wrap text-white font-mono text-lg leading-relaxed">
              {displayLyrics}
            </pre>
          </div>
        </motion.div>

        {/* Tags */}
        {song.tags && song.tags.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {song.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-dark-surface text-gray-300 text-sm rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Author Info */}
        {song.createdBy && (
          <div className="mt-8 p-4 bg-dark-surface rounded-lg border border-primary/10">
            <p className="text-gray-400 text-sm">
              Adicionada por <span className="text-primary">{song.createdBy.name}</span>
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

