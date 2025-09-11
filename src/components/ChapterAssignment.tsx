interface ChapterAssignmentProps {
	exercise: string;
}

export function ChapterAssignment({ exercise }: ChapterAssignmentProps) {
	return (
		<li>
			<p className="mb-4 text-justify">{exercise}</p>
		</li>
	);
}
