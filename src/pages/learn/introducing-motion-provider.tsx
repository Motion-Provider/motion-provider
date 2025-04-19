import { FullscreenAlert } from "@/components/fullscreen-alert";
import { Navigation } from "@/sections/learn/navigation";
import Wrapper from "@/sections/learn/wrapper";
import { IntroducingMotionProvider as Home } from "@/components/learn/introducing-motion-provider";
import Header from "@/sections/learn/header";
import Head from "next/head";

export default function IntroducingMotionProvider() {
  return (
    <>
      <Head>
        <title>Introducing Motion Provider</title>
      </Head>
      <Wrapper>
        <Header className="my-8" />
        <FullscreenAlert className="ml-2" />
        <Home />
        <Navigation />
      </Wrapper>
    </>
  );
}
