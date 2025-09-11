export function ChapterSkeleton() {
	return (
		<div className="flex flex-col gap-4">
			<div className="skeleton mt-10 h-8 w-60"></div>
			<div className="skeleton h-4 w-3/4"></div>
			<div className="skeleton mb-10 h-4 w-2/3"></div>
			<div className="skeleton h-96 w-2/3"></div>
			<div className="skeleton mt-10 h-8 w-60"></div>
			<div className="skeleton h-60 w-2/3"></div>
		</div>
	);
}
