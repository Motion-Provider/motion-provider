import { ProviderLayoutProps } from "@/interfaces";
import { cn } from "@/lib/utils";

export default function Layout({ children, className }: ProviderLayoutProps) {
  return (
    <main
      className={cn(
        "h-screen w-full overflow-y-scroll relative dark",
        className
      )}
    >
      {children}
    </main>
  );
}
