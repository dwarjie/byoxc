//  Only include 4 - 5 choices and rank them based on popularity and most likely to be used by the user. Always include the "I don\' know, pick for me." choice in the array, incase the user doesn\'t know what to pick.

import type { ChatCompletionTool } from 'openai/resources';

export const getUserPreferenceSchema: ChatCompletionTool = {
	type: 'function',
	function: {
		name: 'getUserPreference',
		description:
			'Get the user preference for the tools needed by the course to be created (e.g., package manager, terminal, buil tools, etc.)',
		parameters: {
			type: 'object',
			properties: {
				question: {
					type: 'string',
					description:
						'The question to be asked to the user to get their preference on something (e.g., What built tool do you prefer?, What package manager do you use?, What frontend framework do you prefer for building a calculator website?).',
				},
				choices: {
					type: 'array',
					items: { type: 'string' },
					description:
						'The array of strings to choose from based on the question provided. This are the choices where the user will pick their preferences. (e.g., npm, pnpm, Vite, ReactJs, VueJs, etc.).',
				},
				required: ['question', 'choices'],
				additionalProperties: false,
			},
			strict: true,
		},
	},
};
