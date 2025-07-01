"use client";

import { useCallback, useState } from "react";
import { Character } from "~/components/typing/character";
import { Paragraph } from "~/components/typing/paragraph";
import { Word } from "~/components/typing/word";
import { useKeyPress } from "~/hooks/useKeyPress";

import { api } from "~/trpc/react";
import { parseTextWithPressedKeys } from "~/utils/parseTextWithPressedKeys";
import {
	pressedKeySchema,
	type PressedKey,
} from "~/validation-schema/pressed-key";

export default function TypingTestPage() {
	const paragraph =
		"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

	const [pressedKeys, setPressedKeys] = useState<PressedKey[]>([]);

	const { words } = parseTextWithPressedKeys({ text: paragraph, pressedKeys });

	const onKeyPress = useCallback((key: string) => {
		if (key === "Backspace") {
			setPressedKeys((current) => current.slice(0, -1));
			return;
		}

		const parsedKey = pressedKeySchema.safeParse({
			key,
			timestamp: new Date(),
		});

		if (!parsedKey.success) {
			return;
		}

		setPressedKeys((current) => [...current, parsedKey.data]);
	}, []);

	useKeyPress({
		onKeyPress,
	});

	return (
		<div className="flex h-screen w-screen items-center justify-center">
			<Paragraph>
				{words.map(({ characters }, i1) => (
					<Word key={i1}>
						{characters.map(({ character, status }, i2) => (
							<Character character={character} status={status} key={i2} />
						))}
					</Word>
				))}
			</Paragraph>
		</div>
	);
}
