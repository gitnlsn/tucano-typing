import { describe, expect, it } from "vitest";
import type { CharacterProps } from "~/components/typing/character";
import { parseTextWithPressedKeys } from "./parseTextWithPressedKeys";

describe("parseTextWithPressedKeys", () => {
	it("should parse text with pressed keys", () => {
		const text = "Hello, world!";
		const pressedKeys = [
			{ key: "h", timestamp: new Date() },
			{ key: "e", timestamp: new Date() },
			{ key: "l", timestamp: new Date() },
			{ key: "o", timestamp: new Date() },
		];

		const output = parseTextWithPressedKeys({ text, pressedKeys });

		expect(output.words).toEqual([
			{
				characters: [
					{ character: "H", status: "error" },
					{ character: "e", status: "success" },
					{ character: "l", status: "success" },
					{ character: "l", status: "error" },
					{ character: "o", status: "typing" },
					{ character: ",", status: "idle" },
					{ character: " ", status: "idle" },
				] as CharacterProps[],
			},
			{
				characters: [
					{ character: "w", status: "idle" },
					{ character: "o", status: "idle" },
					{ character: "r", status: "idle" },
					{ character: "l", status: "idle" },
					{ character: "d", status: "idle" },
					{ character: "!", status: "idle" },

					{ character: " ", status: "idle" },
				] as CharacterProps[],
			},
		]);
	});
});
