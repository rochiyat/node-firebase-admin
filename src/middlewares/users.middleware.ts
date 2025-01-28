// middlware for users with joi validation

import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

const userSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
});

export function usersMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { error } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.message });
  }
  next();
}
