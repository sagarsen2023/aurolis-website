import { type ReactNode, useRef } from "react";
import {
  Check,
  FileText,
  GitCommitHorizontal,
  Import,
  LockKeyhole,
  Save,
} from "lucide-react";
import {
  type MotionValue,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { GlowCard } from "@/components/glow-card";
import { IconBadge } from "@/components/icon-badge";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/cn";

type InfoCardProps = {
  icon: typeof Import;
  title: string;
  body: string;
};

function InfoCard({ icon, title, body }: InfoCardProps) {
  return (
    <GlowCard orbits innerClassName="p-6">
      <IconBadge icon={icon} />
      <h3 className="mt-6 text-[19px] leading-snug font-medium text-balance">
        {title}
      </h3>
      <p className="mt-2 text-[15px] leading-relaxed text-white/65">{body}</p>
    </GlowCard>
  );
}

function StatusCard() {
  return (
    <GlowCard innerClassName="p-4">
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-white/[0.06] px-2.5 py-1 font-mono text-[13px] text-white/70">
          POST
        </span>
        <span className="text-[13px] text-white/55">139 ms</span>
      </div>
      <div className="relative mx-auto mt-3 grid size-[118px] place-items-center">
        <svg
          viewBox="0 0 120 120"
          aria-hidden
          className="absolute inset-0 -rotate-90"
        >
          <circle
            cx="60"
            cy="60"
            r="52"
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="5"
          />
          <circle
            cx="60"
            cy="60"
            r="52"
            fill="none"
            stroke="#edc5fc"
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray="327"
            strokeDashoffset="46"
          />
        </svg>
        <div className="flex flex-col items-center">
          <span className="grid size-7 place-items-center rounded-full bg-lav text-lav-ink">
            <Check className="size-4" strokeWidth={2.4} aria-hidden />
          </span>
          <span className="mt-1 text-[22px] leading-none font-medium">201</span>
          <span className="mt-1 text-[13px] text-white/60">Created</span>
        </div>
      </div>
    </GlowCard>
  );
}

function SaveTile() {
  return (
    <div className="flex size-[118px] flex-col items-center justify-center gap-3 rounded-[24px] bg-vio shadow-[0_24px_60px_-18px_rgba(185,163,255,0.6)]">
      <span className="grid size-11 place-items-center rounded-full bg-[#141016] text-lav">
        <Save className="size-5" strokeWidth={1.7} aria-hidden />
      </span>
      <span className="rounded-lg bg-[#141016] px-2.5 py-1 font-mono text-[13px] text-white">
        Ctrl S
      </span>
    </div>
  );
}

function SecretCard() {
  return (
    <GlowCard innerClassName="p-5">
      <IconBadge size="md" icon={LockKeyhole} tone="coral" />
      <div className="mt-5 flex items-center justify-between gap-3 rounded-xl border border-white/[0.08] bg-black/25 px-3 py-2.5 font-mono text-[13px]">
        <span className="text-lav">apiKey</span>
        <span className="tracking-[0.2em] text-white/55">••••••</span>
      </div>
      <p className="mt-3 text-[14px] text-white/65">
        Encrypted on this device, never committed
      </p>
    </GlowCard>
  );
}

type FloatingCard = {
  key: string;
  speed: number;
  className: string;
  content: ReactNode;
};

const CARDS: FloatingCard[] = [
  {
    key: "status",
    speed: 0.5,
    className: "w-[178px] md:top-[7%] md:left-[11%]",
    content: <StatusCard />,
  },
  {
    key: "save",
    speed: 1.25,
    className: "w-[118px] md:top-[12%] md:left-[47%]",
    content: <SaveTile />,
  },
  {
    key: "import",
    speed: 0.85,
    className: "w-[min(82vw,320px)] md:top-[27%] md:left-[19%]",
    content: (
      <InfoCard
        icon={Import}
        title="Bring your Postman and Hoppscotch work"
        body="Collections, folders, examples and environments come across in one drop. Hard-coded tokens become variables."
      />
    ),
  },
  {
    key: "commit",
    speed: 1.5,
    className: "w-[min(82vw,320px)] md:top-[38%] md:left-[56%]",
    content: (
      <InfoCard
        icon={GitCommitHorizontal}
        title="Review changes by request name"
        body="See what changed as requests, not JSON diffs, then commit and push to GitHub or any git host."
      />
    ),
  },
  {
    key: "secret",
    speed: 0.7,
    className: "w-[244px] md:top-[50%] md:left-[79%]",
    content: <SecretCard />,
  },
  {
    key: "docs",
    speed: 1.1,
    className: "w-[min(82vw,320px)] md:top-[66%] md:left-[14%]",
    content: (
      <InfoCard
        icon={FileText}
        title="Docs beside every request"
        body="Write markdown notes on workspaces, collections, folders and requests, and keep them in the same repository."
      />
    ),
  },
];

type CardLayerProps = {
  card: FloatingCard;
  index: number;
  progress: MotionValue<number>;
  amplitude: number;
};

function CardLayer({ card, index, progress, amplitude }: CardLayerProps) {
  const y = useTransform(
    progress,
    [0, 1],
    [card.speed * amplitude, -card.speed * amplitude],
  );
  return (
    <motion.div
      style={{ y }}
      className={cn(
        "md:absolute",
        index % 2 === 0 ? "self-start" : "self-end",
        card.className,
      )}
    >
      {card.content}
    </motion.div>
  );
}

export function FloatingCards() {
  const layer = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion() ?? false;
  const wide = useMediaQuery("(min-width: 768px)");
  const { scrollYProgress } = useScroll({
    target: layer,
    offset: ["start end", "end start"],
  });
  const lineOne = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? ["0vw", "0vw"] : ["-5vw", "6vw"],
  );
  const lineTwo = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? ["0vw", "0vw"] : ["7vw", "-6vw"],
  );
  const amplitude = reduce ? 0 : wide ? 300 : 110;

  return (
    <section
      id="features"
      aria-labelledby="features-title"
      className="relative"
    >
      <div className="sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden">
        <div className="pointer-events-none absolute top-1/2 left-1/2 h-[70svh] w-[90vw] -translate-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(106,70,255,0.12),transparent)]" />
        <h2
          id="features-title"
          className="relative flex flex-col items-center text-center leading-[0.9] whitespace-nowrap"
        >
          <motion.span
            style={{ x: lineOne }}
            className="text-[clamp(64px,13.5vw,196px)] font-medium tracking-[-0.045em]"
          >
            Own your
          </motion.span>
          <motion.span
            style={{ x: lineTwo }}
            className="-mt-[0.04em] pl-[0.5em] font-serif text-[clamp(72px,15vw,214px)] tracking-[-0.02em] text-white/40 italic"
          >
            requests
          </motion.span>
        </h2>
      </div>
      <div
        ref={layer}
        className="relative z-10 -mt-[100svh] flex flex-col gap-[14svh] px-5 pt-[78svh] pb-[46svh] md:block md:h-[250svh] md:p-0"
      >
        {CARDS.map((card, index) => (
          <CardLayer
            key={card.key}
            card={card}
            index={index}
            progress={scrollYProgress}
            amplitude={amplitude}
          />
        ))}
      </div>
    </section>
  );
}
