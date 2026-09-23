"use client";

import type { ReactNode } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
	className?: string;
	appName: string;
}

export const Button = ({
	children,
	className,
	appName,
	...props
}: ButtonProps) => {
	return (
		<button
			className={className}
			onClick={() => alert(`Hello from your ${appName} app!`)}
			{...props}
		>
			{children}
		</button>
	);
};
