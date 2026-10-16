import type { Metadata } from "next";
import Link from "next/link";
import { reviews } from "../../lib/content";

export const metadata: Metadata = {
  title: "Reviews · jevin's world",
  description: "Album and song reviews from jevin's world.",
};

export default function ReviewsIndex() {
  return (
    <main>
      <section className="index-hero">
        <div className="container">
          <div className="jw-kicker">Reviews</div>
          <h1 className="jw-headline">Records worth your whole evening.</h1>
          <p className="dek">Long looks at albums and songs, and why they stick.</p>
        </div>
      </section>
      <section className="more">
        <div className="container">
          <div className="grid">
            {reviews.map((r) => (
              <Link key={r.slug} href={`/reviews/${r.slug}`} className="jw-tile jw-tile--surface tile">
                <div className="jw-kicker" style={{ color: "var(--jw-kicker-on-surface)" }}>
                  {r.artist}
                </div>
                <h3>{r.title}</h3>
                <p>{r.dek}</p>
                <div className="meta">
                  {r.date} · {r.readTime}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
