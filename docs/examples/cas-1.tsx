export default function Cas1() {
  return (
    <section className="size-full flex items-center justify-center tracking-tighter md:px-6 gap-4 md:gap-8">
      <div className="flex flex-col items-start justify-end h-full pb-8 -translate-y-8">
        <span className="font-light md:text-sm text-xs">Motion CAS</span>
        <h2 className="mt-0 capitalize md:text-3xl text-lg">
          Make stuffs alive
        </h2>
        <p className="md:max-w-2xs max-w-42 text-pretty -mt-4 md:text-sm text-xs">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
      </div>
      <div className="flex items-center relative">
        {/** biome-ignore lint/performance/noImgElement: demo purpose */}
        <img
          src="https://ytpmpkgcjlcdidphswzv.supabase.co/storage/v1/object/public/banner/higher-order-components-in-react-banner-da0681d3.webp"
          alt="Demo"
          className="rounded-lg md:size-60 size-40 aspect-square object-cover"
        />
      </div>
    </section>
  );
}
