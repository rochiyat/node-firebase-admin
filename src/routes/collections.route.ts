import { Router } from 'express';
import collectionController from '../controllers/collection.controller';

const router = Router();

router.get('/', collectionController.getCollection);

export default router;
