import type React from "react";

interface WordProps {
	children: React.ReactNode;
}

export const Word = ({ children }: WordProps) => {
	return <p className="">{children}</p>;
};
