import { Router } from 'express';

const router = Router();

type TModuleRoute = { path: string; route: Router };

const moduleRoutes: TModuleRoute[] = [
    // { path: '/auth', route: AuthRoutes },
    // { path: '/users', route: UserRoutes },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
