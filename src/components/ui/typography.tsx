import type React from "react";

import { cn } from "~/lib/utils";

function H1({ className, ...props }: React.ComponentProps<"h1">) {
	return (
		<h1
			className={cn(
				"scroll-m-20 text-balance font-extrabold text-4xl tracking-tight",
				className,
			)}
			{...props}
		/>
	);
}

function H2({ className, ...props }: React.ComponentProps<"h2">) {
	return (
		<h2
			className={cn(
				"scroll-m-20 border-b pb-2 font-semibold text-3xl tracking-tight transition-colors first:mt-0",
				className,
			)}
			{...props}
		/>
	);
}

function H3({ className, ...props }: React.ComponentProps<"h3">) {
	return (
		<h3
			className={cn(
				"scroll-m-20 font-semibold text-2xl tracking-tight",
				className,
			)}
			{...props}
		/>
	);
}

function H4({ className, ...props }: React.ComponentProps<"h4">) {
	return (
		<h4
			className={cn(
				"scroll-m-20 font-semibold text-xl tracking-tight",
				className,
			)}
			{...props}
		/>
	);
}

function P({ className, ...props }: React.ComponentProps<"p">) {
	return (
		<p
			className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}
			{...props}
		/>
	);
}

function Blockquote({
	className,
	...props
}: React.ComponentProps<"blockquote">) {
	return (
		<blockquote
			className={cn("mt-6 border-l-2 pl-6 italic", className)}
			{...props}
		/>
	);
}

function Table({ className, ...props }: React.ComponentProps<"table">) {
	return <table className={cn("w-full", className)} {...props} />;
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
	return <thead className={cn(className)} {...props} />;
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
	return <tbody className={cn(className)} {...props} />;
}

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
	return (
		<tr
			className={cn("m-0 border-t p-0 even:bg-muted", className)}
			{...props}
		/>
	);
}

function TableHead({ className, ...props }: React.ComponentProps<"th">) {
	return (
		<th
			className={cn(
				"border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right",
				className,
			)}
			{...props}
		/>
	);
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
	return (
		<td
			className={cn(
				"border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",
				className,
			)}
			{...props}
		/>
	);
}

function TableCaption({
	className,
	...props
}: React.ComponentProps<"caption">) {
	return (
		<caption
			className={cn("mt-4 text-muted-foreground text-sm", className)}
			{...props}
		/>
	);
}

function List({ className, ...props }: React.ComponentProps<"ul">) {
	return (
		<ul
			className={cn("my-6 ml-6 list-disc [&>li]:mt-2", className)}
			{...props}
		/>
	);
}

function InlineCode({ className, ...props }: React.ComponentProps<"code">) {
	return (
		<code
			className={cn(
				"relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono font-semibold text-sm",
				className,
			)}
			{...props}
		/>
	);
}

function Lead({ className, ...props }: React.ComponentProps<"p">) {
	return (
		<p className={cn("text-muted-foreground text-xl", className)} {...props} />
	);
}

function Large({ className, ...props }: React.ComponentProps<"div">) {
	return <div className={cn("font-semibold text-lg", className)} {...props} />;
}

function Small({ className, ...props }: React.ComponentProps<"small">) {
	return (
		<small
			className={cn("font-medium text-sm leading-none", className)}
			{...props}
		/>
	);
}

function Muted({ className, ...props }: React.ComponentProps<"p">) {
	return (
		<p className={cn("text-muted-foreground text-sm", className)} {...props} />
	);
}

export {
	H1,
	H2,
	H3,
	H4,
	P,
	Blockquote,
	Table,
	TableHeader,
	TableBody,
	TableRow,
	TableHead,
	TableCell,
	TableCaption,
	List,
	InlineCode,
	Lead,
	Large,
	Small,
	Muted,
};
