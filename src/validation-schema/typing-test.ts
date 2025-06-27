import { z } from "zod";
import { PressedKeySchema } from "./pressed-key";

export const TypingTestSchema = z.object({
	text: z.string().min(1),

	pressedKeys: z.array(PressedKeySchema),
});

export type TypingTest = z.infer<typeof TypingTestSchema>;
