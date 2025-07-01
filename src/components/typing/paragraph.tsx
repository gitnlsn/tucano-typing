import type React from "react";

interface ParagraphProps {
	children: React.ReactNode;
}

export const Paragraph = ({ children }: ParagraphProps) => {
	return (
		<div className="flex flex-row flex-wrap leading-relaxed">{children}</div>
	);
};
