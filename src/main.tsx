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
import { loader } from './loader';
import { BaseLayout } from './layout';
import { CourseLayout } from './layout/CourseLayout';
import { Chapter } from './pages/Chapter';

const router = createBrowserRouter([
	{
		path: '/byoxc/',
		Component: BaseLayout,
		children: [
			{ index: true, Component: LandingPage },
			{ path: 'courses', Component: CourseList },
			{
				path: 'courses/:courseId',
				Component: CourseLayout,
				children: [
					{ index: true, Component: CourseSummary, loader: loader },
					{
						path: '/byoxc/courses/:courseId/:chapterId',
						Component: Chapter,
						loader: loader,
					},
				],
			},
			{ path: 'generate', Component: FormGenerate },
		],
	},
]);

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>,
);
