import { PrismaClient } from "@prisma/client";
import { afterAll, describe, expect, it } from "vitest";
import { TestingFactory } from "~/tests/TestingFactory";
import { generateTypingTest } from "./generate-typing-test";

describe("generateTypingTest", async () => {
	const prismaClient = new PrismaClient();
	const testingFactory = new TestingFactory(prismaClient);

	afterAll(async () => {
		await testingFactory.cleanup();
	});

	it.skip(
		"should generate a typing test",
		async () => {
			// SKIPED so that it wont consume tokens in google api
			const mockedUser = await testingFactory.createUser();

			const typingTest = await generateTypingTest({
				prismaClient,
				userId: mockedUser.id,
			});

			expect(typingTest).toBeDefined();
		},
		{ timeout: 60000 },
	);

	it.skip(
		"should generate a typing test in portuguese",
		async () => {
			// SKIPED so that it wont consume tokens in google api
			const mockedUser = await testingFactory.createUser();

			const typingTest = await generateTypingTest({
				prismaClient,
				userId: mockedUser.id,

				language: "portuguese",
			});

			console.log({ typingTest });

			expect(typingTest).toBeDefined();
		},
		{ timeout: 60000 },
	);
});
