import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./jw-tokens.css";
import "./globals.css";
import { ThemeToggle } from "./components/ThemeToggle";
import { EnterTransition } from "./components/EnterTransition";

export const metadata: Metadata = {
  title: "jevin's world · Music worth sitting with",
  description:
    "Reviews, playlists, fresh finds and diaries from jevin's world, plus a quiz that tells you how deep your fandom goes.",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#D4EEF9" },
    { media: "(prefers-color-scheme: dark)", color: "#2B1055" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="jw-page-bg">
        <Script id="jw-theme" strategy="beforeInteractive">
          {`(function(){try{var t=localStorage.getItem("jw-theme");if(t!=="light"&&t!=="dark"){t=location.pathname==="/"?"light":"dark";}document.documentElement.setAttribute("data-theme",t);}catch(e){}})();`}
        </Script>
        {children}
        <EnterTransition />
        <ThemeToggle />
      </body>
    </html>
  );
}
