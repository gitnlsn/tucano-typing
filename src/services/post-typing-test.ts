import type { PrismaClient } from "@prisma/client";
import type { PressedKey } from "~/validation-schema/pressed-key";

export interface PostTypingTestInput {
    prismaClient: PrismaClient
    userId: string
    text: string;
    pressedKeys: PressedKey[];
}

export const postTypingTest = async ({
    prismaClient,
    userId,
    pressedKeys,
    text
}: PostTypingTestInput) => {
    const typingTest = await prismaClient.typingTest.create({
        data: {
            text,
            pressedKeys: {
                createMany: {
                    data: pressedKeys.map(key => ({
                        timestamp: key.timestamp,
                        key: key.key,
                    }))
                }
            }
            , userId
        }
    })


    return { typingTest };
}