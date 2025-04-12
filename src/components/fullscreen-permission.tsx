import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { fontSecondary } from "@/lib/fonts";
import MotionText from "@/motion/motion-text";
import { useDispatch } from "react-redux";
import { setCookie } from "@/redux/slices/cookieSlice";
import MotionImage from "@/motion/motion-image";
import { Skeleton } from "./ui/skeleton";
import { useMobile } from "@/hooks/useMobile";
import { FC, useEffect } from "react";
import { FullscreenPermissionProps } from "@/interfaces";

export const FullScreenModal: FC<FullscreenPermissionProps> = ({ onClick }) => {
  const isMobile = useMobile();
  const dispatch = useDispatch();

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
      onClick();
    } catch (err) {
      console.error("Fullscreen request failed:", err);
    }
  };

  if (isMobile) return null;

  return (
    <Dialog defaultOpen>
      <DialogContent
        className="dark"
        aria-describedby="fullscreen-modal"
        suppressHydrationWarning
      >
        <DialogHeader>
          <DialogTitle>
            <MotionText
              animation={{
                mode: ["fadeUp", "filterBlurIn"],
                transition: "smooth",
                duration: 0.5,
              }}
              config={{
                duration: 0.25,
                space: 1,
                mode: "chars",
                delayLogic: "chaotic",
              }}
              className={`${fontSecondary.className}`}
              wrapperClassName="items-center justify-center w-full flex tracking-tight "
              elementType={"span"}
            >
              Turn On Fullscreen Mode
            </MotionText>
          </DialogTitle>
          <DialogDescription className="sr-only" />
          <center>
            <MotionImage
              animation={{
                mode: ["fadeIn", "filterBlurIn"],
                transition: "cubicSmooth",
                duration: 0.5,
              }}
              config={{
                duration: 0.75,
                img: "/fullscreen-modal-icon.png",
                pieces: 81,
                delayLogic: "triangle",
              }}
              wrapperClassName="size-36"
              fallback={<Skeleton className="dark size-36 rounded-full" />}
            />
          </center>
        </DialogHeader>
        <DialogFooter className="justify-center flex flex-col gap-1 h-auto">
          <Button variant="outline" className="w-full" asChild>
            <DialogTrigger className="w-full" onClick={handleFullscreen}>
              Turn on
            </DialogTrigger>
          </Button>
        </DialogFooter>
        <p className="text-muted-foreground text-xs text-center">
          Experience the real motion of the page.
        </p>
      </DialogContent>
    </Dialog>
  );
};
