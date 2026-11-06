import { Spinner } from "@heroui/react";
import { useEffect, useState } from "react";

const ENDPOINT = "https://api.github.com/repos/Motion-Provider/motion-provider";

let ignore = false;

export function GithubStar() {
  const [starCount, setStarCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (ignore || loading) return;

    const controller = new AbortController();

    const getStarCount = async () => {
      const res = await fetch(ENDPOINT, { signal: controller.signal })
        .then((res) => res.json())
        .catch(() => {
          setStarCount(null);
          setLoading(false);
        });

      if (res) {
        setStarCount(parseInt(res.stargazers_count, 10));
        setLoading(false);
      }
    };

    if (!starCount) {
      setLoading(true);
      getStarCount();
    }

    return () => {
      ignore = true;
      controller.abort();
      setLoading(false);
    };
  }, [starCount, loading]);

  if (loading) return <Spinner color="accent" />;
  return <span>{starCount}</span>;
}
