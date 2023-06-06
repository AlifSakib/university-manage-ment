import express from 'express';
import { academic_semester_route } from '../modules/academic-semester/academic-semester.router';
import { UserRoutes } from '../modules/users/user.router';

const router = express.Router();

const module_routes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/academic-semesters',
    route: academic_semester_route,
  },
];

module_routes.forEach(route => router.use(route.path, route.route));

// router.use('/users', UserRoutes);
// router.use('/academic-semesters', academic_semester_route);

export default router;
