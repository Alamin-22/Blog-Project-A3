import { Router } from 'express';
import { usersRout } from '../modules/User/user.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: usersRout,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
