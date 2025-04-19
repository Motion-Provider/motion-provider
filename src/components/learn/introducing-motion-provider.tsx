import Link from "next/link";
import { List } from "./list";
import { Badge } from "../ui/badge";
import MotionText from "@/motion/motion-text";
import MotionImage from "@/motion/motion-image";
import MotionChain from "@/motion/motion-chain";
import introducingMotionProviderLib from "@/lib/learn/introducing-motion-provider.lib";

interface BlogListItem {
  title: string;
  desc: React.ReactNode[];
  src: string;
  url: string;
}

const data: BlogListItem[] = [
  {
    title: "SaaS SPA App",
    desc: [
      "✅ Reversal controlling unit.",
      "✅ Advanced image motioning.",
      "✅ Advanced compositions.",
      <div className="flex flex-wrap pt-4 gap-2">
        <Badge variant="outline">MotionImage</Badge>
        <Badge variant="outline">MotionQueue</Badge>
        <Badge variant="outline">MotionContainer</Badge>
        <Badge variant="outline">MotionMovie</Badge>
      </div>,
    ],
    src: "/assets/thumbs/saas-thumb.gif",
    url: "/saas",
  },
  {
    title: "Crypto Landing App",
    desc: [
      "✅ 3D smooth animation effects.",
      "✅ Advanced controlling.",
      "✅ Coloured animations.",
      <div className="flex flex-wrap pt-4 gap-2">
        <Badge variant="outline">useAnimation</Badge>
        <Badge variant="outline">MotionImage</Badge>
        <Badge variant="outline">MotionQueue</Badge>
        <Badge variant="outline">MotionContainer</Badge>
      </div>,
    ],
    src: "/assets/thumbs/crypto-thumb.gif ",
    url: "/crypto",
  },
  {
    title: "Agency Landing App",
    desc: [
      "✅ Color bounding.",
      "✅ Text animations.",
      "✅ Synchronized animations.",
      "✅ CAS.",
      <div className="flex flex-wrap pt-4 gap-2">
        <Badge variant="outline">MotionImage</Badge>
        <Badge variant="outline">MotionQueue</Badge>
        <Badge variant="outline">MotionContainer</Badge>
      </div>,
    ],
    src: "/assets/thumbs/agency-thumb.gif",
    url: "/agency",
  },
  {
    title: "NFT Landing App",
    src: "/assets/thumbs/nft-thumb.gif",
    desc: [
      "✅ z-* animations.",
      "✅ Hover image animations.",
      "✅ Synchronized animations.",
      "✅ Layout animations.",
      <div className="flex flex-wrap pt-4 gap-2">
        <Badge variant="outline">MotionImage</Badge>
        <Badge variant="outline">MotionQueue</Badge>
        <Badge variant="outline">MotionContainer</Badge>
      </div>,
    ],
    url: "/nft",
  },
];
export const IntroducingMotionProvider = () => {
  return (
    <section className=" w-full h-auto mt-6" id="introducing-motion-provider">
      <h2
        className="font-bold capitalize text-3xl pb-4"
        id="what-is-motion-provider"
      >
        What is Motion Provider?
      </h2>
      <p className="text-stone-400  tracking-tight">
        Motion Provider is an <b>open-source</b>, <b>animation design</b>{" "}
        library that provides a collection of reusable and customizable
        components to enhance the user experience and interaction of your web
        application. With Motion Provider, you can quickly and easily create
        stunning and engaging animations for your web application.
      </p>
      <p className="text-stone-400 pt-4 tracking-tight">
        I have been using <i>ready animated components</i> to save time and
        effort less than always, but I have never found a library that provides
        a wide range of animations that can be easily customized to fit your
        specific needs. Some of the libraries I found was{" "}
        <Link
          className="underline underline-offset-2 hover:text-white"
          href={"https://www.reactbits.dev/"}
          target="_blank"
        >
          React Bits
        </Link>
        ,
        <Link
          className="underline underline-offset-2 hover:text-white"
          href={"https://ground.bossadizenith.me/"}
          target="_blank"
        >
          Framer ground
        </Link>{" "}
        which was supporting some great animations . I meant, these are great
        libraries to create animated components. All of them structured on{" "}
        <Link
          className="underline underline-offset-2 hover:text-white"
          href={"https://motion.dev/"}
          target="_blank"
        >
          Motion{"(formerly Framer Motion)"}
        </Link>
        . However the problem comes with reusability and limited customizations
        which was some of the reasons that I wanted to create{" "}
        <i>Motion Provider</i> and make it an open sourced software for the
        community.
      </p>
      <p className="text-stone-400 pt-4 tracking-tight">
        Okay, let's assume that you are working with your brand new portfolio
        project and you found a great library like I mentioned above and you are
        currently wants to use ready components in your project to save time.
        The steps you might be following simply are:
      </p>
      <List data={introducingMotionProviderLib} className="pt-4" />
      <p className="text-stone-400 pt-4 tracking-tight">
        And bum! Your brand new animated components is officially looks ready...
      </p>
      <p className="text-stone-400 pt-4 tracking-tight">
        {" "}
        Now you can show your amazing portfolio to the people{" "}
        <b>built by someone else</b>. When it comes to the main question that I
        asked to myself and I am asking to you for whom following these steps
        currently or in the past:
      </p>
      <MotionText
        animation={{
          mode: ["fadeIn", "filterBlurIn", "textShimmer"],
          transition: "smooth",
          delay: 1,
          duration: 1,
        }}
        config={{
          duration: 0.3,
          mode: "chars",
          space: 1,
          delayLogic: "triangle",
        }}
        elementType={"p"}
        wrapperClassName="text-stone-400 py-12 tracking-tighter font-secondary text-4xl z-0"
      >
        How you have developed your portfolio?
      </MotionText>
      <p className="text-stone-400 tracking-tight">
        The answer could be either{" "}
        <i>I do not know how did I build, I do not know what did I do.</i>. No
        worries mate, I guarantee that your concerns will no longer be existed
        with the power of the Motion Provider.
      </p>
      <p className="text-stone-400 pt-4 tracking-tight">
        No more looking and wasting time for external animation libraries, no
        more saving bunch of links to your bookmarks that god knows when you
        will remember the order of each and find the right one. No more using
        unknown code from the people that you have never seen. The capabilites
        of the <b>Motion Provider</b> is good enough for your any project needs.
      </p>
      <h2 className="font-bold capitalize text-3xl pt-12 pb-4" id="examples">
        Show me some examples
      </h2>
      <p className="text-stone-400 tracking-tight">
        Here are some examples of the <b>Motion Provider</b> in action. Send me
        the project you have developed with the Motion Provider and we can put
        over here!.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
        <MotionChain
          config={{
            duration: 0.5,
            delayLogic: "linear",
          }}
          elementType="div"
          animations={Array.from({ length: 4 }).map((_, idx) => ({
            mode: [idx % 2 === 0 ? "fadeUp" : "fadeDown"],
            duration: 1,
            transition: "smooth",
          }))}
          children={Array.from({ length: 4 }).map((_, i) => (
            <div key={i}>
              <MotionImage
                animation={{
                  duration: 0.25,
                  mode: ["filterInvertColors"],
                  transition: "cubicSmooth",
                }}
                config={{
                  pieces: 49,
                  fn: "hover",
                  duration: 1,
                  img: data[i].src,
                  delayLogic: "sinusoidal",
                }}
                wrapperClassName="rounded-md aspect-video mb-4"
              />
              <h3 className="text-xl tracking-tight">{data[i].title}</h3>
              <ul className="text-muted-foreground tracking-tighter text-xs pt-2 ">
                {data[i].desc.map((text, i) => (
                  <li key={i} className="truncate">
                    {text}
                  </li>
                ))}
              </ul>
            </div>
          ))}
          className="flex flex-col gap-2 hover:opacity-75"
        />
      </div>
    </section>
  );
};
