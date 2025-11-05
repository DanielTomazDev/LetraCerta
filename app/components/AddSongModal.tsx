"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface AddSongModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddSongModal({ isOpen, onClose }: AddSongModalProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    artist: "",
    lyrics: "",
    chords: "",
    genre: "",
    tags: "",
    originalKey: "",
    isPublic: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Processar tags (separar por vírgula)
      const tagsArray = formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0);

      const songData = {
        title: formData.title,
        artist: formData.artist,
        lyrics: formData.lyrics,
        chords: formData.chords || null,
        genre: formData.genre || null,
        tags: tagsArray.length > 0 ? tagsArray : null,
        originalKey: formData.originalKey || null,
        isPublic: formData.isPublic,
      };

      await axios.post("/api/songs", songData);

      // Resetar formulário
      setFormData({
        title: "",
        artist: "",
        lyrics: "",
        chords: "",
        genre: "",
        tags: "",
        originalKey: "",
        isPublic: true,
      });

      // Fechar modal
      onClose();
      
      // Recarregar a página para atualizar a lista
      window.location.reload();
    } catch (err: any) {
      console.error("Error creating song:", err);
      setError(
        err.response?.data?.error || "Erro ao criar música. Tente novamente."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div
              className="bg-dark-card border border-primary/20 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-primary/20">
                <h2 className="text-2xl font-bold text-white">
                  Adicionar Nova Música
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <X className="h-5 w-5 text-gray-400" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                {error && (
                  <div className="bg-red-500/20 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg">
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Título <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      className="w-full px-4 py-2 bg-dark-bg border border-primary/20 rounded-lg text-white focus:outline-none focus:border-primary"
                      placeholder="Ex: Bohemian Rhapsody"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Artista <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.artist}
                      onChange={(e) =>
                        setFormData({ ...formData, artist: e.target.value })
                      }
                      className="w-full px-4 py-2 bg-dark-bg border border-primary/20 rounded-lg text-white focus:outline-none focus:border-primary"
                      placeholder="Ex: Queen"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Letra <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    value={formData.lyrics}
                    onChange={(e) =>
                      setFormData({ ...formData, lyrics: e.target.value })
                    }
                    rows={8}
                    className="w-full px-4 py-2 bg-dark-bg border border-primary/20 rounded-lg text-white focus:outline-none focus:border-primary resize-none"
                    placeholder="Cole ou digite a letra da música aqui..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Acordes (Cifra)
                  </label>
                  <textarea
                    value={formData.chords}
                    onChange={(e) =>
                      setFormData({ ...formData, chords: e.target.value })
                    }
                    rows={6}
                    className="w-full px-4 py-2 bg-dark-bg border border-primary/20 rounded-lg text-white focus:outline-none focus:border-primary resize-none font-mono text-sm"
                    placeholder="Cole a cifra aqui (opcional)..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Gênero
                    </label>
                    <input
                      type="text"
                      value={formData.genre}
                      onChange={(e) =>
                        setFormData({ ...formData, genre: e.target.value })
                      }
                      className="w-full px-4 py-2 bg-dark-bg border border-primary/20 rounded-lg text-white focus:outline-none focus:border-primary"
                      placeholder="Ex: Rock, Pop, Sertanejo"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Tom Original
                    </label>
                    <input
                      type="text"
                      value={formData.originalKey}
                      onChange={(e) =>
                        setFormData({ ...formData, originalKey: e.target.value })
                      }
                      className="w-full px-4 py-2 bg-dark-bg border border-primary/20 rounded-lg text-white focus:outline-none focus:border-primary"
                      placeholder="Ex: C, D, E"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Tags
                    </label>
                    <input
                      type="text"
                      value={formData.tags}
                      onChange={(e) =>
                        setFormData({ ...formData, tags: e.target.value })
                      }
                      className="w-full px-4 py-2 bg-dark-bg border border-primary/20 rounded-lg text-white focus:outline-none focus:border-primary"
                      placeholder="Ex: balada, rock, nacional"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Separe por vírgula
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isPublic"
                    checked={formData.isPublic}
                    onChange={(e) =>
                      setFormData({ ...formData, isPublic: e.target.checked })
                    }
                    className="w-4 h-4 text-primary bg-dark-bg border-primary/20 rounded focus:ring-primary"
                  />
                  <label htmlFor="isPublic" className="text-sm text-gray-300">
                    Tornar música pública
                  </label>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end space-x-4 pt-4 border-t border-primary/20">
                  <button
                    type="button"
                    onClick={onClose}
                    disabled={loading}
                    className="px-6 py-2 text-gray-400 hover:text-white transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2 bg-primary hover:bg-primary/80 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? "Salvando..." : "Adicionar Música"}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

