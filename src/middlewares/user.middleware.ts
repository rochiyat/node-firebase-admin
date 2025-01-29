// middlware for users with joi validation

import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

export function getUser(req: Request, res: Response, next: NextFunction) {
  const schema = Joi.object().keys({
    id: Joi.string().required(),
  });
  const { error } = schema.validate(req.params);
  if (error) {
    return res.status(400).json({ message: error.message });
  }
  next();
}

export function updateUsers(req: Request, res: Response, next: NextFunction) {
  const schema = Joi.object().keys({
    ids: Joi.string().required(),
  });
  const { error } = schema.validate(req.params);
  if (error) {
    return res.status(400).json({ message: error.message });
  }
  next();
}

export function getUsers(req: Request, res: Response, next: NextFunction) {
  const schema = Joi.object().keys({
    ids: Joi.string().required(),
  });
  const { error } = schema.validate(req.params);
  if (error) {
    return res.status(400).json({ message: error.message });
  }
  next();
}

export function getUserByPublicUid(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const schema = Joi.object().keys({
    publicUid: Joi.string().required(),
  });
  const { error } = schema.validate(req.params);
  if (error) {
    return res.status(400).json({ message: error.message });
  }
  next();
}

export function getUsersBulkByPublicUids(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const schema = Joi.object().keys({
    publicUids: Joi.string().required(),
  });
  const { error } = schema.validate(req.params);
  if (error) {
    return res.status(400).json({ message: error.message });
  }
  next();
}
