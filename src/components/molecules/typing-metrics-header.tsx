import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Lead, Small } from "~/components/ui/typography";
import { cn } from "~/lib/utils";
import type { ParseTextWithPressedKeysOutput } from "~/utils/parseTextWithPressedKeys";

interface MetricBlockProps {
	title: string;
	subtitle: string;
	value: string;
	cardClassName: string;
	titleClassName: string;
	valueClassName: string;
}

const MetricBlock = ({
	title,
	value,
	cardClassName,
	titleClassName,
	valueClassName,
}: MetricBlockProps) => (
	<Card className={cn("gap-0 rounded-none px-2 py-4 pl-4", cardClassName)}>
		<CardHeader className="px-0">
			<CardTitle className="flex items-center gap-2">
				<Small className={titleClassName}>{title}</Small>
			</CardTitle>
		</CardHeader>
		<CardContent className="px-0">
			<Lead className={`font-bold text-3xl ${valueClassName}`}>{value}</Lead>
		</CardContent>
	</Card>
);

interface TypingMetricsHeaderProps {
	metrics: ParseTextWithPressedKeysOutput["metrics"];
}

export const TypingMetricsHeader = ({ metrics }: TypingMetricsHeaderProps) => {
	const {
		wordsPerMinute,
		wordsAccuracy,
		characterAccuracy,
		remainingWordsCount,
		totalWordsCount,
	} = metrics;

	const formatWPM = (wpm: number | null) => {
		if (wpm === null) return "0";
		return Math.round(wpm).toString();
	};

	const formatAccuracy = (accuracy: number) => {
		return `${Math.round(accuracy * 100)}%`;
	};

	const getAccuracyColor = (accuracy: number) => {
		if (accuracy >= 0.95) return "border-green-200 bg-green-50/50";
		if (accuracy >= 0.8) return "border-gray-200 bg-gray-50/50";
		return "border-red-200 bg-red-50/50";
	};

	const getAccuracyTextColor = (accuracy: number) => {
		if (accuracy >= 0.95) return "text-green-700";
		if (accuracy >= 0.8) return "text-gray-700";
		return "text-red-700";
	};

	const getAccuracyValueColor = (accuracy: number) => {
		if (accuracy >= 0.95) return "text-green-800";
		if (accuracy >= 0.8) return "text-gray-800";
		return "text-red-800";
	};

	const progressBarPercentage = Math.floor(
		(remainingWordsCount / totalWordsCount) * 100,
	);

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
			<MetricBlock
				title="Speed"
				subtitle="WPM"
				value={formatWPM(wordsPerMinute)}
				cardClassName="border-gray-200 bg-gray-50/50"
				titleClassName="text-gray-600"
				valueClassName="text-gray-800"
			/>

			<MetricBlock
				title="Character"
				subtitle="Accuracy"
				value={formatAccuracy(characterAccuracy)}
				cardClassName={getAccuracyColor(characterAccuracy)}
				titleClassName={getAccuracyTextColor(characterAccuracy)}
				valueClassName={getAccuracyValueColor(characterAccuracy)}
			/>

			<MetricBlock
				title="Word"
				subtitle="Accuracy"
				value={formatAccuracy(wordsAccuracy)}
				cardClassName={getAccuracyColor(wordsAccuracy)}
				titleClassName={getAccuracyTextColor(wordsAccuracy)}
				valueClassName={getAccuracyValueColor(wordsAccuracy)}
			/>

			<MetricBlock
				title="Remaining"
				subtitle="Words"
				value={remainingWordsCount.toString()}
				cardClassName="border-gray-200 bg-gray-50/50"
				titleClassName="text-gray-600"
				valueClassName="text-gray-800"
			/>

			<div className="col-span-1 h-2 w-full border-1 border-gray-200 bg-gradient-to-r from-red-400 to-green-400 md:col-span-2 lg:col-span-4">
				<div
					className={cn("ml-auto h-full bg-white")}
					style={{
						width: `${progressBarPercentage}%`,
					}}
				/>
			</div>
		</div>
	);
};
