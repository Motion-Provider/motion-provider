import { useFullscreen } from "@/hooks/useFullscreen";
import { RootState } from "@/redux";
import { setCookie } from "@/redux/slices/cookieSlice";
import { setFullscreen } from "@/redux/slices/fullscreenSlice";
import { useDispatch, useSelector } from "react-redux";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Expand, Terminal } from "lucide-react";
import { Button } from "./ui/button";
import { useMobile } from "@/hooks/useMobile";
import { useEffect } from "react";

export const FullscreenAlert = () => {
  const isFullscreen = useFullscreen();

  const dispatch = useDispatch();

  const fullscreenActivated = useSelector(
    (state: RootState) => state.cookie.activated
  );
  const isMobile = useMobile();

  useEffect(() => {
    const controller = new AbortController();

    document.addEventListener(
      "fullscreenerror",
      async () => await handleFullscreen(),
      {
        signal: controller.signal,
      }
    );

    return () => controller.abort();
  }, []);

  const handleFullscreen = async () => {
    const elem = document.documentElement;
    try {
      if (elem.requestFullscreen) {
        await elem.requestFullscreen();
      } else if ((elem as any).webkitRequestFullscreen) {
        await (elem as any).webkitRequestFullscreen();
      } else if ((elem as any).mozRequestFullScreen) {
        await (elem as any).mozRequestFullScreen();
      } else if ((elem as any).msRequestFullscreen) {
        await (elem as any).msRequestFullscreen();
      }

      dispatch(setCookie({ activated: true }));
      dispatch(setFullscreen({ isFullscreen: isFullscreen || true }));
    } catch (err) {
      console.error("Fullscreen request failed:", err);
    }
  };

  if (isMobile) return null;

  return (
    !fullscreenActivated && (
      <Alert className="ring ring-offset-2 ring-cyan-950/50 ring-offset-cyan-950/20 w-[98.5%] border-none dark bg-cyan-950/20 relative mt-12">
        <Terminal className="h-4 w-4" />
        <AlertTitle>
          Motion Provider working awesome in full screen mode.
        </AlertTitle>
        <AlertDescription>
          You are currently using default screen mode, we recommend you to use
          full screen mode for the best experience.
        </AlertDescription>
        <Button
          onClick={handleFullscreen}
          variant="outline"
          className="absolute right-8   translate-y-1/2 "
        >
          <Expand className="h-4 w-4" />
          Turn on full screen
        </Button>
      </Alert>
    )
  );
};
