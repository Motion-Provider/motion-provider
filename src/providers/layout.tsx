import { useFullscreen } from "@/hooks/useFullscreen";
import { ProviderLayoutProps } from "@/interfaces";
import { cn } from "@/lib/utils";
import { setFullscreen } from "@/redux/slices/fullscreenSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function Layout({ children, className }: ProviderLayoutProps) {
  const dispatch = useDispatch();
  const isFullscreen = useFullscreen();

  useEffect(() => {
    if (typeof window === "undefined") return;
    dispatch(setFullscreen({ isFullscreen: isFullscreen }));
  }, [isFullscreen]);

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
