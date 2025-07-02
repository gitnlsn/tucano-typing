import { createGoogleGenerativeAI } from "@ai-sdk/google";
import type { PrismaClient } from "@prisma/client";
import { generateObject } from "ai";
import { z } from "zod";
import { env } from "~/env";

export interface GeneratedTypingTestInput {
	prismaClient: PrismaClient;
	userId: string;

	wordsQuantity?: number;
	language?: "english" | "portuguese";
}

export const generateTypingTest = async ({
	prismaClient,
	userId,

	language = "english",
}: GeneratedTypingTestInput) => {
	const { mustHaveWords } = {
		// TODO: get mustHaveWords from db
		mustHaveWords: [],
	};

	const model = createGoogleGenerativeAI({
		apiKey: env.GOOGLE_API_KEY,
	}).languageModel("gemini-2.0-flash-lite", {
		safetySettings: [
			{
				category: "HARM_CATEGORY_HATE_SPEECH",
				threshold: "BLOCK_LOW_AND_ABOVE",
			},
		],
	});

	const prompt = `
		Context:
		- You are a generating a text for typing test.
		- The user will type this text to practice typing skills.

		Coditions and instructions:
		- Be creative and choose a topic that should be interesting to the user.
		- The generated text must be in ${language} language.
		- The generated text must have 50 words.
		- Don't return an explanation of the text, return only the generated text and the keywords.

		${
			mustHaveWords.length > 0
				? `	<MinorContext>
					- You are given a list of must have words that the user must practice.
					- Please make sure to include some of these words in the generated text.
					<words>${JSON.stringify(mustHaveWords)}</words>
				</MinorContext>`
				: ""
		}
    `;

	const {
		object: { text, keywords },
	} = await generateObject({
		model,
		prompt,
		schema: z.object({
			text: z.string(),
			keywords: z.array(z.string()),
		}),
	});

	return {
		text,
		keywords,
	};
};
