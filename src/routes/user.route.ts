import { Router } from 'express';
import usersController from '../controllers/user.controller';
import * as usersMiddleware from '../middlewares/user.middleware';

const router = Router();

router.get('/', usersController.getUsers);
router.get('/count', usersController.getUserCount);
router.get('/:id', usersMiddleware.getUser, usersController.getUser);
router.get(
  '/public/:publicUid',
  usersMiddleware.getUserByPublicUid,
  usersController.getDataByPublicUid
);
router.post('/', usersController.createUser);
router.put('/:id', usersMiddleware.getUser, usersController.updateUser);
router.put(
  '/public/:publicUid',
  usersMiddleware.getUserByPublicUid,
  usersController.updateUserByPublicUid
);

// bulk
router.get(
  '/bulk/:ids',
  usersMiddleware.getUsers,
  usersController.getUsersBulk
);
router.get(
  '/bulk/public/:publicUids',
  usersMiddleware.getUsersBulkByPublicUids,
  usersController.getDataByPublicUids
);
router.put(
  '/bulk/:ids',
  usersMiddleware.updateUsers,
  usersController.updateUsers
);

export default router;
