import { motion } from "motion/react";
import { AurolisMark } from "@/components/aurolis-mark";
import { GithubIcon } from "@/components/github-icon";
import { Wordmark } from "@/components/wordmark";
import { NAV_ITEMS, SITE_LINKS } from "@/constants/site";

type NavPillProps = {
  visible: boolean;
};

const ITEM =
  "flex min-h-10 items-center rounded-xl px-2.5 text-[14px] whitespace-nowrap sm:px-3 text-white/75 transition-colors hover:bg-white/[0.06] hover:text-white focus-visible:outline-2 focus-visible:outline-lav";

export function NavPill({ visible }: NavPillProps) {
  return (
    <motion.nav
      aria-label="Main"
      initial={{ opacity: 0, y: -18 }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: -18 }}
      transition={{
        duration: 0.8,
        delay: visible ? 0.35 : 0,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="fixed top-3 left-1/2 z-50 -translate-x-1/2 sm:top-4"
    >
      <div className="flex items-center gap-0.5 rounded-2xl border border-white/[0.09] bg-[rgba(30,27,34,0.55)] p-1 shadow-[0_10px_40px_-12px_rgba(0,0,0,0.8)] backdrop-blur-xl">
        <a
          href="#top"
          aria-label="Aurolis home"
          className="flex h-10 items-center gap-2 rounded-xl pr-3 pl-1.5 text-white transition-colors hover:bg-white/[0.06] focus-visible:outline-2 focus-visible:outline-lav"
        >
          <AurolisMark className="size-7" />
          <Wordmark className="hidden h-[15px] w-auto sm:block" title="" />
        </a>
        <span
          aria-hidden
          className="mx-1 hidden h-5 w-px bg-white/10 sm:block"
        />
        {NAV_ITEMS.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className={`${ITEM} ${item.href === "#about" ? "hidden sm:flex" : ""}`}
          >
            {item.label}
          </a>
        ))}
        <a
          href={SITE_LINKS.repository}
          className={`${ITEM} gap-2`}
          aria-label="Aurolis on GitHub"
        >
          <GithubIcon className="size-4" />
          <span className="hidden md:inline">GitHub</span>
        </a>
        <a
          href="#download"
          className="ml-1 flex min-h-10 items-center rounded-xl bg-lav px-3.5 text-[14px] font-medium whitespace-nowrap text-lav-ink transition-colors hover:bg-[#f6dcff] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lav"
        >
          Download
        </a>
      </div>
    </motion.nav>
  );
}
