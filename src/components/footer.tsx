import Link from "next/link";
export const Footer = () => (
  <footer className="fixed bottom-8 text-zinc-400 text-xs text-center w-full md:w-auto z-50">
    ©{new Date().getFullYear()} Motion Provider —{" "}
    <Link
      href="https://burakdev.com"
      target="_blank"
      className="hover:underline underline-offset-2 hover:text-foreground transition-all duration-200 ease-in-out"
    >
      crafted by Burak Bilen
    </Link>
  </footer>
);
