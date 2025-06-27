import { createGoogleGenerativeAI } from "@ai-sdk/google";
import type { PrismaClient } from "@prisma/client";
import { generateText } from "ai";
import { env } from "~/env";

export interface GeneratedTypingTestInput {
	prismaClient: PrismaClient;
	userId: string;

	paragraphsQuantity?: number;
	language?: "english" | "portuguese";
}

export const generateTypingTest = async ({
	prismaClient,
	userId,

	language = "english",
	paragraphsQuantity = 3,
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
				category: "HARM_CATEGORY_HATE_SPEECH",
				threshold: "BLOCK_LOW_AND_ABOVE",
			},
		],
	});

	const prompt = `
		Context:
		- You are a generating a text for typing test.
		- The user will have to type this text to practice typing skills.

		Instructions:
        - The generated text must have blocks of words.
		- Each block must have at least al least 50 words and the maximum of 100 words.
		- Generate exaclty ${paragraphsQuantity} paragraphs.
		- The generated text must be in ${language} language.
		- Don't return an explanation of the text, return only the generated text.

		${
			mustHaveWords.length > 0
				? `
				<MinorContext>
					- You are given a list of must have words that the user must practice.
					- Please make sure to include some of these words in the generated text.
					<words>
						${JSON.stringify(mustHaveWords)}
					</words>
				</MinorContext>
            `
				: ""
		}
    `;

	const { text } = await generateText({
		model,
		prompt,
	});

	return {
		text,
	};
};
