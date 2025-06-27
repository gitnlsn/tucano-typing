import { createGoogleGenerativeAI } from "@ai-sdk/google";
import type { PrismaClient } from "@prisma/client";
import { generateText } from "ai";
import { env } from "~/env";

export interface GeneratedTypingTestInput {
	prismaClient: PrismaClient;
	userId: string;
}

export const generateTypingTest = async ({
	prismaClient,
	userId,
}: GeneratedTypingTestInput) => {
	const { mustHaveWords } = {
		// TODO: get mustHaveWords from db
		mustHaveWords: [],
	};

	const model = createGoogleGenerativeAI({
		apiKey: env.GOOGLE_API_KEY,
	}).languageModel("gemini-2.0-flash", {
		safetySettings: [
			{
				category: "HARM_CATEGORY_UNSPECIFIED",
				threshold: "BLOCK_LOW_AND_ABOVE",
			},
		],
	});

	const prompt = `
        You are a generating a text for typing test. The user will have to type this text to practice typing skills.

        ${
					mustHaveWords.length > 0
						? `
            You are given a list of words. Please make sure to include some of these words in the text.
            <words>
                ${JSON.stringify(mustHaveWords)}
            </words>
            `
						: ""
				}

        The generated text must have at least 3000 words.
    `;

	const { text } = await generateText({
		model,
		prompt,
	});

	return {
		text,
	};
};
