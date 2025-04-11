import { setCookie } from "@/redux/slices/cookieSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export const useFullscreen = () => {
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const controller = new AbortController();

    const handleFullscreenChange = () => {
      const res = document.fullscreenElement !== null;
      setIsFullscreen(res);
      dispatch(
        setCookie({
          activated: res,
        })
      );
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange, {
      signal: controller.signal,
    });

    return () => controller.abort();
  }, []);

  return isFullscreen;
};
