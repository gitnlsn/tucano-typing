import { describe, expect, it } from "vitest";
import { pressedKeySchema } from "./pressed-key";

describe("PressedKeySchema", () => {
	it.each([
		["a", "a"],
		["b", "b"],
		["A", "A"],
		["Z", "Z"],
		["0", "0"],
		["9", "9"],

		[",", ","],
		[".", "."],
		[":", ":"],
		[";", ";"],
		["!", "!"],
		["?", "?"],

		["-", "-"],

		["(", "("],
		[")", ")"],

		["[", "["],
		["]", "]"],

		[" ", " "],

		["\n", "\n"],
	])("should be valid for key %s", (key) => {
		const pressedKey = {
			timestamp: new Date(),
			key: key,
		};

		const result = pressedKeySchema.safeParse(pressedKey);
		expect(result.success).toBe(true);
	});

	it("should reject empty string", () => {
		const pressedKey = {
			timestamp: new Date(),
			key: "",
		};

		const result = pressedKeySchema.safeParse(pressedKey);
		expect(result.success).toBe(false);
	});

	it("should reject multiple characters", () => {
		const pressedKey = {
			timestamp: new Date(),
			key: "ab",
		};

		const result = pressedKeySchema.safeParse(pressedKey);
		expect(result.success).toBe(false);
	});
});
