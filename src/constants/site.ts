const REPOSITORY = "https://github.com/sagarsen2023/aurolis-api-client";

export const SITE_LINKS = {
  repository: REPOSITORY,
  releases: `${REPOSITORY}/releases`,
  issues: `${REPOSITORY}/issues`,
  architecture: `${REPOSITORY}/blob/main/docs/workspace-architecture.md`,
};

export const NAV_ITEMS = [
  { label: "How it works", href: "#about" },
  { label: "Features", href: "#features" },
];

export const FOOTER_LINKS = [
  { label: "GitHub", href: SITE_LINKS.repository },
  { label: "Releases", href: SITE_LINKS.releases },
  { label: "Issues", href: SITE_LINKS.issues },
  { label: "Architecture", href: SITE_LINKS.architecture },
];

export const APP_SCREENSHOT = {
  src: "images/app-1440.webp",
  srcSet: "images/app-1440.webp 1440w, images/app-2880.webp 2880w",
  width: 2880,
  height: 1800,
  alt: "Aurolis sending a POST request to create a payment, with a 201 Created JSON response",
};
