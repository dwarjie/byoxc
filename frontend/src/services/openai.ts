import OpenAI from 'openai';
import { loadPrompt } from '../utils/loadPrompt';
import type { Course } from '../types/common.types';
const openai = new OpenAI({
	apiKey: import.meta.env.VITE_OPENAI_KEY,
	dangerouslyAllowBrowser: true,
});

const generateCourse = async (
	topic: string,
	difficulty: string,
): Promise<Course | false> => {
	const prompt = await loadPrompt({ topic, difficulty });

	try {
		const completion = await openai.chat.completions.create({
			model: 'o4-mini-2025-04-16',
			messages: [
				{
					role: 'system',
					content: prompt,
				},
			],
			response_format: { type: 'json_object' },
		});

		const courseContent = completion.choices[0].message.content;
		if (!courseContent) return false;

		const parsedCourse: Course = JSON.parse(courseContent);
		console.log(completion);
		return parsedCourse;
	} catch (err) {
		console.error(err);
		return false;
	}
};

export { generateCourse };
