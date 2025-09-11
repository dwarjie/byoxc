import { useState, type ChangeEvent } from 'react';
import { getCourse } from '@/services/course.service';
import { CourseGeneratingState, ErrorState } from '@/components/index';
import { inputClassifier } from '@/services/classifier.service';
import { useLocalStorage } from '@/hooks/useLocalStorage';

import type { Course, InputCourse } from '@/types/common.types';
import { Link, useNavigate } from 'react-router';

export function FormGenerate() {
	const navigate = useNavigate();
	const { saveItem, getItem } = useLocalStorage(
		import.meta.env.VITE_COURSE_KEY,
	);
	const [input, setInput] = useState<InputCourse>({
		topic: '',
		difficulty: 'beginner',
	});

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

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
		try {
			const validInput = await inputClassifier(input.topic);

			if (!validInput) {
				throw new Error(
					'Topic is not related with Development or Project Based.',
				);
			}

			const course = await getCourse(input.topic, input.difficulty);

			if (!course) {
				throw new Error('Something went wrong. Please try again later...');
			}

			let existingCourse: Course[] | false = getItem();
			if (!existingCourse) {
				saveItem([course]);
			} else {
				existingCourse.push(course);
				saveItem(existingCourse);
			}
			navigate(`/byoxc/courses/${course.id}`);
		} catch (err: any) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	const resetForm = () => {
		setError(null);
		setInput({
			topic: '',
			difficulty: 'beginner',
		});
	};

	if (loading) {
		return <CourseGeneratingState />;
	}

	if (error) return <ErrorState message={error} reset={resetForm} />;

	return (
		<div className="flex min-h-screen items-center justify-center">
			<div className="card bg-base-100 w-full max-w-3xl shadow-2xl">
				<div className="card-body space-y-8">
					<div className="flex justify-start">
						<Link to={'/byoxc/courses'} relative="path">
							<button className="btn btn-soft">⬅ Back to Courses</button>
						</Link>
					</div>

					<div className="space-y-2 text-center">
						<h2 className="text-4xl font-bold">Build Your Own X Course 🚀</h2>
						<p className="text-base text-gray-500">
							Generate a project-based learning course in just one click.
						</p>
					</div>

					<div className="form-control">
						<label className="label">
							<span className="label-text font-medium">
								What application/program do you want to build?
							</span>
						</label>
						<input
							type="text"
							name="topic"
							value={input.topic}
							className="input input-bordered w-full"
							placeholder="e.g., HTTP Server, Git, Chatbot"
							onChange={(event) => handleForm(event)}
						/>
					</div>

					<div className="form-control">
						<label className="label">
							<span className="label-text font-medium">Difficulty Level</span>
						</label>
						<select
							className="select select-bordered w-full"
							name="difficulty"
							value={input.difficulty}
							onChange={(event) => handleForm(event)}
						>
							<option>Beginner</option>
							<option>Intermediate</option>
							<option>Advanced</option>
						</select>
					</div>

					<div className="alert alert-info shadow-md">
						<div>
							<h3 className="font-bold">💡 Tips for Best Results</h3>
							<ul className="mt-2 list-inside list-disc text-sm">
								<li>
									Make your prompt{' '}
									<span className="font-medium">project-based</span> (with a
									real output).
								</li>
								<li>
									Specify{' '}
									<span className="font-medium">frameworks and language</span>{' '}
									if possible.
								</li>
								<li>
									Be as <span className="font-medium">specific</span> as
									possible for clearer results.
								</li>
							</ul>
						</div>
					</div>
					<div className="card-actions justify-center">
						<button
							className="btn btn-primary w-full text-lg"
							onClick={generate}
						>
							✨ Generate Course
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
