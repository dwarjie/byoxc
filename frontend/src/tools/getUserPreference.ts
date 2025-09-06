import type { PreferenceQuestion } from '@/types/common.types';

export const getUserPreference = (
	question: string,
	choices: string[],
): PreferenceQuestion => {
	if (question.trim() == '' || choices.length < 3 || choices.length > 5)
		throw new Error('Invalid User Preferences Question or Choices.');

	return {
		question,
		choices,
		tool_id: '1', // TODO
	};
};
