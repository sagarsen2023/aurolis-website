import type { ComponentType } from "react";

export type SplashGlyph = {
  letter: string;
  x: number;
  stroke: string;
  dot?: [number, number];
};

export type StatementToken =
  | { kind: "word"; text: string; serif?: boolean }
  | {
      kind: "icon";
      icon: ComponentType<{ className?: string }>;
      accent?: boolean;
    };

export type StatementLine = {
  indent: string;
  tokens: StatementToken[];
};

export type PlatformId = "mac" | "windows" | "linux";

export type FooterLink = {
  label: string;
  href: string;
};

export type FooterGroup = {
  title: string;
  links: FooterLink[];
};
