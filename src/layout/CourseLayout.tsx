import { Outlet } from 'react-router';

export function CourseLayout() {
	return (
		<div className="font-main mt-14 mr-auto ml-auto h-full w-[85%]">
			<Outlet />
		</div>
	);
}
