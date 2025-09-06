import * as z from 'zod';

export const ClassifierSchema = z.object({
	valid: z.boolean(),
	confidence: z.enum(['HIGH', 'MEDIUM', 'LOW']),
	reason: z.string(),
});
