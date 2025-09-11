import type { Chapter } from '@/types/common.types';

interface ChapterListProps {
	chapter: Chapter;
	index: number;
}

export function ChapterList({ chapter, index }: ChapterListProps) {
	return (
		<li className="list-row cursor-pointer hover:bg-gray-600">
			<div>
				<div className="text-lg font-medium">Chapter {index + 1}</div>
				<div className="text-md font-semibold uppercase opacity-70">
					{chapter.title}
				</div>
			</div>
			<p className="list-col-wrap text-xs">{chapter.description}</p>
		</li>
	);
}
