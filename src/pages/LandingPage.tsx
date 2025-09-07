import { Link } from 'react-router';

export function LandingPage() {
	return (
		<div>
			<h1 className="text-7xl font-semibold">Your Courses</h1>
			<Link to={'/byoxc/courses'}>
				<button className="btn btn-soft btn-primary">View Courses</button>
			</Link>
		</div>
	);
}
