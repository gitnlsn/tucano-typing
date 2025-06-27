import { describe, expect, it } from "vitest";
import { TypingTestSchema } from "../../src/validation-schema/typing-test";

describe("TypingTestSchema", () => {
	it.each([
		{
			text: "Hello, world!",
			pressedKeys: [
				{ timestamp: new Date(), key: "H" },
				{ timestamp: new Date(), key: "e" },
				{ timestamp: new Date(), key: "l" },
				{ timestamp: new Date(), key: "l" },
				{ timestamp: new Date(), key: "o" },
				{ timestamp: new Date(), key: "," },
				{ timestamp: new Date(), key: " " },
				{ timestamp: new Date(), key: "w" },
				{ timestamp: new Date(), key: "o" },
				{ timestamp: new Date(), key: "r" },
				{ timestamp: new Date(), key: "l" },
				{ timestamp: new Date(), key: "d" },
				{ timestamp: new Date(), key: "!" },
			],
		},
	])("should be valid for a valid typing test", (typingTest) => {
		const result = TypingTestSchema.safeParse(typingTest);
		expect(result.success).toBe(true);
	});
});
