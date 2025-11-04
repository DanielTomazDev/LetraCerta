const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

export function transposeChord(chord: string, semitones: number): string {
  // Remove acidentes e inversões
  const match = chord.match(/^([A-G][#b]?)(.*)$/);
  if (!match) return chord;

  const [, note, suffix] = match;
  const noteIndex = notes.indexOf(note);

  if (noteIndex === -1) return chord;

  const newNoteIndex = (noteIndex + semitones + 12) % 12;
  const newNote = notes[newNoteIndex];

  return newNote + suffix;
}

export function transposeText(text: string, semitones: number): string {
  // Regex para encontrar acordes (ex: Am, C#m, D7, Fmaj7)
  const chordRegex = /\b([A-G][#b]?[m]?[aj]?[0-9]?[sus]?[0-9]?[dim]?[aug]?)\b/g;

  return text.replace(chordRegex, (chord) => {
    return transposeChord(chord, semitones);
  });
}

export function getKeyName(semitones: number): string {
  return notes[(semitones + 12) % 12];
}

