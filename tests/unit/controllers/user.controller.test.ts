import { Request, Response } from 'express';
import usersController from '../../../src/controllers/user.controller';
import {
  returnSuccess,
  returnNonSuccess,
} from '../../../src/utils/helpers.util';
import { db } from '../../../src/configs/firebase';

jest.mock('../../../src/utils/helpers.util');
jest.mock('../../../src/configs/firebase', () => ({
  db: {
    collection: jest.fn(() => ({
      get: jest.fn(),
    })),
  },
}));

describe('usersController', () => {
  describe('getUsers', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let jsonMock: jest.Mock;

    beforeEach(() => {
      jsonMock = jest.fn();
      req = {};
      res = {
        status: jest.fn().mockReturnThis(),
        json: jsonMock,
      };
    });

    it('should return users successfully', async () => {
      const mockDocs = [
        {
          id: '1',
          data: () => ({ name: 'User 1', email: 'user1@example.com' }),
        },
        {
          id: '2',
          data: () => ({ name: 'User 2', email: 'user2@example.com' }),
        },
      ];

      (db.collection as jest.Mock).mockReturnValue({
        get: jest.fn().mockResolvedValue({ docs: mockDocs }),
      });

      await usersController.getUsers(req as Request, res as Response);

      expect(returnSuccess).toHaveBeenCalledWith(
        req,
        res,
        200,
        'Users fetched successfully',
        [
          { id: '1', name: 'User 1', email: 'user1@example.com' },
          { id: '2', name: 'User 2', email: 'user2@example.com' },
        ]
      );
    });

    it('should handle errors properly', async () => {
      (db.collection as jest.Mock).mockReturnValue({
        get: jest.fn().mockRejectedValue(new Error('Database error')),
      });

      await usersController.getUsers(req as Request, res as Response);

      expect(returnNonSuccess).toHaveBeenCalledWith(
        req,
        res,
        500,
        'Database error'
      );
    });
  });

  describe('getUser', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let jsonMock: jest.Mock;

    beforeEach(() => {
      jsonMock = jest.fn();
      req = { params: { id: '123' } };
      res = {
        status: jest.fn().mockReturnThis(),
        json: jsonMock,
      };
    });

    it('should return user successfully', async () => {
      const mockUser = {
        id: '123',
        name: 'John Doe',
        email: 'john@example.com',
      };

      (db.collection as jest.Mock).mockReturnValue({
        doc: jest.fn().mockReturnValue({
          get: jest.fn().mockResolvedValue({ id: '123', data: () => mockUser }),
        }),
      });

      await usersController.getUser(req as Request, res as Response);

      expect(returnSuccess).toHaveBeenCalledWith(
        req,
        res,
        200,
        'User fetched successfully',
        mockUser
      );
    });

    it('should handle errors properly', async () => {
      (db.collection as jest.Mock).mockReturnValue({
        doc: jest.fn().mockReturnValue({
          get: jest.fn().mockRejectedValue(new Error('Database error')),
        }),
      });

      await usersController.getUser(req as Request, res as Response);

      expect(returnNonSuccess).toHaveBeenCalledWith(
        req,
        res,
        500,
        'Database error'
      );
    });
  });

  describe('createUser', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let jsonMock: jest.Mock;

    beforeEach(() => {
      jsonMock = jest.fn();
      req = { body: { name: 'John Doe', email: 'john@example.com' } };
      res = {
        status: jest.fn().mockReturnThis(),
        json: jsonMock,
      };
    });

    it('should create a user successfully', async () => {
      (db.collection as jest.Mock).mockReturnValue({
        add: jest.fn().mockResolvedValue({ id: '123' }),
      });

      await usersController.createUser(req as Request, res as Response);

      expect(returnSuccess).toHaveBeenCalledWith(
        req,
        res,
        200,
        'User created successfully',
        { id: '123', name: 'John Doe', email: 'john@example.com' }
      );
    });

    it('should handle errors properly', async () => {
      (db.collection as jest.Mock).mockReturnValue({
        add: jest.fn().mockRejectedValue(new Error('Database error')),
      });

      await usersController.createUser(req as Request, res as Response);

      expect(returnNonSuccess).toHaveBeenCalledWith(
        req,
        res,
        500,
        'Database error'
      );
    });
  });

  describe('updateUser', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;

    beforeEach(() => {
      req = { params: { id: '123' }, body: { name: 'Updated Name' } };
      res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    });

    it('should update a user successfully', async () => {
      (db.collection as jest.Mock).mockReturnValue({
        doc: jest
          .fn()
          .mockReturnValue({ update: jest.fn().mockResolvedValue({}) }),
      });

      await usersController.updateUser(req as Request, res as Response);

      expect(returnSuccess).toHaveBeenCalledWith(
        req,
        res,
        200,
        'User updated successfully',
        { id: '123', name: 'Updated Name' }
      );
    });
  });

  describe('updateUsers', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;

    beforeEach(() => {
      req = { params: { ids: '123;456' }, body: { name: 'Updated Name' } };
      res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    });

    it('should update multiple users successfully', async () => {
      (db.collection as jest.Mock).mockReturnValue({
        doc: jest
          .fn()
          .mockReturnValue({ update: jest.fn().mockResolvedValue({}) }),
      });

      await usersController.updateUsers(req as Request, res as Response);

      expect(returnSuccess).toHaveBeenCalledWith(
        req,
        res,
        200,
        'Users updated successfully',
        [
          { id: '123', name: 'Updated Name' },
          { id: '456', name: 'Updated Name' },
        ]
      );
    });
  });

  describe('getUsersBulk', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;

    beforeEach(() => {
      req = { params: { ids: '123;456' } };
      res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    });

    it('should fetch multiple users successfully', async () => {
      const mockUsers = [
        { id: '123', name: 'User One' },
        { id: '456', name: 'User Two' },
      ];

      (db.collection as jest.Mock).mockReturnValue({
        where: jest.fn().mockReturnValue({
          get: jest.fn().mockResolvedValue({
            docs: mockUsers.map((user) => ({ id: user.id, data: () => user })),
          }),
        }),
      });

      await usersController.getUsersBulk(req as Request, res as Response);

      expect(returnSuccess).toHaveBeenCalledWith(
        req,
        res,
        200,
        'Users fetched successfully',
        mockUsers
      );
    });
  });
});
