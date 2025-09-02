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
