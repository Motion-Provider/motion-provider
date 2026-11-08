import { useState } from "react";

type UseCopyToClipboardReturn = readonly [
  copiedValue: string | null,
  copyToClipboard: (value: string) => Promise<void>,
];

function oldSchoolCopy(text: string): void {
  const tempTextArea = document.createElement("textarea");
  tempTextArea.value = text;
  tempTextArea.setAttribute("readonly", "");
  tempTextArea.style.position = "fixed";
  tempTextArea.style.opacity = "0";
  document.body.appendChild(tempTextArea);
  tempTextArea.select();
  try {
    document.execCommand("copy");
  } finally {
    document.body.removeChild(tempTextArea);
  }
}

export function useCopyToClipboard(): UseCopyToClipboardReturn {
  const [state, setState] = useState<string | null>(null);

  const copyToClipboard = async (value: string): Promise<void> => {
    const hasClipboardApi =
      typeof navigator.clipboard?.writeText === "function";

    if (hasClipboardApi) {
      try {
        await navigator.clipboard.writeText(value);
      } catch {
        oldSchoolCopy(value);
      }
    } else {
      oldSchoolCopy(value);
    }

    setState(value);
  };

  return [state, copyToClipboard] as const;
}
