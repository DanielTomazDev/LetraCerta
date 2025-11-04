"use client";

import { X, Play, Pause, ChevronUp, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/app/store/useStore";
import { useEffect, useRef, useState } from "react";
import { transposeText } from "@/lib/utils/transpose";

interface PerformanceModeProps {
  lyrics: string;
  chords?: string;
}

export default function PerformanceMode({ lyrics, chords }: PerformanceModeProps) {
  const {
    isPerformanceMode,
    setPerformanceMode,
    transpose,
    autoScrollSpeed,
    isAutoScrollEnabled,
    setAutoScrollEnabled,
    setAutoScrollSpeed,
  } = useStore();

  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentLine, setCurrentLine] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const lines = lyrics.split("\n").filter((line) => line.trim());
  const linesLength = lines.length;

  useEffect(() => {
    if (isAutoScrollEnabled && isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentLine((prev) => {
          const next = prev + 1;
          if (next >= linesLength) {
            setIsPlaying(false);
            return 0;
          }
          return next;
        });
      }, 60000 / autoScrollSpeed); // BPM to interval
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAutoScrollEnabled, isPlaying, autoScrollSpeed, linesLength]);

  useEffect(() => {
    if (scrollRef.current && isPerformanceMode) {
      const lineElement = scrollRef.current.children[currentLine];
      if (lineElement) {
        lineElement.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [currentLine, isPerformanceMode]);

  const displayText = transpose !== 0 && chords ? transposeText(chords, transpose) : lyrics;

  if (!isPerformanceMode) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-dark-bg z-50 overflow-hidden"
      >
        <div className="h-full flex flex-col">
          {/* Controls */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
            <button
              onClick={() => setPerformanceMode(false)}
              className="bg-dark-surface/80 backdrop-blur-lg p-3 rounded-lg hover:bg-dark-surface transition-colors"
            >
              <X className="h-6 w-6 text-white" />
            </button>

            <div className="flex items-center space-x-4 bg-dark-surface/80 backdrop-blur-lg p-4 rounded-lg">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="bg-primary hover:bg-secondary p-3 rounded-lg transition-colors"
              >
                {isPlaying ? (
                  <Pause className="h-6 w-6 text-white" />
                ) : (
                  <Play className="h-6 w-6 text-white" />
                )}
              </button>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setAutoScrollSpeed(Math.max(30, autoScrollSpeed - 10))}
                  className="p-2 hover:bg-primary/20 rounded transition-colors"
                >
                  <ChevronDown className="h-5 w-5 text-white" />
                </button>
                <span className="text-white font-semibold w-16 text-center">
                  {autoScrollSpeed} BPM
                </span>
                <button
                  onClick={() => setAutoScrollSpeed(Math.min(200, autoScrollSpeed + 10))}
                  className="p-2 hover:bg-primary/20 rounded transition-colors"
                >
                  <ChevronUp className="h-5 w-5 text-white" />
                </button>
              </div>

              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isAutoScrollEnabled}
                  onChange={(e) => setAutoScrollEnabled(e.target.checked)}
                  className="w-4 h-4 text-primary rounded focus:ring-primary"
                />
                <span className="text-white text-sm">Auto-scroll</span>
              </label>
            </div>
          </div>

          {/* Lyrics Display */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto px-8 py-24 text-center"
          >
            {displayText.split("\n").map((line, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0.3 }}
                animate={{
                  opacity: index === currentLine ? 1 : index < currentLine ? 0.5 : 0.3,
                  scale: index === currentLine ? 1.1 : 1,
                }}
                className={`text-4xl md:text-6xl lg:text-7xl font-semibold mb-8 transition-all duration-300 ${
                  index === currentLine
                    ? "text-primary"
                    : index < currentLine
                    ? "text-gray-500"
                    : "text-gray-600"
                }`}
              >
                {line.trim() || "\u00A0"}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

