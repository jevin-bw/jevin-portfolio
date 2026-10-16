import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPlaylist, playlists } from "../../../lib/content";

export function generateStaticParams() {
  return playlists.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const playlist = getPlaylist((await params).slug);
  return playlist ? { title: `${playlist.title} · jevin's world`, description: playlist.dek } : {};
}

export default async function PlaylistPage({ params }: { params: Promise<{ slug: string }> }) {
  const playlist = getPlaylist((await params).slug);
  if (!playlist) notFound();

  const more = playlists.filter((p) => p.slug !== playlist.slug).slice(0, 3);

  return (
    <main>
      <section className="playlist-hero">
        <div className="container playlist-hero-grid">
          <div className="jw-tile jw-tile--pop-1 cover" aria-hidden="true">
            <span className="jw-kicker">jw playlist</span>
            <span className="cover-title">{playlist.title}</span>
            <span className="cover-count">{playlist.tracks.length} tracks</span>
          </div>
          <div className="article-head">
            <Link href="/playlists" className="jw-kicker back-link">
              ← Playlists
            </Link>
            <h1 className="jw-headline">{playlist.title}</h1>
            <p className="dek">{playlist.dek}</p>
            <div className="chips">
              {playlist.mood.map((m) => (
                <span key={m}>{m}</span>
              ))}
            </div>
            <p className="byline-lg">
              curated by jevin · {playlist.date} · {playlist.tracks.length} tracks
            </p>
          </div>
        </div>
      </section>

      <div className="container playlist-body">
        <div className="reading">
          {playlist.intro.map((para, i) => (
            <p key={i} className={i === 0 ? "lede" : undefined}>
              {para}
            </p>
          ))}
        </div>

        <div className="playlist-columns">
          <ol className="jw-card tracklist">
            {playlist.tracks.map((t, i) => (
              <li key={i}>
                <span className="track-num">{String(i + 1).padStart(2, "0")}</span>
                <span className="track-text">
                  <span className="track-title">{t.title}</span>
                  <span className="track-artist">{t.artist}</span>
                  {t.note && <span className="track-note">{t.note}</span>}
                </span>
              </li>
            ))}
          </ol>

          <div className="player">
            {playlist.spotifyId ? (
              <iframe
                title={`${playlist.title} on Spotify`}
                src={`https://open.spotify.com/embed/playlist/${playlist.spotifyId}`}
                width="100%"
                height="480"
                loading="lazy"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              />
            ) : (
              <div className="jw-card player-placeholder">
                <div className="jw-kicker">Listen</div>
                <p>
                  [Spotify player goes here. Add the playlist&apos;s ID as spotifyId in app/lib/content.ts.]
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {more.length > 0 && (
        <section className="more">
          <div className="container">
            <h2 className="more-title">More playlists</h2>
            <div className="grid">
              {more.map((p) => (
                <Link key={p.slug} href={`/playlists/${p.slug}`} className="jw-tile jw-tile--pop-1 tile">
                  <div className="jw-kicker">Playlist</div>
                  <h3>{p.title}</h3>
                  <p>{p.dek}</p>
                  <div className="meta">{p.tracks.length} tracks</div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
