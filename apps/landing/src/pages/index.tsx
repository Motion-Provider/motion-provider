import { Chip } from "@heroui/react";
import { Motion } from "motion-provider";
import { fadeIn } from "motion-provider/presets";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export default function Home() {
	return (
		<div
			className={`${geistSans.variable} ${geistMono.variable} flex min-h-screen items-center justify-center font-sans bg-black`}
		>
			<Motion definition={fadeIn} elementType="div">
				<Chip color="success" variant="soft">
					Motion Provider
				</Chip>
			</Motion>
		</div>
	);
}
