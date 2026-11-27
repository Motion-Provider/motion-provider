import { report } from "@/lib/report";
import { usePlayground } from "../context/playground";
import { copyText, pack } from "../lib/transfer";

const MAX_SHARE_TOKEN_LENGTH = 12_000;

export function useCopy(): (value: string, message?: string) => Promise<void> {
  return async (value, message = "Code copied.") => {
    try {
      await copyText(value);
      report(message);
    } catch {
      report("Clipboard access failed.", true);
    }
  };
}

export function useShareLink(): () => Promise<void> {
  const {
    state: { project },
  } = usePlayground();

  return async () => {
    const token = await pack(JSON.stringify(project));

    if (token.length > MAX_SHARE_TOKEN_LENGTH)
      throw new Error(
        "This project is too large for a link. Download the TSX file.",
      );

    const url = new URL(window.location.href);
    url.searchParams.set("project", token);
    await copyText(url.href);
    report("Project link copied.");
  };
}
