import App from './components/App/App';
import Login from './pages/login/login';
import UserMangement from './pages/user-management/User-management';

const routes = [
  {
    component: App,
    routes: [
      {
        path: '/',
        exact: true,
        component: Login
      },
      {
        path: '/user-mangement',
        component: UserMangement
      }
    ]
  }
];

export default routes;
