import { Request, Response } from 'express';
import collectionController from '../../../src/controllers/collection.controller';
import {
  returnSuccess,
  returnNonSuccess,
} from '../../../src/utils/helpers.util';
import { db } from '../../../src/configs/firebase';

jest.mock('../../../src/utils/helpers.util');
jest.mock('../../../src/configs/firebase', () => ({
  db: {
    collection: jest.fn(() => ({
      add: jest.fn(),
      doc: jest.fn(() => ({
        update: jest.fn(),
        get: jest.fn(),
      })),
      where: jest.fn(() => ({
        get: jest.fn(),
      })),
    })),
    listCollections: jest.fn(),
  },
}));

describe('getCollection', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = {};
    res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  });

  it('should fetch collections successfully', async () => {
    const mockCollections = [{ id: 'col1' }, { id: 'col2' }];
    (db.listCollections as jest.Mock).mockResolvedValue(mockCollections);

    await collectionController.getCollection(req as Request, res as Response);

    expect(returnSuccess).toHaveBeenCalledWith(
      req,
      res,
      200,
      'Collection fetched successfully',
      mockCollections
    );
  });

  it('should handle errors properly', async () => {
    (db.listCollections as jest.Mock).mockRejectedValue(
      new Error('Database error')
    );

    await getCollection(req as Request, res as Response);

    expect(returnNonSuccess).toHaveBeenCalledWith(
      req,
      res,
      500,
      'Database error'
    );
  });
});
