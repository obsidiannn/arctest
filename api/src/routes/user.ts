import { HttpStatusCode } from 'axios';
import { Router } from 'express';
import { z } from 'zod';
import { validate } from 'zod-express-validator';

import aes from '../libs/aes';
import HttpException from '../libs/exception';
import logger from '../libs/logger';
import { computeSharedSecret, recoverAddress } from '../libs/wallet';
import authMiddleware from '../middleware/auth.middleware';
import UserService from '../services/user.service';

const router = Router();

const userService = new UserService();

/**
 * 注册，如果存在则返回user
 */
router.post(
  '/registe',
  validate(
    {
      body: z.object({
        sign: z.string(),
        data: z.string(),
        address: z.string(),
      }),
      res: z.object({
        success: z.boolean(),
        data: z.any(),
      }),
    },
    ({ bodyError, paramsError, queryError }, res) => {
      const error = bodyError ?? paramsError ?? queryError;
      return res.status(400).json({ error: error?.message });
    },
  ),
  async (req, res) => {
    const param = req.body;
    const revocerAddress = recoverAddress(param.data, param.sign);
    logger.info(`revocerAddress=== ${revocerAddress}`);
    if (revocerAddress !== param.address.toLowerCase()) {
      throw new HttpException(HttpStatusCode.BadRequest);
    }
    const user = await userService.registe(param.address, '');
    return res.json({
      success: true,
      data: user,
    });
  },
);

/**
 * 获取当前登录人
 */
router.post('/currentUser', authMiddleware, async (req, res) => {
  const address = req.params.address;
  const user = await userService.queryByAddress(address ?? '');
  res.json({
    success: true,
    data: user,
  });
});

/**
 * 修改资料
 */
router.post(
  '/update-profile',
  authMiddleware,
  validate(
    {
      body: z.object({
        sign: z.optional(z.string()),
        username: z.optional(z.string()),
        nickname: z.optional(z.string()),
        avatar: z.optional(z.string()),
        mobile: z.optional(z.string()),
        email: z.optional(z.string()),
      }),
      res: z.object({
        success: z.boolean(),
        data: z.any(),
      }),
    },
    ({ bodyError, paramsError, queryError }, res) => {
      const error = bodyError ?? paramsError ?? queryError;
      return res.status(400).json({ error: error?.message });
    },
  ),
  async (req, res) => {
    const param = req.body;
    const address = req.params.address;
    if (!address) {
      throw new HttpException(HttpStatusCode.Unauthorized, 'un authorized');
    }
    const user = await userService.updateProfile(address, param);
    logger.info('user===', user);

    return res.json({
      // eslint-disable-next-line
      success: true,
      data: user,
    });
  },
);

/**
 * 根据 一个加密串进行登录
 *
 */
router.post(
  '/loginByKeyword',
  validate(
    {
      body: z.object({
        token: z.string(),
      }),
    },
    ({ bodyError, paramsError, queryError }, res) => {
      const error = bodyError ?? paramsError ?? queryError;
      return res.status(400).json({ error: error?.message });
    },
  ),
  async (req, res) => {
    const param = req.body;
    const splits: string[] = param.token.split('_');

    if (splits.length !== 2) {
      throw new HttpException(HttpStatusCode.BadRequest, 'error token');
    }

    const token = computeSharedSecret(splits[1] as string);
    const originalData = aes.De(splits[0] as string, token);

    const data = JSON.parse(originalData) as { data: string; sign: string };
    const address = recoverAddress(data.data, data.sign);

    const user = await userService.queryByAddress(address);
    if (!user) {
      throw new HttpException(HttpStatusCode.BadRequest, 'not registed');
    }
    return res.json({
      success: true,
      data: {
        ...data,
        address,
        userInfo: user,
      },
    });
  },
);

export default router;
