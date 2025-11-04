-- Tabela de usuários
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  image TEXT,
  "favoriteSongs" UUID[] DEFAULT '{}',
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de músicas
CREATE TABLE IF NOT EXISTS songs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  artist TEXT NOT NULL,
  lyrics TEXT NOT NULL,
  chords TEXT,
  genre TEXT,
  tags TEXT[],
  "createdBy" UUID REFERENCES users(id) ON DELETE CASCADE,
  "isPublic" BOOLEAN DEFAULT TRUE,
  "originalKey" TEXT,
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de playlists
CREATE TABLE IF NOT EXISTS playlists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  songs UUID[] DEFAULT '{}',
  "createdBy" UUID REFERENCES users(id) ON DELETE CASCADE,
  "isPublic" BOOLEAN DEFAULT FALSE,
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_songs_created_by ON songs("createdBy");
CREATE INDEX IF NOT EXISTS idx_songs_is_public ON songs("isPublic");
CREATE INDEX IF NOT EXISTS idx_songs_title ON songs USING gin(to_tsvector('portuguese', title));
CREATE INDEX IF NOT EXISTS idx_songs_artist ON songs USING gin(to_tsvector('portuguese', artist));
CREATE INDEX IF NOT EXISTS idx_songs_lyrics ON songs USING gin(to_tsvector('portuguese', lyrics));
CREATE INDEX IF NOT EXISTS idx_playlists_created_by ON playlists("createdBy");

-- Função para atualizar updatedAt automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW."updatedAt" = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers para atualizar updatedAt
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_songs_updated_at BEFORE UPDATE ON songs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_playlists_updated_at BEFORE UPDATE ON playlists
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- NOTA: As políticas de segurança (RLS) são gerenciadas via API Routes do Next.js
-- As APIs Routes controlam o acesso aos dados baseado na autenticação do NextAuth
-- Não é necessário habilitar RLS no Supabase para este projeto

