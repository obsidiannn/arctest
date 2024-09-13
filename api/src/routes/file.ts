import { Router } from 'express';
import { z } from 'zod';
import { validate } from 'zod-express-validator';

import authMiddleware from '../middleware/auth.middleware';
import { getFileService } from '../services/file.service';

/**
 * 操作文件的controller
 */
const router = Router();

/**
 * 上传文件，目前只有base64
 * 上传到 Pinata
 */
router.post(
  '/upload',
  authMiddleware,
  validate(
    {
      body: z.object({
        base64: z.string(),
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
    const fileService = getFileService();
    const result = await fileService.uploadFile(param.base64);
    return res.json({
      success: true,
      data: result,
    });
  },
);

/**
 * 根据文件cid 计算临时的授权url + 临时缓存
 *
 */
router.post(
  '/file-url',
  authMiddleware,
  validate(
    {
      body: z.object({
        cid: z.string(),
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
    const fileService = getFileService();
    const url = await fileService.fileUrl(param.cid);
    return res.json({
      success: true,
      data: url,
    });
  },
);

export default router;
