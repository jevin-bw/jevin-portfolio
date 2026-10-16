import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container">
        <Link href="/" className="logo" aria-label="jevins.world home">
          jw
        </Link>
        <nav className="nav" aria-label="Main">
          <Link href="/reviews">Reviews</Link>
          <Link href="/playlists">Playlists</Link>
          <Link href="/#world">Fresh finds</Link>
          <Link href="/#world">Diaries</Link>
          <Link href="/#world">About</Link>
          <Link href="/#quiz" className="jw-btn">
            Fan quiz
          </Link>
        </nav>
      </div>
    </header>
  );
}
