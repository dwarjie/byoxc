import { useState, type ChangeEvent } from 'react';
import { getCourse } from '@/services/course.service';
// import UserQuestion from './UserQuestion';
import CourseViewer from './CourseViewer';
import { LoadingState, ErrorState } from './common';
import { inputClassifier } from '@/services/classifier.service';

import type { Course, InputCourse } from '@/types/common.types';

function FormGenerate() {
	// TODO
	// const [questions, setQuestions] = useState<PreferenceQuestion | null>(null);
	const [course, setCourse] = useState<Course | null>(null);
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

	// TODO
	// const handleQuestion = (answer: string) => {
	// 	console.log(answer);
	// };

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

			setCourse(course);
		} catch (err: any) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	if (loading) {
		return <LoadingState />;
	}

	if (error) return <ErrorState message={error} />;

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
			{course ? <CourseViewer course={course} /> : ''}
		</div>
	);
}

export default FormGenerate;
