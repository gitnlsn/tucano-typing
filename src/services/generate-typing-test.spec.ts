import { afterAll, describe, expect, it } from "vitest";
import { generateTypingTest } from "./generate-typing-test";
import { PrismaClient } from "@prisma/client";
import { TestingFactory } from "~/tests/TestingFactory";

describe("generateTypingTest", () => {
	const prismaClient = new PrismaClient();
	const testingFactory = new TestingFactory(prismaClient);

	afterAll(async () => {
		await testingFactory.cleanup();
	});

	it("should generate a typing test", async () => {
		const mockedUser = await testingFactory.createUser();

		const typingTest = generateTypingTest({
			prismaClient,
			userId: mockedUser.id,
		});

		console.log({ typingTest });

		expect(typingTest).toBeDefined();
	});
});