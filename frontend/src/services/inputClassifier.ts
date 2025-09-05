import type { ChatCompletionMessageParam } from 'openai/resources';
import { loadPrompt } from '../utils/loadPrompt';
import { getCompletion } from './openai.service';
import type { Classifier } from '../types/common.types';

export const inputClassifier = async (topic: string): Promise<boolean> => {
	const prompt = await loadPrompt({ topic }, './classifier-prompt.txt');
	const messages: ChatCompletionMessageParam[] = [];

	try {
		if (!prompt) throw new Error("Can't load prompt");
		messages.push({
			role: 'system',
			content: prompt,
		});

		const completion = await getCompletion(messages, 'gpt-4o-mini-2024-07-18');
		const result = completion.choices[0].message.content;
		if (!result) return false;

		const parsedResult: Classifier = JSON.parse(result);
		console.log(completion);
		return parsedResult.valid;
	} catch (err) {
		console.error(err);
		return false;
	}
};
