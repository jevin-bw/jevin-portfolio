import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="site-footer jw-band">
      <div className="container">
        <Link href="/" className="logo">
          jevin&apos;s world
        </Link>
        <span>[Instagram] · [TikTok] · [Spotify]</span>
      </div>
    </footer>
  );
}
