import type { ChatCompletionMessageParam } from 'openai/resources';
import type { Classifier } from '@/types/common.types';
import type { ParsedChatCompletion } from 'openai/resources/chat/completions.mjs';
import { getParsedCompletion } from './completion.service';
import { loadPrompt } from '@/utils';
import { ClassifierSchema } from '@/schema/classifier.schema';

/**
 * Pre-prompt Classifier to be run before the main prompt.
 *
 * Main purpose is to identify if the topic provided is aligned with the main prompt objective.
 * @param {string} topic User inputed topic
 * @returns {boolean} true if the topic is valid otherwise false
 */
export const inputClassifier = async (topic: string): Promise<boolean> => {
	const prompt = await loadPrompt({ topic }, 'classifier-prompt.txt');
	const messages: ChatCompletionMessageParam[] = [];

	try {
		if (!prompt) throw new Error("Can't load prompt");
		messages.push({
			role: 'system',
			content: prompt,
		});

		const completion: ParsedChatCompletion<Classifier> =
			await getParsedCompletion(
				messages,
				'gpt-4o-mini-2024-07-18',
				ClassifierSchema,
				'classifier',
			);

		if (!completion?.choices[0]?.message?.parsed)
			throw new Error(
				'The model was not able to generate a valid response due to safety reason.',
			);

		const parsedClassifier: Classifier = completion.choices[0].message.parsed;

		console.log(parsedClassifier);
		console.log(completion);
		return parsedClassifier.valid;
	} catch (err) {
		console.error(err);
		return false;
	}
};
