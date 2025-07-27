import { generateCourse } from './services/openai';

function App() {
	const generate = async (): Promise<void> => {
		const course = await generateCourse(
			'Write a way for me to create an HTTP Server using Pythong.',
		);
		console.log(course);
	};

	return (
		<>
			<h1>Hello</h1>
			<button onClick={generate}>Generate</button>
		</>
	);
}

export default App;
