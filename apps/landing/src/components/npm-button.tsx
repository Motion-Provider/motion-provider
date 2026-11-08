import { Button } from "@heroui/react";
import { CheckCheckIcon, CopyIcon } from "lucide-react";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";

const code = "npm i motion-provider";

export function NpmButton() {
  const [state, copyCode] = useCopyToClipboard();

  return (
    <Button
      onPress={() => copyCode(code)}
      variant="primary"
      className="mt-4 max-w-full gap-3 rounded-full px-5 font-secondary sm:px-6"
    >
      {code}
      {state === null ? (
        <CopyIcon className="size-4" />
      ) : (
        <CheckCheckIcon className="size-4" />
      )}
    </Button>
  );
}
