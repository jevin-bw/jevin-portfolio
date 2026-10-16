import type { Metadata } from "next";
import Link from "next/link";
import { playlists } from "../lib/content";

export const metadata: Metadata = {
  title: "Playlists · jevin's world",
  description: "Playlists curated by jevin, each built around a moment.",
};

export default function PlaylistsIndex() {
  return (
    <main>
      <section className="index-hero">
        <div className="container">
          <div className="jw-kicker">Playlists</div>
          <h1 className="jw-headline">Built for a moment.</h1>
          <p className="dek">Every playlist starts with a place, a time of night or a feeling.</p>
        </div>
      </section>
      <section className="more">
        <div className="container">
          <div className="grid">
            {playlists.map((p, i) => (
              <Link
                key={p.slug}
                href={`/playlists/${p.slug}`}
                className={`jw-tile ${i % 2 === 0 ? "jw-tile--pop-1" : "jw-tile--pop-2"} tile`}
              >
                <div className="jw-kicker">Playlist</div>
                <h3>{p.title}</h3>
                <p>{p.dek}</p>
                <div className="meta">{p.tracks.length} tracks</div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
