interface ErrorStateProps {
	message: string;
	reset: () => void;
}

export function ErrorState({ message, reset }: ErrorStateProps) {
	return (
		<div className="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16">
			<div className="mx-auto max-w-screen-sm text-center">
				<h1 className="text-primary-600 dark:text-primary-500 mb-4 text-5xl font-extrabold tracking-tight lg:text-6xl">
					SOMETHING WENT WRONG
				</h1>
				<p className="mb-4 text-lg font-light text-gray-500">{message}</p>
				<button
					className="bg-secondary my-4 inline-flex rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white focus:ring-4 focus:outline-none"
					onClick={reset}
				>
					Try Again
				</button>
			</div>
		</div>
	);
}
