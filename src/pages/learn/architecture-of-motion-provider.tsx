import { FullscreenAlert } from "@/components/fullscreen-alert";
import Header from "@/sections/learn/header";
import { Navigation } from "@/sections/learn/navigation";
import Wrapper from "@/sections/learn/wrapper";
import Head from "next/head";

export default function ArchitectureOfMotionProvider() {
  return (
    <>
      <Head>
        <title>Architecture of Motion Provider | Motion Provider</title>
      </Head>
      <Wrapper>
        <Header className="my-8" />
        <FullscreenAlert className="ml-2" />
        <Navigation />
      </Wrapper>
    </>
  );
}
