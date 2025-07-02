import type { CharacterProps } from "~/components/typing/character";
import type { Status } from "~/components/typing/status";
import type { PressedKey } from "~/validation-schema/pressed-key";

export interface ParseTextWithPressedKeysProps {
	text: string;
	pressedKeys: PressedKey[];
}

export interface ParseTextWithPressedKeysOutput {
	words: Array<{
		characters: CharacterProps[];
		status: Status;
	}>;
	metrics: {
		typingIndex: number;

		totalWordsCount: number;
		remainingWordsCount: number;

		characterAccuracy: number;
		wordsAccuracy: number;

		wordsPerMinute: number | null;
	};
}

const defineStatus = (characters: CharacterProps[]): Status => {
	if (characters.some((character) => character.status === "idle")) {
		return "idle";
	}
	if (characters.some((character) => character.status === "error")) {
		return "error";
	}
	if (characters.every((character) => character.status === "success")) {
		return "success";
	}
	return "idle";
};

export const parseTextWithPressedKeys = ({
	text,
	pressedKeys,
}: ParseTextWithPressedKeysProps): ParseTextWithPressedKeysOutput => {
	const words = text.split(" ").map((word) => `${word} `);

	// 1. Parse words algorithm
	let index = 0;
	let backspaceCount = 0;

	const parsedWords = words.map<{
		characters: CharacterProps[];
		status: Status;
	}>((word) => {
		const parsedCharacters: CharacterProps[] = [];
		const characters = word.split("");

		characters.forEach((c, i) => {
			const indexD = index - backspaceCount;
			const pressedKey = pressedKeys[indexD];

			if (pressedKey?.key === "Backspace") {
				backspaceCount++;
				return;
			}

			if (indexD === pressedKeys.length) {
				parsedCharacters.push({
					character: c,
					status: "typing",
				});

				index++;
				return;
			}

			if (!pressedKey) {
				parsedCharacters.push({
					character: c,
					status: "idle",
				});

				index++;
				return;
			}

			parsedCharacters[i] = {
				character: c,
				status: pressedKey.key === c ? "success" : "error",
			};
			index++;
		});

		return {
			characters: parsedCharacters,
			status: defineStatus(parsedCharacters),
		};
	});

	// 2. Calculate remaining words
	const typingIndex = pressedKeys.length;

	const totalWordsCount = text.split(" ").length;
	const remainingWords = parsedWords.filter((word) => word.status === "idle");
	const remainingWordsCount = remainingWords.length;

	// 3. Calculate speed
	const startTime = pressedKeys[0]?.timestamp;
	const endTime = pressedKeys[pressedKeys.length - 1]?.timestamp;
	const duration =
		startTime && endTime
			? (endTime.getTime() - startTime.getTime()) / (1000 * 60)
			: null;

	const typedWordsCount = parsedWords.filter(
		(word) => word.status !== "idle",
	).length;
	const wordsPerMinute =
		duration !== null && duration !== 0 ? typedWordsCount / duration : null;

	const totalPressedCharactersCount = pressedKeys.length;
	const successCharactersCount = parsedWords
		.flatMap((word) => word.characters.map((character) => character))
		.filter((character) => character.status === "success");
	const characterAccuracy =
		totalPressedCharactersCount > 0
			? successCharactersCount.length / totalPressedCharactersCount
			: 0;

	const successTypedWordsCount = parsedWords.filter(
		(word) => word.status === "success",
	).length;
	const wordsAccuracy =
		typedWordsCount > 0 ? successTypedWordsCount / typedWordsCount : 0;

	return {
		words: parsedWords,
		metrics: {
			typingIndex,

			totalWordsCount,
			remainingWordsCount,

			characterAccuracy,
			wordsAccuracy,

			wordsPerMinute,
		},
	};
};
