import { CONTACT_EMAIL, SITE_LINKS } from "@/constants/site";
import { PRIVACY_LINKS } from "@/constants/privacy";
import { Points, Section, Strong, TextLink } from "./policy-parts";

export function PolicyContent() {
  return (
    <div className="space-y-12">
      <Section id="summary" title="The short version">
        <Points>
          <li>
            Aurolis has{" "}
            <Strong>no Aurolis account and no Aurolis server</Strong>. Your
            collections, requests, responses and environments stay on your
            computer, in git repositories you own.
          </li>
          <li>
            The app sends{" "}
            <Strong>no telemetry, analytics or crash reports</Strong>. This
            website uses <Strong>no cookies, no analytics</Strong> and no
            third-party scripts, and its server keeps no access logs.
          </li>
          <li>
            The only personal data we ever receive is what you send us yourself,
            for example an email.
          </li>
          <li>We don&apos;t sell, rent or share personal data with anyone.</li>
        </Points>
      </Section>

      <Section id="who" title="Who we are">
        <p>
          Aurolis is an open-source project made and run by Sagar Sen, an
          individual developer in India. In this policy, &ldquo;we&rdquo; and
          &ldquo;us&rdquo; mean Sagar Sen. This policy covers the website at
          aurolis.dev and the Aurolis desktop app for macOS, Windows and Linux.
        </p>
        <p>
          We handle personal data under India&apos;s{" "}
          <TextLink href={PRIVACY_LINKS.dpdpAct}>
            Digital Personal Data Protection Act, 2023
          </TextLink>{" "}
          and the rules made under it. If you live in the European Union or the
          United Kingdom, you also have the rights that the GDPR gives you.
        </p>
      </Section>

      <Section id="website" title="This website">
        <Points>
          <li>
            <Strong>No cookies or local storage.</Strong> The site doesn&apos;t
            set cookies and doesn&apos;t store anything in your browser.
          </li>
          <li>
            <Strong>No analytics, ads or trackers.</Strong> There are no
            third-party scripts. Fonts and images are served from aurolis.dev
            itself, so loading a page doesn&apos;t contact any other company.
          </li>
          <li>
            <Strong>No access logs.</Strong> The web server that hosts
            aurolis.dev has access logging turned off, so we don&apos;t record
            your IP address, browser or the pages you visit.
          </li>
          <li>
            <Strong>Links to GitHub.</Strong> The download buttons, release
            notes, source code and issue links open GitHub. Downloads come from
            GitHub Releases. When you follow those links, GitHub&apos;s{" "}
            <TextLink href={PRIVACY_LINKS.githubPrivacy}>
              privacy statement
            </TextLink>{" "}
            applies.
          </li>
        </Points>
      </Section>

      <Section id="app" title="The desktop app">
        <Points>
          <li>
            <Strong>Your workspaces.</Strong> Collections, folders, requests,
            saved examples and environments are plain files in a git repository
            on your computer. They leave your computer only when you push them
            to a git host you choose, such as GitHub, GitLab or Bitbucket.
          </li>
          <li>
            <Strong>Requests and responses.</Strong> Requests go directly from
            your computer to the API you send them to. Responses, drafts, open
            tabs and load test results stay on your computer. We never see them.
          </li>
          <li>
            <Strong>Secret values.</Strong> Environment variables you mark as
            secret are encrypted with AES-256-GCM, using a key kept in your
            operating system&apos;s keychain. They are stored in the app&apos;s
            data folder, never in the repository, and the commit dialog checks
            for secret values before you commit.
          </li>
          <li>
            <Strong>Update checks.</Strong> Shortly after it starts and every
            few hours, the app downloads a small release file (
            <code>latest.json</code>) from the project&apos;s GitHub Releases to
            see if a new version exists. Like any download, GitHub receives your
            IP address. The app adds no identifier of yours to that request.
          </li>
          <li>
            <Strong>AI assistant kit.</Strong> When you add the Claude Code or
            Cursor kit, the app writes four instruction files into your
            repository. The app sends nothing to any AI service. If you use an
            AI tool with your repository, that tool&apos;s own policy applies.
          </li>
          <li>
            <Strong>Removing your data.</Strong> To remove everything the app
            stores, sign out, uninstall the app and delete its data folder. Your
            workspace repositories are yours to keep or delete.
          </li>
        </Points>
      </Section>

      <Section id="github" title="Signing in with GitHub">
        <p>
          Signing in is optional. You can use Aurolis in local mode without any
          account. If you sign in, the app uses the Aurolis GitHub App and
          GitHub&apos;s device flow:
        </p>
        <Points>
          <li>
            GitHub gives the app an access token and a refresh token, plus your
            public profile: user ID, username, name and avatar. The app uses
            them to show who is signed in and to list the repositories you
            allowed it to use.
          </li>
          <li>
            The session is encrypted and kept in the app&apos;s data folder on
            your computer. The token is used only for api.github.com and for git
            commands on your own repositories. It is never sent to us or anyone
            else.
          </li>
          <li>
            Signing out deletes the session. You can also revoke access at any
            time from{" "}
            <TextLink href={PRIVACY_LINKS.githubApplications}>
              GitHub&apos;s application settings
            </TextLink>
            .
          </li>
        </Points>
      </Section>

      <Section id="third-parties" title="Other services">
        <p>
          Aurolis connects you to services that have their own privacy policies:
          GitHub (sign-in, repositories, releases), the git host you push your
          workspaces to, and every API you send requests to. We don&apos;t
          control those services, and we don&apos;t receive the data you
          exchange with them.
        </p>
      </Section>

      <Section id="contact-data" title="When you contact us">
        <p>
          If you email us, we receive your email address and what you write. We
          use it only to reply and to fix what you report, and we delete it when
          the conversation no longer needs it. Your email stays in our mailbox,
          hosted by Google (Gmail).
        </p>
        <p>
          Issues, comments and pull requests on GitHub are public and governed
          by GitHub. Please don&apos;t include personal or secret data in them.
        </p>
      </Section>

      <Section id="rights" title="Your rights">
        <p>Under the DPDP Act, you have the right to:</p>
        <Points>
          <li>get a summary of the personal data we hold about you;</li>
          <li>have it corrected, completed, updated or erased;</li>
          <li>withdraw any consent you gave us, at any time;</li>
          <li>have a grievance handled by us;</li>
          <li>
            nominate someone to use these rights for you if you die or become
            unable to use them.
          </li>
        </Points>
        <p>
          If the GDPR applies to you, you can also object to or restrict our use
          of your data and ask for a copy in a portable format.
        </p>
        <p>
          To use any of these rights or raise a grievance, email{" "}
          <TextLink href={SITE_LINKS.email}>{CONTACT_EMAIL}</TextLink>. We aim
          to reply within 30 days. If you are not happy with our answer, you can
          complain to the Data Protection Board of India or, in the EU or UK, to
          your local data protection authority.
        </p>
      </Section>

      <Section id="children" title="Children">
        <p>
          Aurolis is a tool for software developers and isn&apos;t meant for
          children under 18. We don&apos;t knowingly collect personal data from
          children. If you believe a child has sent us personal data, email us
          and we will delete it.
        </p>
      </Section>

      <Section id="changes" title="Changes to this policy">
        <p>
          If what Aurolis does with data changes, we will update this page and
          the date at the top before the change takes effect. Every earlier
          version is in the{" "}
          <TextLink href={PRIVACY_LINKS.policyHistory}>
            website&apos;s public history
          </TextLink>{" "}
          on GitHub.
        </p>
      </Section>

      <Section id="contact" title="Contact">
        <p>
          For any question about privacy, email Sagar Sen at{" "}
          <TextLink href={SITE_LINKS.email}>{CONTACT_EMAIL}</TextLink>.
        </p>
      </Section>
    </div>
  );
}
