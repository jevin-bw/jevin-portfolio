"use client";

import { useEffect, useState } from "react";
import { DnaHelix } from "./DnaHelix";

function IntroCopy() {
  return (
    <div className="landing">
      <h1 className="jw-headline">Welcome to jevin&apos;s world</h1>
      <span className="jw-btn btn-ink landing-enter">Coming soon</span>
    </div>
  );
}

export function IntroSplit() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  function onMouseMove(event: React.MouseEvent<HTMLElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;
    const lineY = bounds.height - (bounds.height / bounds.width) * x;
    const onLight = y <= lineY;
    event.currentTarget.classList.toggle("cursor-on-light", onLight);
    event.currentTarget.classList.toggle("cursor-on-dark", !onLight);
  }

  return (
    <main className="intro-split cursor-on-light" onMouseMove={onMouseMove}>
      <div className="intro-pane intro-pane--light jw-page-bg" data-theme="light">
        <DnaHelix palette="on-light" burstAt={null} reducedMotion={reducedMotion} />
        <IntroCopy />
      </div>
      <div className="intro-pane intro-pane--dark jw-page-bg" data-theme="dark" aria-hidden="true">
        <DnaHelix palette="on-dark" burstAt={null} reducedMotion={reducedMotion} />
        <IntroCopy />
      </div>
    </main>
  );
}
