import { cn } from "@/lib/utils";
import Link from "next/link";

export const StickyFooter = ({ className }: { className?: string }) => (
  <p
    className={cn(
      className,
      "self-center text-center text-xs text-stone-400 tracking-tight w-full "
    )}
  >
    © 2025 Motion Provider, All rights reserved | Built with Next.js by{" "}
    <Link
      href="https://burakdev.com/"
      target="_blank"
      className="transition-all duration-200 underline-offset-2 hover:text-white hover:underline"
    >
      Burak Bilen
    </Link>{" "}
    , use it with Next.js.
  </p>
);
