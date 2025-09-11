import type { Chapter, Course } from '@/types/common.types';
import {
	ChapterAssignment,
	ChapterBody,
	ChapterSkeleton,
	NotFound,
} from '@/components';
import { filterChapter, filterCourse } from '@/utils';
import { useEffect, useMemo, useState } from 'react';
import { Link, useLoaderData, useParams } from 'react-router';

export function Chapter() {
	const [chapter, setChapter] = useState<Chapter | false>(false);
	const [loading, setLoading] = useState(true);
	const { courseId, chapterId } = useParams();
	const courseList: Course[] = useLoaderData();

	const course: Course | false = useMemo(() => {
		return filterCourse(courseList, courseId);
	}, [courseList, courseId]);

	useEffect(() => {
		if (course && chapterId) {
			const currentChapter = filterChapter(course.chapters, chapterId);
			if (currentChapter) setChapter(currentChapter);
		}
		setLoading(false);
	}, [courseId, chapterId]);

	if (loading) return <ChapterSkeleton />;

	if (!course || !chapter) {
		return <NotFound />;
	}

	return (
		<div>
			<div className="mb-4 flex justify-start">
				<Link to={`/byoxc/courses/${courseId}`} relative="path">
					<button className="btn btn-soft">⬅ Back to Courses</button>
				</Link>
			</div>
			<h3 className="mb-4 text-5xl font-semibold">{chapter.title}</h3>
			<p className="mb-10 text-justify text-base text-gray-400">
				<span className="text-lg">Description : </span>
				{chapter.description}
			</p>
			<div className="tabs tabs-lift mb-10">
				<input
					type="radio"
					name="chapter_tab"
					className="tab text-lg"
					aria-label="Content"
					defaultChecked
				/>
				<div className="tab-content bg-base-200 border-base-300 p-6">
					<ChapterBody body={chapter.body} />
				</div>

				<input
					type="radio"
					name="chapter_tab"
					className="tab text-lg"
					aria-label="Assignment"
				/>
				<div className="tab-content bg-base-200 border-base-300 p-6">
					<div className="card bg-base-300 w-2/3 md:text-lg lg:text-xl">
						<div className="card-body">
							<ol className="ml-4 list-decimal text-lg">
								{chapter &&
									chapter.exercises.map((exercise, index) => (
										<ChapterAssignment exercise={exercise} key={index} />
									))}
							</ol>
						</div>
					</div>
				</div>

				<input
					type="radio"
					name="chapter_tab"
					className="tab text-lg"
					aria-label="Resources"
				/>
				<div className="tab-content bg-base-100 border-base-300 p-6">
					<div className="card bg-base-300 w-2/3 md:text-lg lg:text-xl">
						<div className="card-body">
							<ul className="ml-4 list-disc text-lg">
								{chapter &&
									chapter.resources.map((link, index) => (
										<a href={link.link} key={index} className="link">
											<li>{link.title}</li>
										</a>
									))}
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
