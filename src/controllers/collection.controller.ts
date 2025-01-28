import { Request, Response } from 'express';
import { db } from '../configs/firebase';
import { returnSuccess } from '../utils/helpers.util';

const collectionController = {
  getCollection: async (req: Request, res: Response) => {
    const collection = await db.listCollections();
    return returnSuccess(
      req,
      res,
      200,
      'Collection fetched successfully',
      collection
    );
  },
};

export default collectionController;
