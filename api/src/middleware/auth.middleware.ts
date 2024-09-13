import { HttpStatusCode } from 'axios';
import { NextFunction, Request, Response } from 'express';

import HttpException from '../libs/exception';
import logger from '../libs/logger';
import { recoverAddress } from '../libs/wallet';

/**
 * 认证鉴权的middleware
 * @param req
 * @param _
 * @param next
 */
const authMiddleware = (req: Request, _: Response, next: NextFunction) => {
  const data = req.header('data');
  const sign = req.header('sign');
  const address = req.header('address');
  if (!data || !sign || !address) {
    throw new HttpException(HttpStatusCode.Unauthorized, 'un authorized');
  }
  const addr = recoverAddress(data, sign);
  logger.info(`addr ${addr} address ${address}`);
  if (addr !== address.toLowerCase()) {
    throw new HttpException(HttpStatusCode.Forbidden, 'token forbideen');
  }
  req.params.address = address.toLowerCase();
  next();
};

export default authMiddleware;
