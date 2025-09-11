import { Link } from 'react-router';

interface CourseCardProps {
	id?: string;
	title: string;
	emptyState?: boolean;
}

function CourseCard({ title, id, emptyState }: CourseCardProps) {
	if (emptyState) {
		return (
			<div className="card bg-base-200 border-primary flex items-center justify-center border border-dashed shadow-xl transition-transform hover:scale-105">
				<div className="card-body items-center text-center">
					<h2 className="card-title text-primary">{title}</h2>
					<p className="text-gray-500">Start building a project-based guide</p>
					<div className="card-actions mt-4">
						<Link to={'/byoxc/generate'}>
							<button className="btn btn-primary">+ Generate</button>
						</Link>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="card bg-base-100 shadow-xl transition-transform hover:scale-105">
			<div className="card-body">
				<h2 className="card-title">🚀 {title}</h2>
				<div className="card-actions justify-end">
					<Link to={`/byoxc/courses/${id}`}>
						<button className="btn btn-outline btn-sm">View</button>
					</Link>
				</div>
			</div>
		</div>
	);
}

export default CourseCard;
