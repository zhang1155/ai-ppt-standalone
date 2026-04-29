import HomePage from './pages/HomePage';
import EditorPage from './pages/EditorPage';
import CanvasPage from './pages/CanvasPage';
import type { ReactNode } from 'react';

export interface RouteConfig {
  name: string;
  path: string;
  element: ReactNode;
  visible?: boolean;
  /** Accessible without login. Routes without this flag require authentication. Has no effect when RouteGuard is not in use. */
  public?: boolean;
}

export const routes: RouteConfig[] = [
  {
    name: '首页',
    path: '/',
    element: <HomePage />,
    public: true,
  },
  {
    name: '画布总览',
    path: '/canvas',
    element: <CanvasPage />,
    public: true,
  },
  {
    name: '单页编辑',
    path: '/editor/:id',
    element: <EditorPage />,
    public: true,
  }
];
