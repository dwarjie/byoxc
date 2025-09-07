interface CourseCardProps {
	id?: string;
	title: string;
	emptyState?: boolean;
}

function CourseCard({ title, emptyState }: CourseCardProps) {
	if (emptyState) {
		return (
			<div className="bg-primary text-primary-content h-60 w-80 opacity-55">
				<div className="p-4">
					<h3 className="text-2xl">{title}</h3>
					<h3 className="text-2xl">+</h3>
				</div>
			</div>
		);
	}

	return (
		<div className="bg-primary text-primary-content h-60 w-80">
			<div className="p-4">
				<h3 className="text-2xl">{title}</h3>
			</div>
		</div>
	);
}

export default CourseCard;
