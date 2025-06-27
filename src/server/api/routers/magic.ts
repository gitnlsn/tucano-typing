import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { generateTypingTest } from "../../../services/generate-typing-test";
import { postTypingTest } from "../../../services/post-typing-test";
import { TypingTestSchema } from "../../../validation-schema/typing-test";

export const magicRouter = createTRPCRouter({
	postTypingTest: protectedProcedure
		.input(TypingTestSchema)
		.mutation(async ({ input, ctx }) => {
			return await postTypingTest({
				prismaClient: ctx.db,
				userId: ctx.session.user.id,
				text: input.text,
				pressedKeys: input.pressedKeys,
			});
		}),

	generateTypingTest: protectedProcedure.query(async ({ ctx }) => {
		return await generateTypingTest({
			prismaClient: ctx.db,
			userId: ctx.session.user.id,
		});
	}),
});
