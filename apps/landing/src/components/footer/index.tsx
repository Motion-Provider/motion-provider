import {
  FooterLinkGroupColumn,
  FooterLinkItem,
} from "@/components/footer/footer-link-group";
import { FooterWordmark } from "@/components/footer/footer-wordmark";
import { FOOTER_DATA } from "@/constants/footer.data";

export function Footer() {
  const { brand, tagline, copyrightYear, groups, legal } = FOOTER_DATA;

  return (
    <footer className="relative isolate overflow-hidden bg-[#2a1610]">
      <h2 id="footer-heading" className="sr-only">
        {brand} footer
      </h2>
      <div className="mx-auto w-full max-w-7xl px-6 sm:pt-20 lg:px-8">
        <div className="pb-6">
          <p className="text-3xl font-medium tracking-tight text-foreground sm:text-5xl">
            {tagline.lead}{" "}
            <span className="italic text-[oklch(74.28%_0.1618_40.24)]">
              {tagline.accent}
            </span>
          </p>
          <FooterWordmark />
        </div>

        <div className="place-items-stretch md:mt-0">
          <div className="grid grid-cols-2 gap-x-12 gap-y-10 sm:grid-cols-4 lg:col-span-7">
            {groups.map((group) => (
              <FooterLinkGroupColumn key={group.id} group={group} />
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-foreground/10 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-foreground/40">
            © {copyrightYear} {brand}
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {legal.map((link) => (
              <li key={link.label}>
                <FooterLinkItem link={link} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
