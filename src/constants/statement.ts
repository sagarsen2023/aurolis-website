import { FileDiff, GitBranch, Send } from "lucide-react";
import type { StatementLine } from "@/types/home/landing.type";

export const STATEMENT_LABEL = "Send every request, commit every change.";

export const STATEMENT_LINES: StatementLine[] = [
  {
    indent: "pl-[0.9em] sm:pl-[1.5em]",
    tokens: [
      { kind: "word", text: "Send" },
      { kind: "icon", icon: Send },
      { kind: "word", text: "every" },
    ],
  },
  {
    indent: "pl-0",
    tokens: [
      { kind: "word", text: "request," },
      { kind: "icon", icon: GitBranch },
      { kind: "word", text: "commit", serif: true },
    ],
  },
  {
    indent: "pl-[1.1em] sm:pl-[2.6em]",
    tokens: [
      { kind: "word", text: "every" },
      { kind: "icon", icon: FileDiff, accent: true },
      { kind: "word", text: "change" },
    ],
  },
];

export const KEPT_TOKENS = 2;

export const STATEMENT_PARAGRAPH =
  "Every workspace is a git repository on your machine. Requests, examples and environments are plain files you can read, diff and review like code. Press Ctrl S to save, see each change by request name, then commit and push when you are ready. Secret values stay encrypted on this device and never reach the repository.";
