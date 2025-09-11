import { MarkdownHooks } from 'react-markdown';

interface ChapterBodyProps {
	body: string;
}

export function ChapterBody({ body }: ChapterBodyProps) {
	return (
		<div className="prose dark:prose-invert md:prose-lg lg:prose-xl mb-10 w-full">
			<MarkdownHooks>{body}</MarkdownHooks>
		</div>
	);
}
