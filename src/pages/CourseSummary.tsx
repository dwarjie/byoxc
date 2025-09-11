import { ChapterList, NotFound } from '@/components';
import type { Course } from '@/types/common.types';
import { filterCourse } from '@/utils';
import { useMemo } from 'react';
import { Link, useLoaderData, useParams } from 'react-router';

export function CourseSummary() {
	const { courseId } = useParams();
	const courseList: Course[] = useLoaderData();

	const course: Course | false = useMemo(() => {
		return filterCourse(courseList, courseId);
	}, [courseList, courseId]);

	if (!course) {
		return <NotFound />;
	}

	return (
		<div>
			<div className="mb-4 flex justify-start">
				<Link to={'/byoxc/courses'} relative="path">
					<button className="btn btn-soft">⬅ Back to Courses</button>
				</Link>
			</div>
			<h3 className="mb-4 text-5xl font-semibold">{course.title}</h3>
			<p className="mb-10 text-justify text-base text-gray-400">
				<span className="text-lg">Description : </span>
				{course.description}
			</p>
			<h3 className="text-secondary mb-4 text-4xl">Course Content</h3>
			<ul className="list rounded-box mb-10 bg-gray-700 shadow-md">
				{course &&
					course.chapters.map((chapter, index) => (
						<Link to={`./${chapter.id}`} key={chapter.id}>
							<ChapterList chapter={chapter} index={index} />
						</Link>
					))}
			</ul>
		</div>
	);
}
