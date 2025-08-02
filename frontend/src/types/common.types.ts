type TopicDifficulty = 'beginner' | 'intermediate' | 'advance';

export interface Chapter {
	title: string;
	description: string;
	body: string;
	exercises: string[];
	resources: { title: string; link: string }[];
}

export interface Course {
	title: string;
	chapters: Chapter[];
}

export interface InputCourse {
	topic: string;
	difficulty: TopicDifficulty;
}
