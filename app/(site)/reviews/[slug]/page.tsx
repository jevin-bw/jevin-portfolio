import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getReview, reviews } from "../../../lib/content";

export function generateStaticParams() {
  return reviews.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const review = getReview((await params).slug);
  return review ? { title: `${review.title} · jevin's world`, description: review.dek } : {};
}

export default async function ReviewPage({ params }: { params: Promise<{ slug: string }> }) {
  const review = getReview((await params).slug);
  if (!review) notFound();

  const more = reviews.filter((r) => r.slug !== review.slug).slice(0, 3);
  const [first, ...rest] = review.body;

  return (
    <main>
      <article>
        <header className="article-hero">
          <div className="container">
            <div className="article-head">
              <Link href="/reviews" className="jw-kicker back-link">
                ← Reviews
              </Link>
              <h1 className="jw-headline">{review.title}</h1>
              <p className="dek">{review.dek}</p>
              <p className="byline-lg">
                by jevin · {review.date} · {review.readTime}
              </p>
            </div>

          </div>
        </header>

        <div className="container article-body">
          <aside className="jw-card album-card" aria-label="Album details">
              <div className="album-art">[ALBUM ART]</div>
              <div className="album-meta">
                <div className="jw-kicker">The record</div>
                <h2>{review.album}</h2>
                <p className="album-artist">{review.artist}</p>
                <dl>
                  <div>
                    <dt>Year</dt>
                    <dd>{review.year}</dd>
                  </div>
                  <div>
                    <dt>Label</dt>
                    <dd>{review.label}</dd>
                  </div>
                  <div>
                    <dt>Standout</dt>
                    <dd>{review.standout}</dd>
                  </div>
                </dl>
                <p className="verdict">{review.verdict}</p>
                <a
                  href={review.spotifyUrl ?? "#"}
                  className="jw-btn"
                  target={review.spotifyUrl ? "_blank" : undefined}
                  rel={review.spotifyUrl ? "noreferrer" : undefined}
                >
                  Listen on Spotify
                </a>
              </div>
            </aside>
          <div className="reading">
            <p className="lede">{first}</p>
            <blockquote className="pull-quote">
              <p>{review.pullQuote}</p>
            </blockquote>
            {rest.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>
      </article>

      {more.length > 0 && (
        <section className="more">
          <div className="container">
            <h2 className="more-title">More reviews</h2>
            <div className="grid">
              {more.map((r) => (
                <Link key={r.slug} href={`/reviews/${r.slug}`} className="jw-tile jw-tile--surface tile">
                  <div className="jw-kicker" style={{ color: "var(--jw-kicker-on-surface)" }}>
                    Review
                  </div>
                  <h3>{r.title}</h3>
                  <p>{r.dek}</p>
                  <div className="meta">{r.readTime}</div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
