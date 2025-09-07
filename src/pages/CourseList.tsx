import CourseCard from '@/components/CourseCard';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import type { Course } from '@/types/common.types';
import { useEffect, useState } from 'react';
import { Link } from 'react-router';

export function CourseList() {
	const { getItem } = useLocalStorage(import.meta.env.VITE_COURSE_KEY);
	const [courses, setCourses] = useState<Course[] | false>(false);

	useEffect(() => {
		const currentCourses = getItem();
		console.log(currentCourses);
		if (currentCourses) setCourses(currentCourses);
	}, []);

	return (
		<div>
			<h1 className="text-7xl font-semibold">Your Courses</h1>
			<div className="mt-10 flex flex-row flex-wrap gap-9">
				{courses &&
					courses.map((course) => (
						<Link to={`/byoxc/courses/${course.id}`} key={course.id}>
							<CourseCard title={course.title} />
						</Link>
					))}
				<Link to={'/byoxc/generate'}>
					<CourseCard title="Generate a new course" emptyState={true} />
				</Link>
			</div>
		</div>
	);
}
