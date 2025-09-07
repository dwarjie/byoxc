import { useLocalStorage } from '@/hooks/useLocalStorage';
import type { Course } from '@/types/common.types';

export const loader = () => {
	const { getItem } = useLocalStorage(import.meta.env.VITE_COURSE_KEY);
	const currentCourse: Course[] | false = getItem();

	if (!currentCourse) return [];

	return currentCourse;
};
