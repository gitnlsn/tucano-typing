import { addMinutes } from "date-fns";
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
				status: "idle",
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
				status: "idle",
			},
		]);
	});

	it("should validate worlds with correct success status", () => {
		const text = "Hello, world!";
		const pressedKeys = [
			{ key: "H", timestamp: new Date() },
			{ key: "e", timestamp: new Date() },
			{ key: "l", timestamp: new Date() },
			{ key: "l", timestamp: new Date() },
			{ key: "o", timestamp: new Date() },
			{ key: ",", timestamp: addMinutes(new Date(), 1) },
			{ key: " ", timestamp: addMinutes(new Date(), 1) },
		];

		const output = parseTextWithPressedKeys({ text, pressedKeys });

		expect(output.words).toEqual([
			{
				characters: expect.anything(),
				status: "success",
			},
			{
				characters: expect.anything(),
				status: "idle",
			},
		]);
	});

	it("should validate worlds with correct error status", () => {
		const text = "Hello, world!";
		const pressedKeys = [
			{ key: "H", timestamp: new Date() },
			{ key: "e", timestamp: new Date() },
			{ key: "l", timestamp: new Date() },
			{ key: "l", timestamp: new Date() },
			{ key: "a", timestamp: new Date() },
			{ key: ",", timestamp: addMinutes(new Date(), 1) },
			{ key: " ", timestamp: addMinutes(new Date(), 1) },
		];

		const output = parseTextWithPressedKeys({ text, pressedKeys });

		expect(output.words).toEqual([
			{
				characters: expect.anything(),
				status: "error",
			},
			{
				characters: expect.anything(),
				status: "idle",
			},
		]);
	});

	it("should calculate metrics", () => {
		const text = "Hello, world!";
		const pressedKeys = [
			{ key: "H", timestamp: new Date() },
			{ key: "e", timestamp: new Date() },
			{ key: "l", timestamp: new Date() },
			{ key: "l", timestamp: new Date() },
			{ key: "o", timestamp: new Date() },
			{ key: ",", timestamp: addMinutes(new Date(), 1) },
			{ key: " ", timestamp: addMinutes(new Date(), 1) },
		];

		const { metrics } = parseTextWithPressedKeys({ text, pressedKeys });

		expect(metrics.typingIndex).toBe(7);
		expect(metrics.remainingWordsCount).toBe(1);

		expect(metrics.wordsPerMinute).toBe(1);
		expect(metrics.wordsAccuracy).toBe(1);
		expect(metrics.characterAccuracy).toBe(1);
	});

	it("should calculate metrics with two words", () => {
		const startTime1 = new Date();
		const endTime1 = addMinutes(startTime1, 1);
		const startTime2 = addMinutes(startTime1, 2);
		const endTime2 = addMinutes(startTime1, 3);

		const text = "Hello, world!";
		const pressedKeys = [
			{ key: "H", timestamp: startTime1 },
			{ key: "e", timestamp: startTime1 },
			{ key: "l", timestamp: startTime1 },
			{ key: "l", timestamp: startTime1 },
			{ key: "o", timestamp: startTime1 },
			{ key: ",", timestamp: startTime1 },
			{ key: " ", timestamp: endTime1 },

			{ key: "w", timestamp: startTime2 },
			{ key: "o", timestamp: startTime2 },
			{ key: "r", timestamp: startTime2 },
			{ key: "l", timestamp: startTime2 },
			{ key: "f", timestamp: startTime2 }, // wrong key
			{ key: "!", timestamp: startTime2 },
			{ key: " ", timestamp: endTime2 },
		];

		const { metrics } = parseTextWithPressedKeys({ text, pressedKeys });

		expect(metrics.typingIndex).toBe(14);
		expect(metrics.remainingWordsCount).toBe(0);

		expect(metrics.wordsPerMinute).toBe(0.6666666666666666);
		expect(metrics.wordsAccuracy).toBe(0.5);
		expect(metrics.characterAccuracy).toBe(0.9285714285714286);
	});
});
