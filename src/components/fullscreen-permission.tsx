import { useState } from "react";
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
import { Expand } from "lucide-react";
import { fontSecondary } from "@/lib/fonts";
import MotionText from "@/motion/motion-text";
import { useDispatch } from "react-redux";
import { setCookie } from "@/redux/slices/cookieSlice";

export const FullScreenModal = () => {
  const [isFull, setIsFull] = useState<boolean>(false);

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
      setIsFull(true);
      dispatch(setCookie({ activated: true }));
    } catch (err) {
      console.error("Fullscreen request failed:", err);
      setIsFull(false);
    }
  };

  return (
    <Dialog defaultOpen modal>
      <DialogContent className="dark">
        <DialogHeader>
          <DialogTitle>
            <div
              className={`w-full flex flex-row gap-2 items-center tracking-tight ${fontSecondary.className}`}
            >
              <Expand className="size-6" />
              <MotionText
                animation={{
                  mode: ["fadeUp", "filterBlurIn"],
                  transition: "smooth",
                  duration: 0.5,
                }}
                config={{
                  duration: 0.25,
                  mode: "words",
                  delayLogic: "linear",
                }}
                elementType={"span"}
              >
                Turn On Fullscreen Mode
              </MotionText>
            </div>
          </DialogTitle>
          <DialogDescription>
            Our site works best in fullscreen mode
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogTrigger>
            <Button
              onClick={handleFullscreen}
              className="cursor-pointer "
              variant={"outline"}
            >
              Turn on
            </Button>
          </DialogTrigger>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
