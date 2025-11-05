/**
 * Script para popular o banco de dados com músicas de exemplo
 * 
 * IMPORTANTE: Este script deve ser executado apenas uma vez para adicionar músicas de exemplo.
 * As músicas aqui são apenas exemplos e devem ser substituídas por conteúdo real.
 */

import { supabase } from "@/lib/dbConnect";

const exampleSongs = [
  {
    title: "Bohemian Rhapsody",
    artist: "Queen",
    lyrics: `Is this the real life?
Is this just fantasy?
Caught in a landslide
No escape from reality
Open your eyes
Look up to the skies and see
I'm just a poor boy, I need no sympathy
Because I'm easy come, easy go
Little high, little low
Any way the wind blows
Doesn't really matter to me, to me

Mama, just killed a man
Put a gun against his head
Pulled my trigger, now he's dead
Mama, life had just begun
But now I've gone and thrown it all away
Mama, ooh
Didn't mean to make you cry
If I'm not back again this time tomorrow
Carry on, carry on
As if nothing really matters`,
    chords: `Am    Bb   F
Is this the real life?
F    Am
Is this just fantasy?
Am    Bb   F
Caught in a landslide
F    Am
No escape from reality`,
    genre: "Rock",
    tags: ["rock", "classic", "british"],
    originalKey: "Bb",
    isPublic: true,
  },
  {
    title: "Imagine",
    artist: "John Lennon",
    lyrics: `Imagine there's no heaven
It's easy if you try
No hell below us
Above us, only sky
Imagine all the people
Living for today

Imagine there's no countries
It isn't hard to do
Nothing to kill or die for
And no religion, too
Imagine all the people
Living life in peace`,
    chords: `C          F
Imagine there's no heaven
C          F
It's easy if you try
C          F
No hell below us
C          F
Above us, only sky
C          F
Imagine all the people
F          C
Living for today`,
    genre: "Rock",
    tags: ["rock", "peace", "classic"],
    originalKey: "C",
    isPublic: true,
  },
  {
    title: "Garota de Ipanema",
    artist: "Tom Jobim",
    lyrics: `Olha que coisa mais linda
Mais cheia de graça
É ela menina que vem
E que passa
Num doce balanço a caminho do mar

Moça do corpo dourado
Do sol de Ipanema
O seu balançado é mais que um poema
É a coisa mais linda que eu já vi passar`,
    chords: `Dm7       G7
Olha que coisa mais linda
Cmaj7      Fmaj7
Mais cheia de graça
Dm7       G7
É ela menina que vem
Cmaj7      Fmaj7
E que passa`,
    genre: "Bossa Nova",
    tags: ["bossa nova", "brasileira", "clássica"],
    originalKey: "F",
    isPublic: true,
  },
];

export async function populateSongs(userId: string) {
  try {
    console.log("Iniciando população de músicas de exemplo...");

    const songsToInsert = exampleSongs.map((song) => ({
      ...song,
      createdBy: userId,
    }));

    const { data, error } = await supabase
      .from("songs")
      .insert(songsToInsert)
      .select();

    if (error) {
      console.error("Erro ao inserir músicas:", error);
      throw error;
    }

    console.log(`✅ ${data?.length || 0} músicas de exemplo adicionadas com sucesso!`);
    return data;
  } catch (error) {
    console.error("Erro ao popular músicas:", error);
    throw error;
  }
}


