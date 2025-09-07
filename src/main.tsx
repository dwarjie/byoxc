import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router';
import {
	CourseList,
	CourseSummary,
	FormGenerate,
	LandingPage,
} from './pages/index';
import { CourseLayout } from './layout';
import { loader } from './loader';

const router = createBrowserRouter([
	{
		path: '/byoxc/',
		Component: CourseLayout,
		children: [
			{ index: true, Component: LandingPage },
			{ path: 'courses', Component: CourseList },
			{ path: 'courses/:courseId', Component: CourseSummary, loader: loader },
			{ path: 'generate', Component: FormGenerate },
		],
	},
]);

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>,
);
