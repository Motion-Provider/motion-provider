import HomeHero from "@/sections/home/Hero";
import Head from "next/head";
import React from "react";

export default function Home() {
  return (
    <>
      <Head>
        <title>Motion Provider</title>
      </Head>
      <HomeHero />
    </>
  );
}
