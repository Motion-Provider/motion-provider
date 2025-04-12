import MotionChain from "@/motion/motion-chain";
import { MotionAnimationProps } from "@/motion/types";
import Link from "next/link";
import {
  FaGithub,
  FaInternetExplorer,
  FaLinkedin,
  FaSearchLocation,
} from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FiX } from "react-icons/fi";
import { BuyMeCoffee } from "./buy-me-coffee";
import { CodeXml } from "lucide-react";

interface SocialItem {
  icon: React.ReactNode;
  link: string;
}

const socialItems: SocialItem[] = [
  {
    icon: (
      <FaGithub className="transition-all duration-200 hover:scale-110 size-5" />
    ),
    link: "https://github.com/Masculinn",
  },
  {
    icon: (
      <FiX className="transition-all duration-200 hover:scale-110 size-6" />
    ),
    link: "https://x.com/burak_dev",
  },
  {
    icon: (
      <FaLinkedin className="transition-all duration-200 hover:scale-110 size-5" />
    ),
    link: "https://www.linkedin.com/in/burak-bilen-483772227",
  },
  {
    icon: (
      <CodeXml className="transition-all duration-200 hover:scale-110 size-6" />
    ),
    link: "https://burakdev.com",
  },
];

const animations = socialItems.map((_, idx) => ({
  mode: ["filterBlurIn", idx % 2 === 0 ? "fadeDown" : "fadeUp"],
  duration: 0.5,
  delay: 0,
  transition: "smooth",
})) as MotionAnimationProps[];

export const Socials = () => {
  return (
    <div className="flex items-center gap-4">
      <MotionChain
        animations={animations}
        elementType="div"
        config={{
          duration: 0.25,
          delayLogic: "cosine",
        }}
        children={socialItems.map((val, idx) => (
          <Link
            key={idx}
            href={val.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            {val.icon}
          </Link>
        ))}
      />
      <Link
        href="https://www.buymeacoffee.com/bbilendev"
        target="_blank"
        className="rounded-full m-1 p-1 scale-90 hover:scale-100 transition-all duration-200 -ml-2 mb-2"
      >
        <BuyMeCoffee />
      </Link>
    </div>
  );
};

export default Socials;
