import { Router } from 'express';
import { userCreationRoutes } from '../modules/UserCreation/userCreation.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: userCreationRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
