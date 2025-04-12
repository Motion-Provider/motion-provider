import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { RootState } from "@/redux";
import { FastForward } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const Navigations = () => {
  const router = useRouter();
  const { isFullscreen } = useSelector((state: RootState) => state.fullscreen);
  const [visible, setVisible] = useState<boolean>(false);

  const handleNextPage = () => router.forward();
  const handlePreviousPage = () => router.back();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setVisible(true);
    }, 4000);

    return () => clearTimeout(timeout);
  }, []);

  if (!isFullscreen) return null;

  return (
    <>
      <Button
        onClick={handleNextPage}
        className={cn(
          "z-20 group dark  h-screen lg:w-36 w-20 fixed right-0 bottom-0 rounded-l-full text-white items-center justify-center flex"
        )}
        variant={"ghost"}
      >
        <FastForward
          className={`${
            !visible ? "animate-ping" : ""
          } size-8 group-hover:scale-110 group-hover:opacity-100 opacity-10 transition-all duration-300`}
        />
      </Button>
      <Button
        onClick={handlePreviousPage}
        className={`z-20 group dark  h-screen lg:w-36 w-20 fixed rotate-180 left-0 bottom-0 rounded-l-full text-white items-center justify-center flex ${
          !visible ? "animate-caret-blink" : ""
        }`}
        variant={"ghost"}
      >
        <FastForward
          className={`${
            !visible ? "animate-ping" : ""
          } size-8 group-hover:scale-110 transition-all duration-300 group-hover:opacity-100 opacity-10`}
        />
      </Button>
    </>
  );
};
