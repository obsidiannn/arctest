import { SignatureLike, ethers, verifyMessage } from 'ethers';

import aes from './aes';

/**
 * 系统walet 用于验证
 */
export const systemWallet = new ethers.Wallet(process.env.SERVER_PRIVATE_KEY ?? '');

export const sysPubKey = () => {
  return {
    pubKey: systemWallet.signingKey.publicKey,
    address: systemWallet.address,
  };
};

/**
 * sign + data 还原 address
 */
export const recoverAddress = (data: ethers.BytesLike, sign: SignatureLike) => {
  return verifyMessage(data, sign).toLowerCase();
};

/**
 * 椭圆 用户计算共享密钥
 * @param publicKey 对方的公钥与自己的私钥计算
 * @returns
 */
export const computeSharedSecret = (publicKey: string): string => {
  let pubKey = `${publicKey}`;
  if (pubKey.slice(0, 2) !== '0x') {
    pubKey = `0x${pubKey}`;
  }
  const sharedSecret = systemWallet.signingKey.computeSharedSecret(pubKey);
  return aes.En('arcblock', sharedSecret);
};
