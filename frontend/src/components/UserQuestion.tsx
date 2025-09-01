import { useState } from 'react';
import type { PreferenceQuestion } from '../types/common.types';

interface UserQuestionProps {
	data: PreferenceQuestion;
	submitAnswer: (choice: string) => any;
}

function UserQuestion({ data, submitAnswer }: UserQuestionProps) {
	const [answer, setAnswer] = useState<string>('');

	const handleSelect = (answer: string): void => {
		console.log(answer);
		setAnswer(answer);
	};

	const handlerSubmit = () => {
		submitAnswer(answer);
	};

	return (
		<div className="bg-base-100 mx-auto w-full max-w-md rounded-xl p-4 shadow-md">
			<h2 className="mb-4 text-lg font-semibold">{data.question}</h2>
			<div className="flex flex-col space-y-2">
				{data.choices.map((choice, index) => (
					<label
						key={index}
						className="hover:bg-base-200 flex cursor-pointer items-center gap-3 rounded-lg p-2"
					>
						<input
							type="radio"
							name="answer"
							className="radio radio-primary"
							value={choice}
							onChange={() => handleSelect(choice)}
						/>
						<span className="text-base">{choice}</span>
					</label>
				))}
			</div>
			<button
				className="btn btn-soft btn-primary mt-1.5 w-full"
				onClick={handlerSubmit}
			>
				Submit
			</button>
		</div>
	);
}

export default UserQuestion;
