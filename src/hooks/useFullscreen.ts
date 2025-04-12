import { setCookie } from "@/redux/slices/cookieSlice";
import { setFullscreen } from "@/redux/slices/fullscreenSlice";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export const useFullscreen = () => {
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (typeof document === "undefined") return;

    const controller = new AbortController();

    const handleFullscreenChange = () => {
      const isFull = document.fullscreenElement !== null;

      setIsFullscreen(isFull);
    };

    const events = [
      "fullscreenchange",
      "webkitfullscreenchange",
      "mozfullscreenchange",
      "MSFullscreenChange",
    ];

    events.forEach((event) => {
      document.addEventListener(event, handleFullscreenChange, {
        signal: controller.signal,
      });

      document.addEventListener("keydown", (event) => {
        if (event.key === "F11") {
          event.preventDefault();
          handleFullscreenChange();
        }
      });
    });

    handleFullscreenChange();

    return () => {
      controller.abort();
    };
  }, [dispatch, router.pathname]);

  useEffect(() => {
    dispatch(setCookie({ activated: isFullscreen }));
    dispatch(setFullscreen({ isFullscreen: isFullscreen }));
  }, [isFullscreen]);

  return isFullscreen;
};
