/**
 * Load the prompt file to be used for the openai.chat.completion service
 *
 * File should be a valid .txt file that contains the whole system prompt
 * @param {object} userData Contains the user data topic and difficulty (optional)
 * @param {string} path The file path where the .txt located
 * @returns {Promise<string | false>} whole string data of the file otherwise false
 */
export const loadPrompt = async (
	userData: {
		topic: string;
		difficulty?: string;
	},
	path: string,
): Promise<string | false> => {
	let prompt: string = '';
	try {
		const response = await fetch(path);

		if (response.ok) {
			const template = await response.text();
			prompt = template;
		} else {
			if (response.status === 400)
				throw new Error('Code: 400 - Prompt File not found!');
			if (response.status === 500)
				throw new Error('Code: 500 - Internal Server Error!');
			throw new Error(`Code: ${response.status} - Something wrong happened!`);
		}
	} catch (error) {
		console.error(error);
		return false;
	}

	Object.entries(userData).forEach(([key, value]) => {
		const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
		prompt = prompt.replace(regex, value);
	});

	return prompt;
};
