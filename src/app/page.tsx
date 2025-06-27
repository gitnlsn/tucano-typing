import { redirect } from "next/navigation";
import { Button } from "~/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "~/components/ui/card";
import { H1, Lead, Muted } from "~/components/ui/typography";
import { auth, signIn, signOut } from "~/server/auth";

export default async function Home() {
	const session = await auth();

	const handleSignIn = async () => {
		"use server";
		await signIn("google", { redirectTo: "/typing-test" });
	};

	const handleSignOut = async () => {
		"use server";
		await signOut();
	};

	return (
		<div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
			<Card className="w-full max-w-md">
				<CardHeader className="text-center">
					<H1 className="text-gray-900">Tucano Typing</H1>
					<Lead className="text-gray-600">Melhore suas habilidades de digitação</Lead>
				</CardHeader>
				<CardContent className="space-y-4">
					{session ? (
						<>
							<div className="mb-4 text-center">
								<Muted className="text-gray-600">
									Bem-vindo,{" "}
									<span className="font-semibold">{session.user?.name}</span>!
								</Muted>
							</div>
							<div className="space-y-3">
								<form
									action={async () => {
										"use server";
										redirect("/typing-test");
									}}
								>
									<Button type="submit" className="w-full" size="lg">
										Começar Teste de Digitação
									</Button>
								</form>
								<form action={handleSignOut}>
									<Button type="submit" variant="outline" className="w-full">
										Sair
									</Button>
								</form>
							</div>
						</>
					) : (
						<div className="space-y-3">
							<form action={handleSignIn}>
								<Button type="submit" className="w-full" size="lg">
									Começar Teste de Digitação
								</Button>
							</form>
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	);
}
