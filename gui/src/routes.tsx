// libs
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from 'react-router-dom';

// layouts
import Ride from './layouts/Ride';

// views
import Rides from './views/Ride/Rides/Rides';
import Estimate from './views/Ride/Estimate/Estimate';
import History from './views/Ride/History/History';

const allRoutes = {
  ride: {
    title: 'ride',
    path: 'ride/*',
    routes: [
      {
        name: 'Caronada',
        title: 'ride',
        path: '',
        element: <Rides />,
        layout: '/ride',
        doNothing: true,
      },
      {
        name: 'Orçamento',
        title: 'estimate',
        path: 'estimate',
        element: <Estimate />,
        layout: '/ride',
      },
      {
        title: 'history',
        name: 'Histórico de Corridas',
        path: 'history',
        element: <History />,
        layout: '/ride',
      },
    ],
    element: <Ride />,
  },
};

const routes = createBrowserRouter(
  createRoutesFromElements([
    ...Object.entries(allRoutes).map(route => {
      return (
        <Route key={route[0]} element={route[1].element} path={route[1].path}>
          {route[1].routes.map(subRoute => {
            return (
              <Route key={subRoute.path} element={subRoute.element} path={subRoute.path} />
            );
          })}
        </Route>
      );
    }),
    <Route path="*" element={<Navigate to="/ride" replace />} />,
  ]),
);

export default routes;
export {
  allRoutes,
};
