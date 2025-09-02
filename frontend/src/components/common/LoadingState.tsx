export function LoadingState() {
	return (
		<div className="flex h-full w-full flex-col items-center justify-center gap-4">
			{/* TODO */}
			{/* {questions ? (
        <>
          <h1 className="text-2xl">
            Questions to fit your course to your need.
          </h1>
          <UserQuestion data={questions} submitAnswer={handleQuestion} />
        </>
      ) : (
        ''
      )} */}
			<span className="loading loading-ball loading-xl"></span>
			<h1 className="text-2xl">Building your course . . .</h1>
		</div>
	);
}
