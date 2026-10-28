import { ShowcaseComponent } from "./showcase-component";

export function ShowcasePreview() {
  return (
    <div className="size-full grid place-items-center overflow-hidden relative rounded-r-3xl">
      {/* <Description /> */}
      <ShowcaseComponent />
    </div>
  );
}
