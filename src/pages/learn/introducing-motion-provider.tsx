import { FullscreenAlert } from "@/components/fullscreen-alert";
import dynamic from "next/dynamic";
import { Navigation } from "@/sections/learn/navigation";
import Wrapper from "@/sections/learn/wrapper";
import { IntroducingMotionProvider as Home } from "@/components/learn/introducing-motion-provider";

import Head from "next/head";

const Header = dynamic(() => import("@/sections/learn/header"), {
  ssr: false,
});

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
