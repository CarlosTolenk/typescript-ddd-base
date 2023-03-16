import { Request, Response, Router } from 'express';

import StatusController from '../controllers/health/StatusLivenessController';
import container from '../dependency-injection';

export const register = (router: Router): void => {
	const controllerLiveness = container.get<StatusController>(
		'App.controllers.health.StatusLivenessController'
	);
	const controllerReadiness = container.get<StatusController>(
		'App.controllers.health.StatusReadinessController'
	);
	router.get('/liveness', (req: Request, res: Response) => {
		controllerLiveness.run(req, res);
	});
	router.get('/readiness', (req: Request, res: Response) => {
		controllerReadiness.run(req, res);
	});
};
