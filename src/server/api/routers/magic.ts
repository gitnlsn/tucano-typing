import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { PressedKeySchema } from "../../../validation-schema/pressed-key";
import { TypingTestSchema } from "../../../validation-schema/typing-test";
import { postTypingTest } from "../../../services/post-typing-test";
import { generateTypingTest } from "../../../services/generate-typing-test";

export const magicRouter = createTRPCRouter({
	postTypingTest: protectedProcedure
		.input(TypingTestSchema)
		.mutation(async ({ input, ctx }) => {
			return await postTypingTest(input);
		}),


	generateTypingTest: protectedProcedure
		.mutation(async ({ input, ctx }) => {
			return await generateTypingTest();
		}),
});
