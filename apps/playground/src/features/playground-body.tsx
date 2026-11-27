import {
  InspectorPanel,
  PreviewPanel,
  WorkspacePanel,
} from "./playground-panels";

export function PlaygroundBody() {
  return (
    <div className="grid gap-3.5 lg:grid-cols-[minmax(198px,0.89fr)_minmax(0,3fr)_minmax(242px,1fr)] lg:grid-rows-[minmax(522px,calc(100dvh-142px))]">
      <PreviewPanel />
      <WorkspacePanel />
      <InspectorPanel />
    </div>
  );
}
