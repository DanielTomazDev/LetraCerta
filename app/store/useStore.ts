import { create } from "zustand";

interface StoreState {
  currentSong: any | null;
  isPerformanceMode: boolean;
  transpose: number;
  autoScrollSpeed: number;
  isAutoScrollEnabled: boolean;
  darkMode: boolean;
  setCurrentSong: (song: any | null) => void;
  setPerformanceMode: (enabled: boolean) => void;
  setTranspose: (semitones: number) => void;
  setAutoScrollSpeed: (speed: number) => void;
  setAutoScrollEnabled: (enabled: boolean) => void;
  setDarkMode: (enabled: boolean) => void;
}

export const useStore = create<StoreState>((set) => ({
  currentSong: null,
  isPerformanceMode: false,
  transpose: 0,
  autoScrollSpeed: 50,
  isAutoScrollEnabled: false,
  darkMode: true,
  setCurrentSong: (song) => set({ currentSong: song }),
  setPerformanceMode: (enabled) => set({ isPerformanceMode: enabled }),
  setTranspose: (semitones) => set({ transpose: semitones }),
  setAutoScrollSpeed: (speed) => set({ autoScrollSpeed: speed }),
  setAutoScrollEnabled: (enabled) => set({ isAutoScrollEnabled: enabled }),
  setDarkMode: (enabled) => set({ darkMode: enabled }),
}));

