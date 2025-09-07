import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { CourseList, FormGenerate, LandingPage } from './pages/index';
import { CourseLayout } from './layout';

const router = createBrowserRouter([
	{
		path: '/byoxc/',
		Component: CourseLayout,
		children: [
			{ index: true, Component: LandingPage },
			{ path: 'courses', Component: CourseList },
			{ path: 'generate', Component: FormGenerate },
		],
	},
]);

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>,
);
