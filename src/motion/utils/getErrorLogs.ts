import { GetErrorLogsProps } from "../types";

export default function logError({ msg, mod, src }: GetErrorLogsProps): void {
  if (!msg || !mod || !src) {
    console.error("MotionDebugger: Missing error, mod, or src in logError.");
    return;
  }

  const log = `MotionDebugger: ${
    mod === "error" ? "Error" : "Warning"
  } occurred on ${src} — (${msg})`;
  console[mod](log);
}
