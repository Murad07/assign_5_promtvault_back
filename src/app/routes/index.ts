import { Router } from 'express';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { PromptRoutes } from '../modules/Prompt/prompt.route';
import { OrderRoutes } from '../modules/Order/order.route';
import { ReviewRoutes } from '../modules/Review/review.route';

const router = Router();

type TModuleRoute = { path: string; route: Router };

const moduleRoutes: TModuleRoute[] = [
    { path: '/auth', route: AuthRoutes },
    { path: '/prompts', route: PromptRoutes },
    { path: '/orders', route: OrderRoutes },
    { path: '/reviews', route: ReviewRoutes },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
