import OpenAI from 'openai';
import { loadPrompt } from '@/utils/loadPrompt';
import type { Course } from '@/types/common.types';
import type {
	ChatCompletion,
	ChatCompletionMessageParam,
	ChatModel,
	ResponseFormatJSONObject,
} from 'openai/resources';

type CompletionData = {
	model: ChatModel;
	messages: ChatCompletionMessageParam[];
	response_format?: ResponseFormatJSONObject;
};

const openai = new OpenAI({
	apiKey: import.meta.env.VITE_OPENAI_KEY,
	dangerouslyAllowBrowser: true,
});

const MODEL: ChatModel = 'gpt-5-2025-08-07';
const RESPONSE_FORMAT: ResponseFormatJSONObject = { type: 'json_object' };

const getCourse = async (
	topic: string,
	difficulty: string,
): Promise<Course | false> => {
	const prompt = await loadPrompt({ topic, difficulty }, './prompt.txt');
	const messages: ChatCompletionMessageParam[] = [];

	try {
		if (!prompt) throw new Error("Can't load prompt");
		messages.push({
			role: 'system',
			content: prompt,
		});

		const completion = await getCompletion(messages);
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

const getCompletion = async (
	messages: ChatCompletionMessageParam[],
	model: ChatModel = MODEL,
	jsonResponseFormat?: boolean,
): Promise<ChatCompletion> => {
	try {
		if (!messages.length)
			throw new Error("Can't Access OpenAI. Please try again later.");
		const completionData: CompletionData = {
			model,
			messages,
		};
		if (jsonResponseFormat) completionData['response_format'] = RESPONSE_FORMAT;

		const completion = await openai.chat.completions.create(completionData);
		return completion;
	} catch (error) {
		throw new Error(`Error: ${error}`);
	}
};

export { getCourse, getCompletion };
