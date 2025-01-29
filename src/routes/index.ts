import { Router } from 'express';
import usersRoute from './user.route';
import collectionsRoute from './collections.route';

const router = Router();

router.use('/users', usersRoute);
router.use('/collections', collectionsRoute);

export default router;
