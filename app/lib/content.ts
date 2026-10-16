// All site content lives here for now. To add a review or playlist, copy an
// entry, give it a new slug (the bit after /reviews/ or /playlists/ in the
// address) and fill in the fields. Text in [BRACKETS] is a placeholder.

export type Review = {
  slug: string;
  title: string;
  dek: string; // one-line summary under the title
  artist: string;
  album: string;
  year: string;
  label: string;
  date: string;
  readTime: string;
  standout: string; // standout track
  verdict: string; // short verdict shown on the album card
  pullQuote: string;
  body: string[]; // one string per paragraph
  spotifyUrl?: string;
};

export type Track = { title: string; artist: string; note?: string };

export type Playlist = {
  slug: string;
  title: string;
  dek: string;
  mood: string[];
  date: string;
  intro: string[];
  tracks: Track[];
  spotifyId?: string; // the ID from open.spotify.com/playlist/<ID>
};

export const reviews: Review[] = [
  {
    slug: "slow-burn-album",
    title: "The quiet return of the slow-burn album",
    dek: "Why the records that refuse to hurry are the ones worth your whole evening.",
    artist: "[ARTIST]",
    album: "[ALBUM TITLE]",
    year: "[YEAR]",
    label: "[LABEL]",
    date: "[DATE]",
    readTime: "6 min read",
    standout: "[TRACK] · [4:12]",
    verdict: "[One line: who this record is for and when to play it.]",
    pullQuote:
      "Three songs in, the drums drop out and you realise the whole record has been building to this.",
    body: [
      "There's a particular kind of record that refuses to hurry. It opens with a minute of room tone, a piano that sounds like it was recorded in a kitchen, and a voice that arrives late, as if it wandered in from another song.",
      "By the third track you stop waiting for the hook. The bass moves under everything like a slow tide, and when the drums finally drop out, the whole album turns out to have been building to that silence.",
      "[Keep writing here. Each paragraph is its own line in the body list in app/lib/content.ts.]",
    ],
  },
  {
    slug: "sample-review-two",
    title: "[REVIEW TITLE]",
    dek: "[One-line summary of the review.]",
    artist: "[ARTIST]",
    album: "[ALBUM TITLE]",
    year: "[YEAR]",
    label: "[LABEL]",
    date: "[DATE]",
    readTime: "[N] min read",
    standout: "[TRACK]",
    verdict: "[One-line verdict.]",
    pullQuote: "[A line worth lifting out of the review.]",
    body: ["[First paragraph.]", "[Second paragraph.]"],
  },
];

export const playlists: Playlist[] = [
  {
    slug: "late-night-seoul",
    title: "Late-night Seoul",
    dek: "For the walk home after the last train.",
    mood: ["After midnight", "Neon and rain", "Headphones on"],
    date: "[DATE]",
    intro: [
      "[Two or three lines on where this playlist came from: the city, the moment, the feeling it's built around.]",
    ],
    tracks: [
      { title: "[TRACK 1]", artist: "[ARTIST]", note: "[Why it opens the playlist.]" },
      { title: "[TRACK 2]", artist: "[ARTIST]" },
      { title: "[TRACK 3]", artist: "[ARTIST]", note: "[The moment it hits.]" },
      { title: "[TRACK 4]", artist: "[ARTIST]" },
      { title: "[TRACK 5]", artist: "[ARTIST]" },
    ],
  },
  {
    slug: "sample-playlist-two",
    title: "[PLAYLIST TITLE]",
    dek: "[When to put this on.]",
    mood: ["[MOOD]", "[MOOD]"],
    date: "[DATE]",
    intro: ["[Intro.]"],
    tracks: [
      { title: "[TRACK 1]", artist: "[ARTIST]" },
      { title: "[TRACK 2]", artist: "[ARTIST]" },
    ],
  },
];

export const getReview = (slug: string) => reviews.find((r) => r.slug === slug);
export const getPlaylist = (slug: string) => playlists.find((p) => p.slug === slug);
