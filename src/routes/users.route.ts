import { Router } from 'express';
import usersController from '../controllers/users.controller';

const router = Router();

router.get('/', usersController.getUsers);
router.get('/:id', usersController.getUser);
router.post('/', usersController.createUser);
router.put('/:id', usersController.updateUser);

// advanced
router.put('/bulk/:ids', usersController.updateUsers);

export default router;
