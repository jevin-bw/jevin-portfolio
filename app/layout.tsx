import type { Metadata, Viewport } from "next";
import "./jw-tokens.css";
import "./globals.css";
import SiteHeader from "./components/SiteHeader";
import SiteFooter from "./components/SiteFooter";

export const metadata: Metadata = {
  title: "jevin's world · Music worth sitting with",
  description:
    "Reviews, playlists, fresh finds and diaries from jevin's world, plus a quiz that tells you how deep your fandom goes.",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#EFFAF6" },
    { media: "(prefers-color-scheme: dark)", color: "#2B1055" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="jw-page-bg">
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
