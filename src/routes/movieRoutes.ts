import { Router, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import * as movieController from '../controllers/movieController';
import * as auth from '../middleware/authenticate';

const router = Router();

router.get('/', (req: Request, res: Response) => {
    res.status(200).json({ message: 'Hello, world!' });
});

router.get(
    '/list',
    asyncHandler(async (req: Request, res: Response) => {
        await movieController.listMovies(req, res);
    })
);

router.get(
    '/search',
    asyncHandler(async (req: Request, res: Response) => {
        await movieController.searchMovies(req, res);
    })
);

router.post(
    '/',
    auth.authenticate,
    auth.isAdmin,
    asyncHandler(async (req: Request, res: Response) => {
        await movieController.addMovie(req, res);
    })
);

router.put(
    '/:id',
    auth.authenticate,
    auth.isAdmin,
    asyncHandler(async (req: Request, res: Response) => {
        await movieController.updateMovie(req, res);
    })
);

router.delete(
    '/:id',
    auth.authenticate,
    auth.isAdmin,
    asyncHandler(async (req: Request, res: Response) => {
        await movieController.deleteMovie(req, res);
    })
);

export default router;
