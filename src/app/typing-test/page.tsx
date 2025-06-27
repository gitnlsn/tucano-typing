import { api } from "~/trpc/react";

export default async function TypingTestPage() {
	const { data, isPending, error } = api.magic.generateTypingTest.useQuery(
		undefined,
		{
			refetchOnWindowFocus: false,
			refetchOnMount: false,
			refetchOnReconnect: false,
		},
	);
	const postTypingTest = api.magic.postTypingTest.useMutation();

	return <div>hello world</div>;
}
