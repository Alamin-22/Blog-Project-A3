import { Router } from 'express';
import { AuthRoutes } from '../modules/Auth/auth.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  // {
  //   path: '/auth',
  //   route: authRoutes,
  // },
  // {
  //   path: '/blogRoutes',
  //   route: authRoutes,
  // },
  // {
  //   path: '/admin',
  //   route: adminRoutes,
  // },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
