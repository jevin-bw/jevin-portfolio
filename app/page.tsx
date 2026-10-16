import type { Metadata } from "next";
import { IntroSplit } from "./components/IntroSplit";

export const metadata: Metadata = {
  title: "Welcome to jevin's world",
  description: "Welcome to jevin's world. Coming soon.",
};

export default function LandingPage() {
  return <IntroSplit />;
}
