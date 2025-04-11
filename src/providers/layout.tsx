import { FullScreenModal } from "@/components/fullscreen-permission";
import { ProviderLayoutProps, ReduxCookieProps } from "@/interfaces";
import { cn } from "@/lib/utils";
import { useSelector } from "react-redux";

export default function Layout({ children, className }: ProviderLayoutProps) {
  const cookie = useSelector((state: ReduxCookieProps) => state.activated);

  return (
    <main
      className={cn(
        "h-screen w-full overflow-y-scroll relative dark",
        className
      )}
    >
      {children}
      {/* {!cookie ? <FullScreenModal /> : null} */}
    </main>
  );
}
