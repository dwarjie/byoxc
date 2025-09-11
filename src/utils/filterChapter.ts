import type { Chapter } from '@/types/common.types';

/**
 * Utility function to get a specific chapter based on id
 *
 * @param {Chapter[]} chapterList The list of chapters
 * @param {string} chapterId The chapterId you need to get
 * @returns {Chapter | false} The specific chapter or false
 */
export const filterChapter = (
	chapterList: Chapter[],
	chapterId: string | undefined,
): Chapter | false => {
	if (!chapterId || !chapterList) return false;

	const filteredChapter = chapterList.find(
		(chapter) => chapter.id === chapterId,
	);

	return filteredChapter || false;
};
