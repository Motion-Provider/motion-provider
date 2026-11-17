export default function Cas1() {
  return (
    <section className="size-full flex items-center justify-center px-6 tracking-tighter">
      <div className="flex flex-col items-start justify-end h-full pb-8 -translate-y-8">
        <span className="font-light text-sm">Motion CAS</span>
        <h2 className="mt-0 capitalize">Make stuffs alive</h2>
        <p className="max-w-2xs -mt-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
      </div>
      <div className="flex flex-1 gap-2 items-center relative">
        {/** biome-ignore lint/performance/noImgElement: demo purpose */}
        <img
          src="https://ytpmpkgcjlcdidphswzv.supabase.co/storage/v1/object/public/banner/higher-order-components-in-react-banner-da0681d3.webp"
          alt="Demo"
          className="size-full rounded-lg"
        />
      </div>
    </section>
  );
}
