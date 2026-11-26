import type { FooterGroup } from "@/types/home/landing.type";

const REPOSITORY = "https://github.com/sagarsen2023/aurolis-api-client";

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
    title: "Project",
    links: [
      { label: "README", href: SITE_LINKS.readme },
      { label: "Source code", href: SITE_LINKS.repository },
      { label: "Website source", href: SITE_LINKS.websiteSource },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "Report a bug", href: SITE_LINKS.bugReport },
      { label: "Request a feature", href: SITE_LINKS.featureRequest },
      { label: "Pull requests", href: SITE_LINKS.pullRequests },
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
