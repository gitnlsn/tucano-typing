import type { CharacterProps } from "~/components/typing/character";
import type { PressedKey } from "~/validation-schema/pressed-key";

export interface ParseTextWithPressedKeysProps {
	text: string;
	pressedKeys: PressedKey[];
}

export interface ParseTextWithPressedKeysOutput {
	words: Array<{
		characters: CharacterProps[];
	}>;
	typingIndex: number;
}

export const parseTextWithPressedKeys = ({
	text,
	pressedKeys,
}: ParseTextWithPressedKeysProps): ParseTextWithPressedKeysOutput => {
	const words = text.split(" ");

	let index = 0;

	const parsedWords = words.map<{ characters: CharacterProps[] }>((word) => {
		const parsedCharacters: CharacterProps[] = [];
		const characters = word.split("");

		for (const c of characters) {
			const pressedKey = pressedKeys[index];

			if (index === pressedKeys.length) {
				parsedCharacters.push({
					character: c,
					status: "typing",
				});

				index++;
				continue;
			}

			if (!pressedKey) {
				parsedCharacters.push({
					character: c,
					status: "idle",
				});

				index++;
				continue;
			}

			parsedCharacters.push({
				character: c,
				status: pressedKey.key === c ? "success" : "error",
			});
			index++;
		}

		parsedCharacters.push({
			character: " ",
			status: "idle",
		});

		index++;

		return {
			characters: parsedCharacters,
		};
	});

	return {
		words: parsedWords,
		typingIndex: pressedKeys.length,
	};
};
