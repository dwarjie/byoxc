export function CourseGeneratingState() {
	return (
		<div className="flex items-center justify-center p-8">
			<div className="mockup-code bg-base-200 w-full max-w-3xl p-8 shadow-xl">
				<pre
					data-prefix="$"
					className="text-success flex items-center text-base"
				>
					<code>Generating your course</code>
					<span className="text-primary ml-2 animate-pulse font-bold">_</span>
				</pre>
			</div>
		</div>
	);
}
