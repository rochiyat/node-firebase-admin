import { Router } from 'express';
import usersRoute from './users.route';

const router = Router();

router.use('/users', usersRoute);

export default router;
