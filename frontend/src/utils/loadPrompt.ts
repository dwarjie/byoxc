export async function loadPrompt(userData: {
	topic: string;
	difficulty: string;
}): Promise<string> {
	const response = await fetch('/prompt.txt');
	const template = await response.text();

	let prompt = template;
	Object.entries(userData).forEach(([key, value]) => {
		const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
		prompt = prompt.replace(regex, value);
	});

	return prompt;
}
