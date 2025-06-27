import type { PressedKey } from "~/validation-schema/pressed-key";

export interface CalculateMetricsInput {
    text: string;
    pressedKeys: PressedKey[];
}

export const calculateMetrics = async (input: CalculateMetricsInput) => {
    const { text, pressedKeys } = input;

    return {
        speed: 0,
        accuracy: 0,
    }
}