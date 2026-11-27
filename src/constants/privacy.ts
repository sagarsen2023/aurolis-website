export const PRIVACY_UPDATED = "27 November 2026";

export const PRIVACY_SECTIONS = [
  { id: "summary", title: "The short version" },
  { id: "who", title: "Who we are" },
  { id: "website", title: "This website" },
  { id: "app", title: "The desktop app" },
  { id: "github", title: "Signing in with GitHub" },
  { id: "third-parties", title: "Other services" },
  { id: "contact-data", title: "When you contact us" },
  { id: "rights", title: "Your rights" },
  { id: "children", title: "Children" },
  { id: "changes", title: "Changes to this policy" },
  { id: "contact", title: "Contact" },
] as const;

export const PRIVACY_LINKS = {
  githubPrivacy:
    "https://docs.github.com/site-policy/privacy-policies/github-general-privacy-statement",
  githubApplications: "https://github.com/settings/applications",
  dpdpAct: "https://www.meity.gov.in/data-protection-framework",
  policyHistory:
    "https://github.com/sagarsen2023/aurolis-website/commits/main/src/modules/privacy",
};
