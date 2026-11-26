import type { FooterGroup } from "@/types/home/landing.type";

const REPOSITORY = "https://github.com/sagarsen2023/aurolis-api-client";
const DOCS = `${REPOSITORY}/blob/main/docs`;

export const CONTACT_EMAIL = "sagarsen.dev@gmail.com";

export const SITE_LINKS = {
  repository: REPOSITORY,
  readme: `${REPOSITORY}#readme`,
  releases: `${REPOSITORY}/releases`,
  latestRelease: `${REPOSITORY}/releases/latest`,
  issues: `${REPOSITORY}/issues`,
  bugReport: `${REPOSITORY}/issues/new?labels=bug`,
  featureRequest: `${REPOSITORY}/issues/new?labels=enhancement`,
  pullRequests: `${REPOSITORY}/pulls`,
  architecture: `${DOCS}/workspace-architecture.md`,
  githubIntegration: `${DOCS}/github-integration.md`,
  websiteSource: "https://github.com/sagarsen2023/aurolis-website",
  email: `mailto:${CONTACT_EMAIL}`,
};

export const NAV_ITEMS = [
  { label: "How it works", href: "#about" },
  { label: "Features", href: "#features" },
];

export const FOOTER_GROUPS: FooterGroup[] = [
  {
    title: "Product",
    links: [
      { label: "How it works", href: "#about" },
      { label: "Features", href: "#features" },
      { label: "Download", href: "#download" },
      { label: "Releases", href: SITE_LINKS.releases },
    ],
  },
  {
    title: "Docs",
    links: [
      { label: "README", href: SITE_LINKS.readme },
      { label: "Workspace architecture", href: SITE_LINKS.architecture },
      { label: "GitHub integration", href: SITE_LINKS.githubIntegration },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "Source code", href: SITE_LINKS.repository },
      { label: "Report a bug", href: SITE_LINKS.bugReport },
      { label: "Request a feature", href: SITE_LINKS.featureRequest },
      { label: "Pull requests", href: SITE_LINKS.pullRequests },
      { label: "Website source", href: SITE_LINKS.websiteSource },
    ],
  },
];

export const APP_SCREENSHOT = {
  src: "images/app-1440.webp",
  srcSet: "images/app-1440.webp 1440w, images/app-2880.webp 2880w",
  width: 2880,
  height: 1800,
  alt: "Aurolis sending a POST request to create a payment, with a 201 Created JSON response",
};
