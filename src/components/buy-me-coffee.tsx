import MotionImage from "@/motion/motion-image";
import { Skeleton } from "./ui/skeleton";

export const BuyMeCoffee = () => {
  return (
    <MotionImage
      fallback={<Skeleton className="size-5 dark" />}
      animation={{
        mode: ["translate3dIn", "fadeIn"],
        transition: "cubicBounce",
        duration: 1,
      }}
      config={{
        img: "https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg",
        duration: 1,
        pieces: 64,
        delayLogic: "sinusoidal",
      }}
      className="size-1 dark"
    />
  );
};
