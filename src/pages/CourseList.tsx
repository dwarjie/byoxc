import CourseCard from '@/components/CourseCard';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import type { Course } from '@/types/common.types';
import { useEffect, useState } from 'react';

export function CourseList() {
	const { getItem } = useLocalStorage(import.meta.env.VITE_COURSE_KEY);
	const [courses, setCourses] = useState<Course[] | false>(false);

	useEffect(() => {
		const currentCourses = getItem();
		if (currentCourses) setCourses(currentCourses);
	}, []);

	return (
		<div className="bg-base-100 min-h-screen p-10">
			<h1 className="mb-8 text-4xl font-bold">Your Courses</h1>

			<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
				<CourseCard title="Generate a new course" emptyState={true} />
				{courses &&
					courses.map((course) => (
						<CourseCard title={course.title} id={course.id} key={course.id} />
					))}
			</div>
		</div>
	);
}
