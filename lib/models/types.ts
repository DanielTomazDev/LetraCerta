export interface User {
  id: string;
  name: string;
  email: string;
  image?: string | null;
  favoriteSongs: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Song {
  id: string;
  title: string;
  artist: string;
  lyrics: string;
  chords?: string | null;
  genre?: string | null;
  tags?: string[] | null;
  createdBy: string;
  isPublic: boolean;
  originalKey?: string | null;
  createdAt: string;
  updatedAt: string;
  createdByUser?: {
    name: string;
    image?: string | null;
  };
}

export interface Playlist {
  id: string;
  name: string;
  description?: string | null;
  songs: string[];
  createdBy: string;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
}

