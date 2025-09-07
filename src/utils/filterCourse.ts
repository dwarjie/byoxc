import type { Course } from '@/types/common.types';

/**
 * Utility function to get a specific course based on id
 *
 * @param {Course[]} courseList The list of saved courses
 * @param {string} courseId The courseId you need to get
 * @returns {Course | false} The specific course or false
 */
export const filterCourse = (
	courseList: Course[],
	courseId: string | undefined,
): Course | false => {
	if (!courseId || !courseList) return false;

	const filteredCourse = courseList.find((course) => course.id === courseId);

	return filteredCourse || false;
};
