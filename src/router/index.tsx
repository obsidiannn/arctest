import { NonIndexRouteObject } from 'react-router-dom';

import Home from '../pages/home';
import Layout from '../pages/layout';
import LoginPage from '../pages/login';
import KeywordLogin from '../pages/login/login-keyword';
import ProfileScreen from '../pages/profile/profile';
import RequireAuth from './require-auth';

/**
 * 授权后路由，使用 Require Auth 包裹
 */
const childrenRoutes = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/profile',
    element: <ProfileScreen />,
  },
];
const routerConfig: NonIndexRouteObject[] = [
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/keywordLogin',
    element: <KeywordLogin />,
  },
  {
    path: '/',
    element: (
      <RequireAuth>
        <Layout />
      </RequireAuth>
    ),
    children: childrenRoutes,
  },
];
export default routerConfig;
