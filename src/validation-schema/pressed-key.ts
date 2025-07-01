import { z } from "zod";

export const pressedKeySchema = z.object({
	timestamp: z.date(),
	key: z.string().regex(/^[a-zA-Z0-9,.:;!?\-()[\] '"\n]$/, {
		message:
			"Key must be a single character: a-z, A-Z, 0-9, comma, dot, colon, semicolon, exclamation mark, question mark, hyphen, parentheses, brackets, space, or newline",
	}),
});

export type PressedKey = z.infer<typeof pressedKeySchema>;
