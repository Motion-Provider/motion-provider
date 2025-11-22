import { Background } from "@/components/background";
import { Banner } from "@/components/banner";
import { Cards } from "@/components/cards";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

export default function Home() {
  return (
    <main className="h-screen w-full  flex items-center justify-center-safe flex-col gap-4 relative">
      <Header />
      <Banner />
      <Background />
      <Cards />
      <Footer />
    </main>
  );
}
