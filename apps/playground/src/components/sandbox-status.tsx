import { CircleAlert, WifiOff } from "lucide-react";
import { usePlayground } from "../context/playground";
import { usePlaygroundRuntime } from "../context/playground-runtime";

export function SandboxStatus() {
  const {
    state: { markup },
  } = usePlayground();
  const { online, utilities } = usePlaygroundRuntime();

  if (!online)
    return (
      <>
        <WifiOff size={15} /> Offline · Local changes are available
      </>
    );

  if (utilities.status === "loading")
    return <span role="status">Building Tailwind styles…</span>;

  if (utilities.status === "stale")
    return (
      <>
        <CircleAlert size={15} />
        <span role="status">Preview styles could not be refreshed.</span>
      </>
    );

  return (
    <>
      <span className="size-1.5 rounded-full bg-success" />
      <span>
        {markup.layers.length ? "Sandbox ready" : "No component loaded"}
      </span>
    </>
  );
}
