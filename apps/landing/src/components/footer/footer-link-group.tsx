import Link from "next/link";
import type { FooterLink, FooterLinkGroup } from "@/types/footer.type";

const LINK_CLASS =
  "group inline-flex items-center gap-1 rounded-sm text-sm text-foreground/60 transition-colors duration-200 hover:text-foreground focus-visible:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[oklch(74.28%_0.1618_40.24)] motion-reduce:transition-none";

const isInternalRoute = (href: string): boolean => href.startsWith("/");
const isExternal = (href: string): boolean => /^https?:\/\//.test(href);

interface FooterLinkItemProps {
  readonly link: FooterLink;
}

export function FooterLinkItem({ link }: FooterLinkItemProps) {
  const { label, href } = link;

  if (isInternalRoute(href)) {
    return (
      <Link href={href} className={LINK_CLASS}>
        {label}
      </Link>
    );
  }

  if (isExternal(href)) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={LINK_CLASS}
      >
        {label}
        <span
          aria-hidden="true"
          className="-translate-x-1 text-xs opacity-0 transition duration-200 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 motion-reduce:transition-none"
        >
          ↗
        </span>
        <span className="sr-only">(opens in a new tab)</span>
      </a>
    );
  }

  return (
    <a href={href} className={LINK_CLASS}>
      {label}
    </a>
  );
}

interface FooterLinkGroupColumnProps {
  readonly group: FooterLinkGroup;
}

export function FooterLinkGroupColumn({ group }: FooterLinkGroupColumnProps) {
  const headingId = `footer-group-${group.id}`;

  return (
    // biome-ignore lint/a11y/useSemanticElements: dynamic content
    <div role="group" aria-labelledby={headingId}>
      <h3
        id={headingId}
        className="text-xs font-medium uppercase tracking-widest text-foreground/40"
      >
        {group.title}
      </h3>
      <ul className="mt-4 flex flex-col gap-3">
        {group.links.map((link) => (
          <li key={link.label}>
            <FooterLinkItem link={link} />
          </li>
        ))}
      </ul>
    </div>
  );
}
