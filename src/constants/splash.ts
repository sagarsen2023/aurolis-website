import type { SplashGlyph } from "@/types/home/landing.type";

export const SPLASH_STROKE = 112;

export const SPLASH_GLYPHS: SplashGlyph[] = [
  {
    letter: "u",
    x: 531,
    stroke: "M112 443V190A181 150 0 0 1 474 190V443M474 443V56",
  },
  { letter: "r", x: 1089, stroke: "M118 443V56M118 250Q140 452 302 452" },
  {
    letter: "o",
    x: 1440,
    stroke: "M530 250A216 210 0 1 1 98 250A216 210 0 1 1 530 250",
  },
  { letter: "l", x: 2033, stroke: "M118 664V56" },
  { letter: "i", x: 2235, stroke: "M118 443V56", dot: [118, 671] },
  {
    letter: "s",
    x: 2437,
    stroke:
      "M452 404Q400 459 268 459Q120 459 120 362Q120 275 268 255Q437 233 437 136Q437 40 268 40Q130 40 58 111",
  },
];

export const SPLASH_VIEWBOX = "198 90 324 88";

export const SPLASH_MARK_TRANSFORM = "translate(199.6 90.3) scale(1.42)";

export const SPLASH_TIMING = {
  mark: [0.3, 2.05] as const,
  glyphStart: 0.55,
  glyphStagger: 0.13,
  glyphDuration: 0.8,
  settle: 0.3,
  hold: 2.7,
};
