"use client";

import Link from "next/link";
import { Music, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

interface SongCardProps {
  song: {
    _id: string;
    title: string;
    artist: string;
    genre?: string;
    createdBy?: {
      name: string;
      image?: string;
    };
  };
  isFavorite?: boolean;
  onFavoriteToggle?: () => void;
}

export default function SongCard({ song, isFavorite = false, onFavoriteToggle }: SongCardProps) {
  const { data: session } = useSession();
  const [favorite, setFavorite] = useState(isFavorite);

  const handleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!session) return;

    try {
      const res = await axios.post("/api/users/favorites", { songId: song._id });
      setFavorite(res.data.isFavorite);
      if (onFavoriteToggle) onFavoriteToggle();
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Link href={`/music/${song._id}`}>
        <div className="bg-dark-card border border-primary/20 rounded-xl p-6 hover:border-primary transition-all cursor-pointer group">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-4 flex-1">
              <div className="bg-primary/20 p-3 rounded-lg group-hover:bg-primary/30 transition-colors">
                <Music className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-semibold text-lg truncate group-hover:text-primary transition-colors">
                  {song.title}
                </h3>
                <p className="text-gray-400 text-sm mt-1">{song.artist}</p>
                {song.genre && (
                  <span className="inline-block mt-2 px-2 py-1 bg-primary/20 text-primary text-xs rounded">
                    {song.genre}
                  </span>
                )}
              </div>
            </div>
            {session && (
              <button
                onClick={handleFavorite}
                className="ml-4 p-2 hover:bg-primary/20 rounded-lg transition-colors"
              >
                <Heart
                  className={`h-5 w-5 ${
                    favorite ? "text-red-500 fill-red-500" : "text-gray-400"
                  }`}
                />
              </button>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

