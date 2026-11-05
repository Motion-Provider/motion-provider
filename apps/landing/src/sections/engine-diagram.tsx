import { EngineDiagram } from "@/components/engine/engine-diagram";

export function EngineDiagramSection() {
  return (
    <section
      id="engine"
      aria-labelledby="engine-heading"
      className="mx-auto w-full max-w-7xl py-24"
    >
      <header className="mx-auto pb-8 w-full text-center items-center flex flex-col">
        <h2
          id="engine-heading"
          className="font-primary text-3xl laptop:max-w-3xl desktop:max-w-4xl font-semibold tracking-tighter text-foreground desktop:text-7xl laptop:text-6xl"
        >
          One path from component to browser.
        </h2>
        <p className="mt-3 text-muted desktop:max-w-2xl laptop:max-w-xl">
          Every animation resolves, compiles and plays through the same engine.{" "}
          <b>
            Follow the wiring between modules and click any block for details.
          </b>
        </p>
      </header>

      <div className="max-w-7xl rounded-3xl size-full desktop:mt-12 laptop:mt-8 relative">
        <EngineDiagram />
      </div>
    </section>
  );
}
