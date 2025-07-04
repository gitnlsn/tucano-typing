import { cva } from "class-variance-authority";
import { cn } from "~/lib/utils";
import type { Status } from "./status";

const characterVariants = cva("m-[1px] p-[3px] font-mono text-2xl leading-14", {
	variants: {
		status: {
			success: "bg-green-100 text-green-800",
			error: "bg-red-100 text-red-800",
			typing: "animate-underscore text-blue-900",
			idle: "",
		},
		size: {
			default: "",
			sm: "",
			lg: "",
		},
	},
	defaultVariants: {
		status: "idle",
		size: "default",
	},
});

export interface CharacterProps {
	character: string;
	status: Status;
}

export const Character = ({ status, character }: CharacterProps) => {
	return (
		<span
			className={characterVariants({
				status,
				size: "default",
				className: cn("relative"),
			})}
		>
			{character === " " ? "\u00A0" : character}
		</span>
	);
};
