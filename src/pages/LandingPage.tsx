import { Link } from 'react-router';

export function LandingPage() {
	return (
		<div>
			<div className="flex min-h-screen items-center justify-center p-6">
				<div className="max-w-3xl space-y-8 text-center">
					<h1 className="text-5xl font-bold">Build Your Own X Course</h1>
					<p className="text-lg text-gray-400">
						This is an <span className="font-semibold">MVP</span> (minimum
						viable product) to explore whether project-based course generation
						is possible. Many improvements are coming, but for now the goal is
						simple:
						<span className="text-primary font-semibold">
							{' '}
							test the core idea.
						</span>
					</p>

					<div className="card bg-base-200 p-6 shadow-lg">
						<h2 className="mb-3 text-2xl font-semibold">🎯 Purpose</h2>
						<p className="text-gray-500">
							The purpose of this application is to let you{' '}
							<span className="font-medium">
								generate custom, project-based learning paths
							</span>{' '}
							(courses) with just one prompt. Instead of generic tutorials,
							you’ll get a structured guide tailored to the project you want to
							build.
						</p>
					</div>

					<div className="space-x-4">
						<Link to={'/byoxc/courses'}>
							<button className="btn btn-primary btn-lg">
								🚀 Start Exploring
							</button>
						</Link>
					</div>

					{/* Footer Note */}
					<p className="mt-6 text-sm text-gray-500">
						⚡ This is an experimental prototype. Expect rough edges!
					</p>
				</div>
			</div>
		</div>
	);
}
