import { useEffect, useState } from "react";

export const useMobile = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const controller = new AbortController();

    const handleResize = () =>
      setIsMobile(window.matchMedia("(max-width: 768px)").matches);

    window.addEventListener("resize", handleResize, {
      signal: controller.signal,
    });

    return () => controller.abort();
  }, []);

  return isMobile;
};
