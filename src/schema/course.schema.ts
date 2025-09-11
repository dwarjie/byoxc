import * as z from 'zod';

const ResourcesSchema = z.object({
	title: z.string(),
	link: z.string(),
});

const ChapterSchema = z.object({
	id: z.uuid({ version: 'v1' }),
	title: z.string(),
	description: z.string(),
	body: z.string(),
	exercises: z.array(z.string()).max(5),
	resources: z.array(ResourcesSchema),
});

export const CourseSchema = z.object({
	id: z.uuid({ version: 'v1' }),
	title: z.string(),
	description: z.string(),
	chapters: z.array(ChapterSchema),
});
