export interface FooterLink {
  readonly label: string;
  readonly href: string;
}

export interface FooterLinkGroup {
  readonly id: string;
  readonly title: string;
  readonly links: readonly FooterLink[];
}

export interface FooterTagline {
  readonly lead: string;
  readonly accent: string;
}

export interface FooterData {
  readonly brand: string;
  readonly description: string;
  readonly tagline: FooterTagline;
  readonly copyrightYear: number;
  readonly groups: readonly FooterLinkGroup[];
  readonly legal: readonly FooterLink[];
}
