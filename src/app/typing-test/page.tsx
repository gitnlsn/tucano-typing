"use client";

import { useCallback, useState } from "react";
import { Character } from "~/components/typing/character";
import { Paragraph } from "~/components/typing/paragraph";
import { Word } from "~/components/typing/word";
import { useKeyPress } from "~/hooks/useKeyPress";

import { api } from "~/trpc/react";
import { parseTextWithPressedKeys } from "~/utils/parseTextWithPressedKeys";
import {
	type PressedKey,
	pressedKeySchema,
} from "~/validation-schema/pressed-key";

export default function TypingTestPage() {
	const { data, isLoading, error } = api.magic.generateTypingTest.useQuery();
	const postTypingTestMutation = api.magic.postTypingTest.useMutation();

	const [pressedKeys, setPressedKeys] = useState<PressedKey[]>([]);

	const { words, metrics } = parseTextWithPressedKeys({
		text: data?.text ?? "",
		pressedKeys,
	});

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

	useKeyPress({ onKeyPress });

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
