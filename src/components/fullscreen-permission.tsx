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

export const FullScreenModal = () => {
  const isMobile = useMobile();
  const dispatch = useDispatch();

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
    } catch (err) {
      console.error("Fullscreen request failed:", err);
    }
  };

  if (isMobile && !window.document) return null;

  return (
    <Dialog defaultOpen modal>
      <DialogContent className="dark">
        <DialogHeader>
          <DialogTitle>
            <div
              className={`w-full flex flex-row gap-2 items-center tracking-tight ${fontSecondary.className}`}
            >
              <MotionText
                animation={{
                  mode: ["fadeUp", "filterBlurIn"],
                  transition: "smooth",
                  duration: 0.5,
                }}
                config={{
                  duration: 0.25,
                  mode: "chars",
                  delayLogic: "chaotic",
                }}
                wrapperClassName="items-center justify-center w-full flex"
                elementType={"span"}
              >
                Turn On Fullscreen Mode
              </MotionText>
            </div>
          </DialogTitle>
          <DialogDescription className="flex justify-center mt-8 mb-4 flex-col-reverse items-center">
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
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="justify-center flex flex-col gap-1 h-auto">
          <DialogTrigger className="w-full">
            <Button
              onClick={handleFullscreen}
              className="w-full "
              variant="outline"
            >
              Turn on
            </Button>
          </DialogTrigger>
        </DialogFooter>
        <p className="text-muted-foreground text-xs text-center">
          Motion Provider's full-screen mode is an experimental feature.
        </p>
      </DialogContent>
    </Dialog>
  );
};
