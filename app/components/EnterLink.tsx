"use client";

import Link from "next/link";
import { applyTheme } from "./ThemeToggle";

export function EnterLink() {
  return (
    <Link
      href="/home"
      className="jw-btn btn-ink landing-enter"
      onClick={() => applyTheme("dark")}
    >
      Click to enter
    </Link>
  );
}
