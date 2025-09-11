import { Link } from 'react-router';

// reference: https://flowbite.com/blocks/marketing/404/
export function NotFound() {
	return (
		<div className="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16">
			<div className="mx-auto max-w-screen-sm text-center">
				<h1 className="text-primary-600 dark:text-primary-500 mb-4 text-7xl font-extrabold tracking-tight lg:text-9xl">
					404
				</h1>
				<p className="mb-4 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl dark:text-white">
					Something's missing.
				</p>
				<p className="mb-4 text-lg font-light text-gray-500">
					Sorry, we can't find that page.
				</p>
				<Link to={'/byoxc'}>
					<button className="bg-secondary my-4 inline-flex rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white focus:ring-4 focus:outline-none">
						Back to Homepage
					</button>
				</Link>
			</div>
		</div>
	);
}
