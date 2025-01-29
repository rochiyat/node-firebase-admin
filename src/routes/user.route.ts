import { Router } from 'express';
import usersController from '../controllers/user.controller';
import * as usersMiddleware from '../middlewares/user.middleware';

const router = Router();

router.get('/', usersController.getUsers);
router.get('/count', usersController.getUserCount);
router.get('/:id', usersMiddleware.getUser, usersController.getUser);
router.post('/', usersController.createUser);
router.put('/:id', usersMiddleware.getUser, usersController.updateUser);

// bulk
router.get(
  '/bulk/:ids',
  usersMiddleware.getUsers,
  usersController.getUsersBulk
);
router.put(
  '/bulk/:ids',
  usersMiddleware.updateUsers,
  usersController.updateUsers
);

export default router;
