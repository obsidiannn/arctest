import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';

// zod 的入参转换 method
const validate = (schema: AnyZodObject) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await schema.parseAsync({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    return next();
  } catch (error) {
    return res.status(400).json(error);
  }
};

export default validate;
