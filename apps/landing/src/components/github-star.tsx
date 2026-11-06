import { Badge, Spinner } from "@heroui/react";
import { useEffect, useState } from "react";

const ENDPOINT = "https://api.github.com/repos/Motion-Provider/motion-provider";

interface RepoResponse {
  stargazers_count: number;
}

function isRepoResponse(value: unknown): value is RepoResponse {
  return (
    typeof value === "object" &&
    value !== null &&
    "stargazers_count" in value &&
    typeof value.stargazers_count === "number"
  );
}

let starCountPromise: Promise<number | null> | null = null;

function fetchStarCount(): Promise<number | null> {
  starCountPromise ??= fetch(ENDPOINT)
    .then(async (res) => {
      if (!res.ok) return null;
      const data: unknown = await res.json();
      return isRepoResponse(data) ? data.stargazers_count : null;
    })
    .catch(() => null)
    .then((count) => {
      if (count === null) starCountPromise = null;
      return count;
    });

  return starCountPromise;
}

export function GithubStar() {
  const [starCount, setStarCount] = useState<number | null | undefined>(
    undefined,
  );

  useEffect(() => {
    let cancelled = false;

    fetchStarCount().then((count) => {
      if (!cancelled) setStarCount(count);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  if (starCount === null) return null;
  return (
    <Badge
      size="md"
      color="accent"
      variant="soft"
      className="font-bold tracking-tight rounded-full border-none "
    >
      {typeof starCount === "undefined" ? (
        <Spinner color="current" size="sm" />
      ) : (
        starCount
      )}
    </Badge>
  );
}
