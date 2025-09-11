import type { Course } from '@/types/common.types';

interface CourseViewerProps {
	course: Course;
}

function CourseViewer({ course }: CourseViewerProps) {
	return (
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
	);
}

export default CourseViewer;
