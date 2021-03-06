import Home from './pages/Home';
import NestRoutes from './pages/NestRoutes';
import Sub1 from '@/pages/NestRoutes/AsyncSub1';
import Sub2 from '@/pages/NestRoutes/Sub2';
import About from '@/pages/About';
import { RouteComponentProps } from 'react-router-dom';

interface RouteConfig {
  path: string;
  exact?: boolean;
  component:
    | React.ComponentType<RouteComponentProps<any>>
    | React.ComponentType<any>;
  routes?: RouteConfig[];
}

type RoutesConfig = RouteConfig[];

const routes: RoutesConfig = [
  {
    path: '/',
    exact: true,
    component: Home,
  },
  {
    path: '/nestroutes',
    component: NestRoutes,
    routes: [
      {
        path: '/nestroutes/sub1',
        component: Sub1,
      },
      {
        path: '/nestroutes/sub2',
        component: Sub2,
      },
    ],
  },
  {
    path: '/about',
    component: About,
  },
];

export default routes;
