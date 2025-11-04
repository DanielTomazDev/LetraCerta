"use client";

import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";
import { useStore } from "@/app/store/useStore";

export default function TransposeControl() {
  const { transpose, setTranspose } = useStore();

  const transposeUp = () => {
    if (transpose < 11) setTranspose(transpose + 1);
  };

  const transposeDown = () => {
    if (transpose > -11) setTranspose(transpose - 1);
  };

  const reset = () => {
    setTranspose(0);
  };

  const getKeyName = (semitones: number) => {
    const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
    return notes[(semitones + 12) % 12];
  };

  return (
    <div className="flex items-center space-x-4 bg-dark-card border border-primary/20 rounded-xl p-4">
      <span className="text-gray-300 text-sm">Tom:</span>
      <div className="flex items-center space-x-2">
        <button
          onClick={transposeDown}
          className="p-2 bg-primary/20 hover:bg-primary/30 rounded-lg transition-colors"
        >
          <ChevronLeft className="h-5 w-5 text-primary" />
        </button>
        <motion.span
          key={transpose}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          className="text-primary font-bold text-xl w-12 text-center"
        >
          {transpose === 0 ? "C" : transpose > 0 ? `+${transpose}` : transpose}
          {transpose !== 0 && (
            <span className="text-sm text-gray-400 ml-1">
              ({getKeyName(transpose)})
            </span>
          )}
        </motion.span>
        <button
          onClick={transposeUp}
          className="p-2 bg-primary/20 hover:bg-primary/30 rounded-lg transition-colors"
        >
          <ChevronRight className="h-5 w-5 text-primary" />
        </button>
      </div>
      {transpose !== 0 && (
        <button
          onClick={reset}
          className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
          title="Resetar tom"
        >
          <RotateCcw className="h-4 w-4 text-gray-300" />
        </button>
      )}
    </div>
  );
}

