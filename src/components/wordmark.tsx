import {
  WORDMARK_GLYPHS,
  WORDMARK_TRANSFORM,
  WORDMARK_VIEWBOX,
} from "@/constants/wordmark";

type WordmarkProps = {
  className?: string;
  title?: string;
};

export function Wordmark({ className, title = "Aurolis" }: WordmarkProps) {
  return (
    <svg
      viewBox={WORDMARK_VIEWBOX}
      fill="currentColor"
      role="img"
      aria-label={title}
      className={className}
    >
      <g transform={WORDMARK_TRANSFORM}>
        {WORDMARK_GLYPHS.map((glyph) => (
          <path
            key={glyph.letter}
            transform={`translate(${glyph.x} 0)`}
            d={glyph.d}
          />
        ))}
      </g>
    </svg>
  );
}
