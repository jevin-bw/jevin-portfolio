import Link from "next/link";

export default function Home() {
  return (
    <>
      <main>
        <section className="hero">
          <div className="container">
            <div className="hero-copy">
              <div className="jw-kicker">Welcome to jevin&apos;s world</div>
              <h1 className="jw-headline">Music worth sitting with.</h1>
              <p>
                Reviews, playlists, fresh finds and diaries from Seoul to Chicago, plus a quiz that
                tells you exactly how deep your fandom goes.
              </p>
              <div className="hero-actions">
                <a href="#world" className="jw-btn btn-ink">
                  Explore the hub
                </a>
                <a href="#quiz" className="jw-btn jw-btn--outline">
                  Take the fan quiz
                </a>
              </div>
            </div>

            <div className="ticket-wrap">
              <article className="jw-ticket" aria-label="Today's pick">
                <div className="ticket-main">
                  <div className="ticket-top">
                    <span className="jw-kicker" style={{ color: "var(--jw-kicker-on-surface)" }}>
                      Admit one · today&apos;s pick
                    </span>
                    <span className="jw-kicker" style={{ color: "var(--jw-ink)" }}>
                      [DATE]
                    </span>
                  </div>
                  <h2>[TRACK TITLE]</h2>
                  <div className="ticket-artist">[ARTIST]</div>
                  <p className="ticket-why">[One or two lines on why this is today&apos;s pick.]</p>
                  <div className="ticket-play">
                    <button className="play-btn" type="button" aria-label="Play today's pick">
                      <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
                        <path d="M6 4 L16 10 L6 16 Z" />
                      </svg>
                    </button>
                    <span>Listen · new pick every day</span>
                  </div>
                </div>
                <div className="jw-ticket__stub">
                  <span>jevins.world</span>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="world" id="world">
          <div className="container">
            <div className="section-head">
              <h2>What&apos;s in the world</h2>
              <div className="legend" aria-hidden="true">
                <span style={{ background: "var(--jw-surface)", color: "var(--jw-ink)" }}>Review</span>
                <span style={{ background: "var(--jw-pop-1)", color: "var(--jw-on-pop)" }}>Playlist</span>
                <span style={{ background: "var(--jw-pop-2)", color: "var(--jw-on-pop)" }}>Fresh find</span>
                <span style={{ background: "var(--jw-accent)", color: "var(--jw-on-accent)" }}>Diary</span>
                <span style={{ background: "var(--jw-band)", color: "var(--jw-on-band)" }}>Mix</span>
              </div>
            </div>

            <div className="grid">
              <Link href="/reviews/slow-burn-album" className="jw-tile jw-tile--surface tile review span-2">
                <div className="art">[ALBUM ART]</div>
                <div className="review-body">
                  <div className="jw-kicker">Review</div>
                  <h3>The quiet return of the slow-burn album</h3>
                  <p>Why the records that refuse to hurry are the ones worth your whole evening.</p>
                  <div className="byline">by jevin · 6 min read</div>
                </div>
              </Link>

              <Link href="/playlists/late-night-seoul" className="jw-tile jw-tile--pop-1 tile">
                <div className="jw-kicker">Playlist</div>
                <h3>Late-night Seoul</h3>
                <p>For the walk home after the last train.</p>
                <div className="meta">[N] tracks</div>
              </Link>

              <a href="#" className="jw-tile jw-tile--pop-2 tile">
                <div className="jw-kicker">Fresh find</div>
                <h3>[ARTIST TO WATCH]</h3>
                <p>[Why you&apos;ll hear about them next year.]</p>
                <div className="meta">Under the radar</div>
              </a>

              <a href="#" className="jw-tile jw-tile--accent tile">
                <div className="jw-kicker">Diary</div>
                <h3>Notes from the Dillo Day booking room</h3>
                <p>What producing a student festival teaches you about the industry.</p>
              </a>

              <a href="#" className="jw-tile jw-tile--band tile tile--band">
                <div className="jw-kicker">Mix</div>
                <h3>jw mix 01</h3>
                <p>[An hour of what&apos;s been on repeat.]</p>
              </a>

              <a href="#" className="jw-tile jw-tile--surface tile span-2">
                <div className="jw-kicker" style={{ color: "var(--jw-kicker-on-surface)" }}>
                  Guest curator
                </div>
                <h3>Five songs from [GUEST]</h3>
                <p>Friends, artists and fellow diggers hand over their own picks.</p>
              </a>
            </div>
          </div>
        </section>

        <section className="quiz jw-band" id="quiz">
          <div className="container">
            <div className="quiz-copy">
              <div className="jw-kicker">The fan quiz</div>
              <h2>How big a fan are you, really?</h2>
              <p>
                Connect your listening and get your fan level for the artists you love, your music
                DNA, and picks based on what you want next.
              </p>
              <div className="chips">
                <span>Find similar artists</span>
                <span>Same sound, new names</span>
                <span>Expand my taste</span>
              </div>
              <a href="#" className="jw-btn btn-pop">
                Start the quiz
              </a>
            </div>

            <div className="jw-card dna">
              <div className="dna-head">
                <h3>Your music DNA</h3>
                <span className="jw-kicker">Sample result</span>
              </div>
              <div className="meters">
                <div className="meter">
                  <span className="meter-label">Breadth</span>
                  <span className="meter-note">How many sounds you move between</span>
                  <div className="meter-track">
                    <div className="meter-fill" style={{ width: "72%" }} />
                  </div>
                </div>
                <div className="meter">
                  <span className="meter-label">Depth</span>
                  <span className="meter-note">How far into each artist you go</span>
                  <div className="meter-track">
                    <div className="meter-fill meter-fill--accent" style={{ width: "48%" }} />
                  </div>
                </div>
              </div>
              <div className="fans">
                <span className="meter-label">Fan level</span>
                <div className="fan" style={{ background: "var(--jw-pop-1)", color: "var(--jw-on-pop)" }}>
                  <span>[ARTIST A]</span>
                  <b style={{ background: "var(--jw-on-pop)", color: "var(--jw-pop-1)" }}>Day one</b>
                </div>
                <div className="fan" style={{ background: "var(--jw-pop-2)", color: "var(--jw-on-pop)" }}>
                  <span>[ARTIST B]</span>
                  <b style={{ background: "var(--jw-on-pop)", color: "var(--jw-pop-2)" }}>Deep diver</b>
                </div>
                <div className="fan">
                  <span>[ARTIST C]</span>
                  <b>Casual</b>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="newsletter">
          <div className="container">
            <div>
              <h2>The weekly dispatch</h2>
              <p>Every Monday: the week&apos;s picks, one review, and a playlist.</p>
            </div>
            <form action="#" method="post">
              <label htmlFor="email" className="visually-hidden">
                Email address
              </label>
              <input id="email" name="email" type="email" placeholder="your@email.com" required />
              <button type="submit" className="jw-btn">
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </main>
    </>
  );
}
