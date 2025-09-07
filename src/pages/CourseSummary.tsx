import { NotFound } from '@/components';
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
			<h3 className="mb-4 text-5xl font-semibold">
				<Link to={'../courses'}>
					<span className="mr-4">&lt;-</span>
				</Link>
				{course.title}
			</h3>
			<p className="mb-10 text-justify text-base text-gray-400">
				<span className="text-lg">Description : </span>Lorem Ipsum is simply
				dummy text of the printing and typesetting industry. Lorem Ipsum has
				been the industry's standard dummy text ever since the 1500s, when an
				unknown printer took a galley of type and scrambled it to make a type
				specimen book. It has survived not only five centuries, but also the
				leap into electronic typesetting, remaining essentially unchanged. It
				was popularised in the 1960s with the release of Letraset sheets
				containing Lorem Ipsum passages, and more recently with desktop
				publishing software like Aldus PageMaker including versions of Lorem
				Ipsum.
			</p>
			<h3 className="text-secondary mb-4 text-4xl">Course Content</h3>
			<ul className="list bg-base-200 rounded-box shadow-md">
				{course &&
					course.chapters.map((chapter, index) => (
						<li className="list-row" key={index}>
							<div>
								<div className="text-lg font-medium">Chapter {index + 1}</div>
								<div className="text-md font-semibold uppercase opacity-60">
									{chapter.title}
								</div>
							</div>
							<p className="list-col-wrap text-xs">{chapter.description}</p>
						</li>
					))}
			</ul>
		</div>
	);
}
