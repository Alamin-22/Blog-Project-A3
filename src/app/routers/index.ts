import { Router } from 'express';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { userRoutes } from '../modules/User/user.route';
import { BlogRoutes } from '../modules/Blog/blog.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/users',
    route: userRoutes,
  },
  {
    path: '/blogs',
    route: BlogRoutes,
  },
  // {
  //   path: '/admin',
  //   route: adminRoutes,
  // },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
