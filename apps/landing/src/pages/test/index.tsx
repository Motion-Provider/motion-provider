export default function Test() {
  return (
    <div className="h-screen w-full">
      <div className="relative isolate overflow-hidden size-full">
        <div
          className="absolute inset-0 z-0"
          style={{
            background:
              "linear-gradient(309deg, #ebe8e7 0%, #c18f7d 17%, #a6522e 37%, #613c29 52%, #1c1612 83%, #050404 100%)",
          }}
        />
        <div
          className="absolute -z-1"
          style={{
            inset: "0px",
            backgroundImage:
              "radial-gradient(circle at 23% 20%, rgba(229, 214, 209, 0.28), transparent 17%), radial-gradient(circle at 40% 62%, rgba(221, 97, 44, 0.33), transparent 20%), radial-gradient(circle at 40% 59%, rgba(28, 22, 18, 0.32), transparent 12%), radial-gradient(circle at 64% 23%, rgba(229, 214, 209, 0.14), transparent 15%)",
            filter: "blur(24px)",
            opacity: 0.64,
          }}
        />
        <div
          className="absolute inset-0 -z-2"
          style={{
            background:
              "radial-gradient(ellipse at 47% 2%, rgba(255,255,255,0.33), transparent 38%), radial-gradient(ellipse at 50% 40%, rgba(221, 97, 44, 0.29), transparent 42%)",
          }}
        />
        <div
          className="absolute inset-0 -z-4"
          style={{
            background:
              "radial-gradient(circle at center, transparent 25%, rgba(0,0,0,0.21) 58%, rgba(0,0,0,0.92) 100%), linear-gradient(to bottom, transparent 45%, rgba(0,0,0,0.79) 100%)",
          }}
        />
        <div
          className="absolute inset-0 -z-5 mix-blend-soft-light"
          style={{ opacity: 0.2 }}
        />
      </div>
    </div>
  );
}
