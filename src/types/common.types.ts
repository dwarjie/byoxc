export type TopicDifficulty = 'beginner' | 'intermediate' | 'advance';
type ClassifierConfidence = 'HIGH' | 'MEDIUM' | 'LOW';

export interface Chapter {
	title: string;
	description: string;
	body: string;
	exercises: string[];
	resources: { title: string; link: string }[];
}

export interface Course {
	id: string;
	title: string;
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
