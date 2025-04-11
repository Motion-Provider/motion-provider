import { useEffect, useState } from "react";

export const useMobile = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;

    const controller = new AbortController();
    const query = window.matchMedia("(max-width: 768px)");

    const handleChange = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
    };

    query.addEventListener("change", handleChange, {
      signal: controller.signal,
    });

    return () => {
      controller.abort();
    };
  }, []);

  return isMobile;
};
