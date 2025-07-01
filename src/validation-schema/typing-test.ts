import { z } from "zod";
import { pressedKeySchema } from "./pressed-key";

export const typingTestSchema = z.object({
	text: z.string().min(1),

	pressedKeys: z.array(pressedKeySchema),
});

export type TypingTest = z.infer<typeof typingTestSchema>;
