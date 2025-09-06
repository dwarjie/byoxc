interface ErrorStateProps {
	message: string;
}

export function ErrorState({ message }: ErrorStateProps) {
	return (
		<div className="flex h-full w-full flex-col items-center justify-center gap-2.5">
			<span className="loading loading-ball loading-xl"></span>
			<h1 className="text-2xl">{message}</h1>
		</div>
	);
}
