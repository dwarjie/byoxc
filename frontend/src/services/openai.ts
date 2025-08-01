import OpenAI from 'openai';
import { loadPrompt } from '../utils/loadPrompt';
const openai = new OpenAI({
	apiKey: import.meta.env.VITE_OPENAI_KEY,
	dangerouslyAllowBrowser: true,
});

const generateCourse = async (course: string): Promise<string | boolean> => {
	const prompt = await loadPrompt({ topic: course, difficulty: 'beginner' });

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

		console.log(completion);
		return completion.choices[0].message.content || false;
	} catch (err) {
		console.error(err);
		return false;
	}
};

export { generateCourse };
