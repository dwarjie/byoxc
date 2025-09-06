import OpenAI from 'openai';
import * as z from 'zod';
import type { ChatCompletionMessageParam, ChatModel } from 'openai/resources';
import type { ParsedChatCompletion } from 'openai/resources/chat/completions.mjs';
import type { ZodObject } from 'zod';

type CompletionData = {
	model: ChatModel;
	messages: ChatCompletionMessageParam[];
	response_format?: any;
};

const openai = new OpenAI({
	apiKey: import.meta.env.VITE_OPENAI_KEY,
	dangerouslyAllowBrowser: true,
});
const DEFAULT_MODEL: ChatModel = 'gpt-4o-mini-2024-07-18';

/**
 * A service function to call the openai.chat.completion.parse
 *
 * This function is different from getCompletion() which returns a normal completion data.
 * Using zod, the model will return the schema based on the response_format you have provided in a parsed manner.
 * @param {ChatCompletionMessageParam[]} messages An array of ChatCompletionMessageParam to feed the model
 * @param {ChatModel} model The openai model to be used. Defaults to "gpt-4o-mini-2024-07-18"
 * @param {ZodObject} jsonResponseFormat The zod schema to be used as a structured output
 * @param {string} jsonResponseName The name of the parsed data
 * @returns {Promise<ParsedChatCompletion<any>>} A parsed valid json data (based on your jsonResponseFormat)
 */
export const getParsedCompletion = async (
	messages: ChatCompletionMessageParam[],
	model: ChatModel = DEFAULT_MODEL,
	jsonResponseFormat: ZodObject,
	jsonResponseName: string,
): Promise<ParsedChatCompletion<any>> => {
	try {
		if (!messages.length) throw new Error('No Message Parameter Provided.');

		const completionData: CompletionData = {
			model,
			messages,
			response_format: {
				type: 'json_schema',
				json_schema: {
					name: jsonResponseName,
					strict: true,
					schema: z.toJSONSchema(jsonResponseFormat, { target: 'draft-7' }),
				},
			},
		};

		const completion = await openai.chat.completions.parse(completionData);

		if (completion.choices[0].finish_reason === 'length')
			throw new Error(
				'You exceeded the maximum token limit. Please try again later.',
			);

		const response = completion.choices[0].message;

		if (!response)
			throw new Error(
				'The model was not able to generate an output. Please try a different input.',
			);

		if (response.refusal)
			throw new Error(
				"The model stopped due to safety reason. Please make sure you're input does not violate any malicous content.",
			);

		return completion;
	} catch (error) {
		throw new Error(`Error: ${error}`);
	}
};
