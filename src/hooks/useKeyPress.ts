import { useCallback, useEffect } from "react";

interface UseKeyPress {
	onKeyPress: (key: string) => void;
}

export const useKeyPress = ({ onKeyPress }: UseKeyPress) => {
	const onKeyDownHandler = useCallback(
		(event: KeyboardEvent) => {
			if (event.key === "Backspace") {
				onKeyPress("Backspace");
			}
		},
		[onKeyPress],
	);

	const onKeyPressHandler = useCallback(
		(event: KeyboardEvent) => {
			onKeyPress(event.key);
		},
		[onKeyPress],
	);

	useEffect(() => {
		document.addEventListener("keydown", onKeyDownHandler);
		document.addEventListener("keypress", onKeyPressHandler);

		return () => {
			document.removeEventListener("keydown", onKeyDownHandler);
			document.removeEventListener("keypress", onKeyPressHandler);
		};
	}, [onKeyDownHandler, onKeyPressHandler]);
};
