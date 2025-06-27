import { randomUUID } from "node:crypto";
import type { PrismaClient } from "@prisma/client";

export class TestingFactory {
	private mockedData: {
		userIds: string[];
	} = {
		userIds: [],
	};

	constructor(private readonly prismaClient: PrismaClient) {}

	async createUser() {
		const user = await this.prismaClient.user.create({
			data: {
				email: `test${randomUUID()}@test.com`,
				name: "Test User",
			},
		});

		this.mockedData.userIds.push(user.id);

		return user;
	}

	async cleanup() {
		for (const userId of this.mockedData.userIds) {
			await this.prismaClient.user.delete({
				where: {
					id: userId,
				},
			});
		}
	}
}
