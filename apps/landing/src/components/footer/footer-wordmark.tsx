interface FooterWordmarkProps {
  readonly text: string;
}

export function FooterWordmark({ text }: FooterWordmarkProps) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none select-none text-foreground mask-[linear-gradient(to_bottom,black_15%,transparent_95%)]"
    >
      <svg
        viewBox="0 0 1200 190"
        className="block h-auto w-full"
        focusable="false"
      >
        <title className="sr-only">Motion Provider</title>
        <text
          x="0"
          y="170"
          textLength="1200"
          lengthAdjust="spacingAndGlyphs"
          fill="currentColor"
          fontSize="200"
          fontWeight="600"
        >
          {text}
        </text>
      </svg>
    </div>
  );
}
