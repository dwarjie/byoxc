import { loadPrompt } from '@/utils/loadPrompt';
import { getParsedCompletion } from './completion.service';
import { CourseSchema } from '@/schema/course.schema';

import type { ChatCompletionMessageParam } from 'openai/resources';
import type { ParsedChatCompletion } from 'openai/resources/chat/completions.mjs';
import type { Course, TopicDifficulty } from '@/types/common.types';

/**
 * Generate the main course based on the user input
 *
 * This should be called after the Pre-prompt classifier.
 * @param {string} topic The user inputed topic
 * @param {TopicDifficulty} difficulty Difficulty level that the user can handle
 * @returns {Promise<Course | false>} The parsed course in json format otherwise false
 */
export const getCourse = async (
	topic: string,
	difficulty: TopicDifficulty,
): Promise<Course | false> => {
	const prompt = await loadPrompt({ topic, difficulty }, './prompt.txt');
	const messages: ChatCompletionMessageParam[] = [];

	try {
		if (!prompt) throw new Error("Can't load prompt");
		messages.push({
			role: 'system',
			content: prompt,
		});

		const completion: ParsedChatCompletion<Course> = await getParsedCompletion(
			messages,
			'gpt-4o-mini-2024-07-18',
			CourseSchema,
			'course',
		);

		if (!completion?.choices[0]?.message?.parsed)
			throw new Error(
				'The model was not able to generate a valid response due to safety reason.',
			);

		const parsedCourse: Course = completion.choices[0].message.parsed;

		console.log(parsedCourse);
		console.log(completion);
		return parsedCourse;
	} catch (err) {
		console.error(err);
		return false;
	}
};
