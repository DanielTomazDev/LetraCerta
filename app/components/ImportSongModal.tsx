"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, FileText } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface ImportSongModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ImportSongModal({
  isOpen,
  onClose,
}: ImportSongModalProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pastedContent, setPastedContent] = useState("");
  const [parsedSong, setParsedSong] = useState<any>(null);

  const parsePastedContent = (content: string) => {
    try {
      // Tentar detectar formato comum de letras/cifras
      const lines = content.split("\n").filter((line) => line.trim());
      
      // Procurar por título e artista (geralmente nas primeiras linhas)
      let title = "";
      let artist = "";
      let lyrics = "";
      let chords = "";
      
      // Tentar encontrar título e artista
      // Formato comum: "Título - Artista" ou "Artista - Título"
      const firstLine = lines[0] || "";
      const titleMatch = firstLine.match(/(.+?)\s*[-–]\s*(.+)/);
      
      if (titleMatch) {
        title = titleMatch[1].trim();
        artist = titleMatch[2].trim();
        lyrics = lines.slice(1).join("\n");
      } else {
        // Se não encontrar, assumir que a primeira linha é o título
        title = firstLine;
        artist = lines[1] || "";
        lyrics = lines.slice(2).join("\n");
      }
      
      // Separar acordes e letras (acordes geralmente estão entre colchetes ou são acordes soltos)
      const lyricsLines = lyrics.split("\n");
      const lyricsOnly: string[] = [];
      const chordsOnly: string[] = [];
      
      lyricsLines.forEach((line) => {
        // Detectar se a linha tem acordes (geralmente em maiúsculas ou com símbolos de acorde)
        const chordPattern = /\[?([A-G][#b]?(?:m|maj|min|dim|aug|sus)?[0-9]?)\]?/gi;
        const hasChords = chordPattern.test(line);
        
        if (hasChords && line.length < 50) {
          // Linha curta com acordes, provavelmente é só acorde
          chordsOnly.push(line);
        } else {
          lyricsOnly.push(line);
        }
      });
      
      chords = chordsOnly.join("\n");
      lyrics = lyricsOnly.join("\n");
      
      return {
        title: title || "Música Importada",
        artist: artist || "Artista Desconhecido",
        lyrics: lyrics || content,
        chords: chords || null,
        genre: null,
        tags: null,
        originalKey: null,
        isPublic: true,
      };
    } catch (err) {
      console.error("Error parsing content:", err);
      return null;
    }
  };

  const handleParseContent = () => {
    if (!pastedContent.trim()) {
      setError("Por favor, cole o conteúdo da música");
      return;
    }

    const parsed = parsePastedContent(pastedContent);
    if (parsed) {
      setParsedSong(parsed);
      setError(null);
    } else {
      setError("Não foi possível analisar o conteúdo. Tente formatar manualmente.");
    }
  };


  const handleSaveSong = async () => {
    if (!parsedSong) {
      setError("Nenhuma música para salvar");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await axios.post("/api/songs", parsedSong);
      onClose();
      window.location.reload();
    } catch (err: any) {
      console.error("Error saving song:", err);
      setError(
        err.response?.data?.error || "Erro ao salvar música. Tente novamente."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleEditParsed = (field: string, value: string) => {
    if (parsedSong) {
      setParsedSong({ ...parsedSong, [field]: value });
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
              className="bg-dark-card border border-primary/20 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-primary/20 sticky top-0 bg-dark-card z-10">
                <h2 className="text-2xl font-bold text-white">
                  Importar Música (Copiar/Colar)
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <X className="h-5 w-5 text-gray-400" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {error && (
                  <div className="bg-red-500/20 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg">
                    {error}
                  </div>
                )}

                {/* Mode Selection - Removido modo URL para evitar problemas de direitos autorais */}
                <div className="bg-blue-500/20 border border-blue-500/50 text-blue-400 px-4 py-3 rounded-lg mb-4">
                  <p className="text-sm">
                    <strong>Importante:</strong> Por questões de direitos autorais, 
                    você deve copiar e colar manualmente o conteúdo das letras. 
                    Não importamos automaticamente de outros sites.
                  </p>
                </div>

                {/* Paste Mode */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Cole o conteúdo da música (letra, cifra, etc.)
                    </label>
                    <textarea
                      value={pastedContent}
                      onChange={(e) => setPastedContent(e.target.value)}
                      rows={12}
                      className="w-full px-4 py-2 bg-dark-bg border border-primary/20 rounded-lg text-white focus:outline-none focus:border-primary resize-none font-mono text-sm"
                      placeholder="Cole aqui o conteúdo da música...&#10;&#10;Exemplo:&#10;Bohemian Rhapsody - Queen&#10;&#10;[Am] Is this the real life?&#10;[F] Is this just fantasy?&#10;..."
                    />
                  </div>
                  <button
                    onClick={handleParseContent}
                    disabled={!pastedContent.trim()}
                    className="px-6 py-2 bg-primary hover:bg-primary/80 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Analisar Conteúdo
                  </button>
                </div>

                {/* Parsed Song Preview/Edit */}
                {parsedSong && (
                  <div className="space-y-4 border-t border-primary/20 pt-4">
                    <h3 className="text-lg font-semibold text-white">
                      Pré-visualização
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Título
                        </label>
                        <input
                          type="text"
                          value={parsedSong.title}
                          onChange={(e) =>
                            handleEditParsed("title", e.target.value)
                          }
                          className="w-full px-4 py-2 bg-dark-bg border border-primary/20 rounded-lg text-white focus:outline-none focus:border-primary"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Artista
                        </label>
                        <input
                          type="text"
                          value={parsedSong.artist}
                          onChange={(e) =>
                            handleEditParsed("artist", e.target.value)
                          }
                          className="w-full px-4 py-2 bg-dark-bg border border-primary/20 rounded-lg text-white focus:outline-none focus:border-primary"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Letra
                      </label>
                      <textarea
                        value={parsedSong.lyrics}
                        onChange={(e) =>
                          handleEditParsed("lyrics", e.target.value)
                        }
                        rows={8}
                        className="w-full px-4 py-2 bg-dark-bg border border-primary/20 rounded-lg text-white focus:outline-none focus:border-primary resize-none"
                      />
                    </div>

                    {parsedSong.chords && (
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Acordes
                        </label>
                        <textarea
                          value={parsedSong.chords}
                          onChange={(e) =>
                            handleEditParsed("chords", e.target.value)
                          }
                          rows={6}
                          className="w-full px-4 py-2 bg-dark-bg border border-primary/20 rounded-lg text-white focus:outline-none focus:border-primary resize-none font-mono text-sm"
                        />
                      </div>
                    )}

                    <div className="flex items-center justify-end space-x-4 pt-4 border-t border-primary/20">
                      <button
                        type="button"
                        onClick={() => setParsedSong(null)}
                        className="px-6 py-2 text-gray-400 hover:text-white transition-colors"
                      >
                        Limpar
                      </button>
                      <button
                        onClick={handleSaveSong}
                        disabled={loading || !parsedSong}
                        className="px-6 py-2 bg-primary hover:bg-primary/80 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {loading ? "Salvando..." : "Salvar Música"}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}


