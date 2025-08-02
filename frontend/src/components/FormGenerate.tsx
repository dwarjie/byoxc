import { useState, type ChangeEvent } from 'react';
import { generateCourse } from '../services/openai';
import type { Course, InputCourse } from '../types/common.types';

const sampleCourse: Course = {
	title: 'Creating an HTTP Server Using Python',
	chapters: [
		{
			title: 'Setting Up Your Python Environment',
			description:
				'Install Python and set up a simple development environment to begin working with HTTP servers.',
			body: '### Installing Python\n\nEnsure that Python is installed on your system. You can check by running the following command in your terminal:\n\n```bash\npython --version\n```\n\nIf Python is not installed, download the latest version from [python.org](https://www.python.org/downloads/) and follow the installation instructions for your operating system.\n\n### Setting Up a Project Directory\n\nCreate a new folder to keep your server files organized. Use the terminal to navigate to where you want your project to live:\n\n```bash\nmkdir my_http_server\ncd my_http_server\n```\n\n### Creating Your First Python File\n\nInside the folder, create a new Python file that will contain your server logic:\n\n```bash\ntouch server.py\n```\n\nOpen this file in your preferred code editor (e.g., VS Code, Sublime Text, etc.).\n\n### Writing a Simple Print Statement\n\nIn `server.py`, add the following code:\n\n```python\nprint("Server setup complete")\n```\n\nSave the file and run it:\n\n```bash\npython server.py\n```\n\nYou should see the message printed in the terminal. This confirms that your environment is set up and working properly.',
			exercises: [
				'Install Python on your system.',
				'Create a new project folder named `my_http_server`.',
				'Create a Python file called `server.py`.',
				'Print a custom message from the `server.py` file.',
				'Run your script using the terminal.',
			],
			resources: [
				{
					title: 'Python Official Downloads',
					link: 'https://www.python.org/downloads/',
				},
				{
					title: 'Installing Python on Windows, macOS, and Linux',
					link: 'https://realpython.com/installing-python/',
				},
			],
		},
		{
			title: 'Creating a Basic HTTP Server',
			description:
				'Learn how to create a minimal HTTP server using Python’s built-in `http.server` module.',
			body: '### Importing the HTTP Server Module\n\nPython comes with a built-in module called `http.server` that lets you quickly create a web server.\n\nStart by importing it in your `server.py` file:\n\n```python\nfrom http.server import SimpleHTTPRequestHandler, HTTPServer\n```\n\n### Setting the Server Address\n\nSpecify the address and port where your server should run:\n\n```python\nhost = \'localhost\'\nport = 8000\n```\n\n### Creating the Server Instance\n\nNow create the server instance and pass it the handler:\n\n```python\nserver = HTTPServer((host, port), SimpleHTTPRequestHandler)\n```\n\nThis sets up a basic server that knows how to respond to simple HTTP requests.\n\n### Starting the Server\n\nTo start the server and keep it running, add the following code:\n\n```python\nprint(f"Starting server at http://{host}:{port}")\nserver.serve_forever()\n```\n\nThis will start the server and it will keep running until you manually stop it using `Ctrl+C` in the terminal.\n\n### Running the Server\n\nSave the file and run the script using:\n\n```bash\npython server.py\n```\n\nNow, open a browser and go to `http://localhost:8000`. You should see a default directory listing. This confirms that the server is up and serving files from the current directory.',
			exercises: [
				'Create a basic server using `http.server`.',
				'Serve files from a different directory and observe the changes.',
				'Change the port to 8080 and verify it still works.',
				'Print logs for each incoming request to the terminal.',
				'Run the server and test it with a browser.',
			],
			resources: [
				{
					title: 'Python http.server Docs',
					link: 'https://docs.python.org/3/library/http.server.html',
				},
				{
					title: 'How to Create a Simple HTTP Server in Python',
					link: 'https://realpython.com/python-http-server/',
				},
			],
		},
	],
};

function FormGenerate() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const [course, setCourse] = useState<Course | null>(null);
	const [input, setInput] = useState<InputCourse>({
		topic: '',
		difficulty: 'beginner',
	});

	const handleForm = (
		event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
	) => {
		const { name, value } = event.target;
		setInput({ ...input, [name]: value });
	};

	const generate = async (): Promise<void> => {
		if (input.topic.trim() === '' || input.difficulty.trim() === '')
			return alert('Please fill out all information!');

		setLoading(true);

		const course = await generateCourse(input.topic, input.difficulty);

		if (course) {
			setCourse(course);
			setLoading(false);
			return;
		}

		setError(true);
		setLoading(false);
	};

	if (loading) {
		return (
			<div className="flex h-full w-full flex-col items-center justify-center gap-2.5">
				<span className="loading loading-ball loading-xl"></span>
				<h1 className="text-2xl">Building your course . . .</h1>
			</div>
		);
	}

	if (error) {
		return (
			<div className="flex h-full w-full flex-col items-center justify-center gap-2.5">
				<span className="loading loading-ball loading-xl"></span>
				<h1 className="text-2xl">Error . . .</h1>
			</div>
		);
	}

	return (
		<div className="flex h-full w-full flex-col items-center justify-center gap-2.5">
			<h1 className="text-3xl">
				Build Your Own X Course! (with just one click)
			</h1>
			<form className="flex w-full flex-col justify-center gap-4">
				<fieldset className="fieldset">
					<legend className="fieldset-legend">
						What application/program you want to build?
					</legend>
					<input
						type="text"
						name="topic"
						value={input.topic}
						className="input w-full"
						placeholder="e.g., HTTP Server, Git"
						onChange={(event) => handleForm(event)}
					/>
				</fieldset>
				<fieldset className="fieldset">
					<legend className="fieldset-legend">Difficulty Level</legend>
					<select
						name="difficulty"
						value={input.difficulty}
						className="select"
						onChange={(event) => handleForm(event)}
					>
						<option value="beginner">Beginner</option>
						<option value="intermediate">Intermediate</option>
						<option value="advance">Advance</option>
					</select>
				</fieldset>
				<button className="btn btn-soft btn-primary" onClick={generate}>
					Primary
				</button>
			</form>
			{course ? (
				<div className="mt-4 flex w-full flex-col">
					<h1 className="mb-2.5 text-center text-3xl">{course.title}</h1>
					{course.chapters &&
						course.chapters.map((chapter) => (
							<>
								<div className="card bg-base-300 rounded-box mb-2.5 p-10">
									<h2 className="pb-1.5 text-2xl">{chapter.title}</h2>
									<p className="pb-4 text-lg">{chapter.description}</p>
									<div className="divider"></div>
									<pre className="wrap-break-word whitespace-pre-wrap">
										{chapter.body}
									</pre>
									<div className="divider"></div>
									<h2 className="pb-1.5 text-2xl">Exercises</h2>
									<ul className="list-disc">
										{chapter.exercises &&
											chapter.exercises.map((exercise) => <li>{exercise}</li>)}
									</ul>
									<h2 className="pb-1.5 text-xl">Resources</h2>
									<ul className="list-disc">
										{chapter.resources &&
											chapter.resources.map((resource) => (
												<li className="link">
													<a href={resource.link}>{resource.title}</a>
												</li>
											))}
									</ul>
								</div>
								<div className="divider"></div>
							</>
						))}
				</div>
			) : (
				''
			)}
		</div>
	);
}

export default FormGenerate;
