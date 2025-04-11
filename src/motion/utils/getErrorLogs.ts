import { GetErrorLogsProps } from "../types";

export default function logError({ error, mod, src }: GetErrorLogsProps): void {
  if (!error || !mod || !src) {
    console.error("MotionDebugger: Missing error, mod, or src in logError.");
    return;
  }

  const log = `MotionDebugger: ${
    mod === "error" ? "Error" : "Warning"
  } occurred on ${src} - ${error}`;
  console[mod](log);
}
