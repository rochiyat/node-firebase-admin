import { Request, Response } from 'express';
import { db } from '../configs/firebase';
import { returnNonSuccess } from '../utils/helpers.util';
import { returnSuccess } from '../utils/helpers.util';

const usersController = {
  getUsers: async (req: Request, res: Response) => {
    try {
      const users = await db.collection('user_cvs').get();
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
