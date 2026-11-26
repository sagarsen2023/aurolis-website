import { Fragment, useRef } from "react";
import {
  type MotionValue,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { cn } from "@/lib/cn";
import {
  KEPT_TOKENS,
  STATEMENT_LABEL,
  STATEMENT_LINES,
  STATEMENT_PARAGRAPH,
} from "@/constants/statement";
import type { StatementToken } from "@/types/home/landing.type";

const REVEAL = { start: 0.04, span: 0.34, window: 0.08 };
const FADE: [number, number] = [0.44, 0.54];
const SHIFT: [number, number] = [0.44, 0.58];
const WORDS = { start: 0.55, span: 0.36, window: 0.07 };

const TOKEN_COUNT = STATEMENT_LINES.reduce(
  (total, line) => total + line.tokens.length,
  0,
);
const PARAGRAPH_WORDS = STATEMENT_PARAGRAPH.split(" ");
const LINE_OFFSETS = STATEMENT_LINES.map((_, lineIndex) =>
  STATEMENT_LINES.slice(0, lineIndex).reduce(
    (total, line) => total + line.tokens.length,
    0,
  ),
);

type TokenProps = {
  token: StatementToken;
  progress: MotionValue<number>;
  index: number;
};

function Token({ token, progress, index }: TokenProps) {
  const start =
    REVEAL.start + (REVEAL.span - REVEAL.window) * (index / (TOKEN_COUNT - 1));
  const end = start + REVEAL.window;
  const keep = index >= TOKEN_COUNT - KEPT_TOKENS;
  const opacity = useTransform(
    progress,
    [start, end, FADE[0], FADE[1]],
    [0.07, 1, 1, keep ? 1 : 0],
  );
  const blur = useTransform(
    progress,
    [start, end, FADE[0], FADE[1]],
    [14, 0, 0, keep ? 0 : 12],
  );
  const y = useTransform(progress, [start, end], [28, 0]);
  const filter = useMotionTemplate`blur(${blur}px)`;

  if (token.kind === "word") {
    return (
      <motion.span
        style={{ opacity, filter, y }}
        className={cn(
          "inline-block",
          token.serif &&
            "pr-[0.05em] font-serif font-normal tracking-[-0.01em] italic",
        )}
      >
        {token.text}
      </motion.span>
    );
  }

  const Icon = token.icon;
  return (
    <motion.span
      style={{ opacity, filter, y }}
      className={cn(
        "grid h-[0.86em] w-[1.3em] shrink-0 place-items-center rounded-[0.26em] border-[max(1.5px,0.03em)]",
        token.accent
          ? "border-[#a48bff] bg-[#a48bff]/[0.07] text-white shadow-[0_0_40px_-6px_rgba(164,139,255,0.55)]"
          : "border-white/85 bg-white/[0.03] text-white/90",
      )}
    >
      <Icon className="size-[0.62em]" />
    </motion.span>
  );
}

type WordProps = {
  word: string;
  progress: MotionValue<number>;
  index: number;
};

function Word({ word, progress, index }: WordProps) {
  const start =
    WORDS.start +
    (WORDS.span - WORDS.window) * (index / (PARAGRAPH_WORDS.length - 1));
  const end = start + WORDS.window;
  const opacity = useTransform(
    progress,
    [WORDS.start - 0.07, WORDS.start - 0.01, start, end],
    [0, 0.12, 0.12, 1],
  );
  const blur = useTransform(progress, [start, end], [8, 0]);
  const x = useTransform(progress, [start, end], [26, 0]);
  const filter = useMotionTemplate`blur(${blur}px)`;
  return (
    <motion.span style={{ opacity, filter, x }} className="inline-block">
      {word}
    </motion.span>
  );
}

export function KineticStatement() {
  const section = useRef<HTMLElement>(null);
  const reduce = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({
    target: section,
    offset: ["start start", "end end"],
  });
  const revealed = useMotionValue(0.42);
  const finished = useMotionValue(1);
  const tokenProgress = reduce ? revealed : scrollYProgress;
  const wordProgress = reduce ? finished : scrollYProgress;
  const shift = useTransform(scrollYProgress, SHIFT, [
    "0svh",
    reduce ? "0svh" : "-17svh",
  ]);

  const heading = (
    <motion.h2
      aria-label={STATEMENT_LABEL}
      style={{ y: shift }}
      className={cn(
        "flex justify-center px-4 text-[clamp(36px,7.6vw,104px)] leading-[1.08] font-medium tracking-[-0.035em]",
        !reduce && "absolute inset-x-0 top-1/2 -translate-y-1/2",
      )}
    >
      <span
        aria-hidden
        className="flex w-fit flex-col items-start gap-[0.06em]"
      >
        {STATEMENT_LINES.map((line, lineIndex) => (
          <span
            key={line.indent}
            className={cn("flex items-center gap-[0.26em]", line.indent)}
          >
            {line.tokens.map((token, position) => (
              <Token
                key={position}
                token={token}
                progress={tokenProgress}
                index={LINE_OFFSETS[lineIndex] + position}
              />
            ))}
          </span>
        ))}
      </span>
    </motion.h2>
  );

  const paragraph = (
    <p
      className={cn(
        "max-w-[34rem] text-[clamp(17px,1.55vw,22px)] leading-[1.48] text-white",
        !reduce &&
          "absolute right-[max(6vw,20px)] bottom-[9svh] left-[max(7vw,20px)]",
      )}
    >
      {PARAGRAPH_WORDS.map((word, index) => (
        <Fragment key={`${word}-${index}`}>
          <Word word={word} progress={wordProgress} index={index} />{" "}
        </Fragment>
      ))}
    </p>
  );

  if (reduce) {
    return (
      <section
        ref={section}
        aria-label="What Aurolis does"
        className="flex flex-col items-center gap-16 px-6 py-32"
      >
        {heading}
        {paragraph}
      </section>
    );
  }

  return (
    <section
      ref={section}
      aria-label="What Aurolis does"
      className="relative h-[480svh]"
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_42%,rgba(255,255,255,0.05),transparent_58%)]" />
        {heading}
        {paragraph}
      </div>
    </section>
  );
}
