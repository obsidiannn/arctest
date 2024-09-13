import { Router } from 'express';

import { sysPubKey } from '../libs/wallet';

const router = Router();
/**
 * 获取系统公钥 及 系统address
 */
router.use('/sysPubKey', (_, res) =>
  res.json({
    data: sysPubKey(),
  }),
);

export default router;
