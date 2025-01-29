import { Request, Response } from 'express';
import { db } from '../configs/firebase';
import { returnNonSuccess, returnSuccess } from '../utils/helpers.util';

const usersController = {
  getUsers: async (req: Request, res: Response) => {
    try {
      const { limit = 10 } = req.query;
      const limitNumber = Math.min(Number(limit), 20);
      const users = await db.collection('user_cvs').limit(limitNumber).get();
      const userData = users.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      return returnSuccess(
        req,
        res,
        200,
        'Users fetched successfully',
        userData
      );
    } catch (error: any) {
      return returnNonSuccess(req, res, 500, error.message);
    }
  },

  getUserCount: async (req: Request, res: Response) => {
    try {
      const users = await db.collection('user_cvs').count().get();
      return returnSuccess(
        req,
        res,
        200,
        'User count fetched successfully',
        users
      );
    } catch (error: any) {
      return returnNonSuccess(req, res, 500, error.message);
    }
  },

  getDataByPublicUid: async (req: Request, res: Response) => {
    try {
      const { publicUid } = req.params;
      const user = await db
        .collection('user_cvs')
        .where('public_uid', '==', publicUid)
        .get();

      if (user.empty) {
        return returnNonSuccess(req, res, 404, 'User not found');
      }

      const doc = user.docs[0];
      return returnSuccess(req, res, 200, 'User fetched successfully', {
        id: doc.id,
        ...doc.data(),
      });
    } catch (error: any) {
      return returnNonSuccess(req, res, 500, error.message);
    }
  },

  getDataByPublicUids: async (req: Request, res: Response) => {
    try {
      const { publicUids } = req.params;
      const user = await db
        .collection('user_cvs')
        .where('public_uid', 'in', publicUids.split(';'))
        .get();

      if (user.empty) {
        return returnNonSuccess(req, res, 404, 'User not found');
      }

      const userData = user.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      return returnSuccess(
        req,
        res,
        200,
        'Users fetched successfully',
        userData
      );
    } catch (error: any) {
      console.log('error', error);
      return returnNonSuccess(req, res, 500, error.message);
    }
  },

  getUser: async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const user = await db.collection('user_cvs').doc(id).get();
      const userData = {
        id: user.id,
        ...user.data(),
      };
      return returnSuccess(
        req,
        res,
        200,
        'User fetched successfully',
        userData
      );
    } catch (error: any) {
      return returnNonSuccess(req, res, 500, error.message);
    }
  },

  createUser: async (req: Request, res: Response) => {
    try {
      const user = await db.collection('user_cvs').add(req.body);
      const userData = {
        id: user.id,
        ...req.body,
      };
      return returnSuccess(
        req,
        res,
        200,
        'User created successfully',
        userData
      );
    } catch (error: any) {
      return returnNonSuccess(req, res, 500, error.message);
    }
  },

  updateUser: async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const user = await db.collection('user_cvs').doc(id).update(req.body);
      const userData = {
        id,
        ...req.body,
      };
      return returnSuccess(
        req,
        res,
        200,
        'User updated successfully',
        userData
      );
    } catch (error: any) {
      return returnNonSuccess(req, res, 500, error.message);
    }
  },

  updateUserByPublicUid: async (req: Request, res: Response) => {
    try {
      const { publicUid } = req.params;
      const user = await db
        .collection('user_cvs')
        .where('public_uid', '==', publicUid)
        .get();

      if (user.empty) {
        return returnNonSuccess(req, res, 404, 'User not found');
      }
      const doc = user.docs[0];
      await doc.ref.update(req.body);
      const userData = {
        id: doc.id,
        ...req.body,
      };
      return returnSuccess(
        req,
        res,
        200,
        'User updated successfully',
        userData
      );
    } catch (error: any) {
      return returnNonSuccess(req, res, 500, error.message);
    }
  },

  updateUsersBulkByPublicUids: async (req: Request, res: Response) => {
    try {
      const { publicUids } = req.params;
      const publicUidsArray = publicUids.split(';');
      const updatedUsers = [];
      const user = await db
        .collection('user_cvs')
        .where('public_uid', 'in', publicUidsArray)
        .get();
      if (user.empty) {
        return returnNonSuccess(req, res, 404, 'User not found');
      }

      for (const doc of user.docs) {
        await doc.ref.update(req.body);
        updatedUsers.push({
          id: doc.id,
          ...req.body,
        });
      }
      return returnSuccess(
        req,
        res,
        200,
        'Users updated successfully',
        updatedUsers
      );
    } catch (error: any) {
      return returnNonSuccess(req, res, 500, error.message);
    }
  },

  updateUsers: async (req: Request, res: Response) => {
    try {
      const ids = req.params.ids;
      const idsArray = ids.split(';');
      const updatedUsers = [];
      for (const id of idsArray) {
        const user = await db.collection('user_cvs').doc(id).update(req.body);
        updatedUsers.push({
          id,
          ...req.body,
        });
      }
      return returnSuccess(
        req,
        res,
        200,
        'Users updated successfully',
        updatedUsers
      );
    } catch (error: any) {
      return returnNonSuccess(req, res, 500, error.message);
    }
  },

  getUsersBulk: async (req: Request, res: Response) => {
    try {
      const ids = req.params.ids;
      const idsArray = ids.split(';');
      const users = await db
        .collection('user_cvs')
        .where('id', 'in', idsArray)
        .get();
      const userData = users.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      return returnSuccess(
        req,
        res,
        200,
        'Users fetched successfully',
        userData
      );
    } catch (error: any) {
      return returnNonSuccess(req, res, 500, error.message);
    }
  },
};

export default usersController;
