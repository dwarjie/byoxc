export type TopicDifficulty = 'beginner' | 'intermediate' | 'advance';
type ClassifierConfidence = 'HIGH' | 'MEDIUM' | 'LOW';

export interface Chapter {
	id: string;
	title: string;
	description: string;
	body: string;
	exercises: string[];
	resources: { title: string; link: string }[];
}

export interface Course {
	id: string;
	title: string;
	description: string;
	chapters: Chapter[];
}

export interface InputCourse {
	topic: string;
	difficulty: TopicDifficulty;
}

export interface PreferenceQuestion {
	question: string;
	choices: string[];
	tool_id: string;
}

export interface Classifier {
	valid: boolean;
	confidence: ClassifierConfidence;
	reasoning: string;
}
