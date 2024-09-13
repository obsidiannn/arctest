import * as Crypto from 'crypto';

const getIV = (val: string): string => {
  return Crypto.createHash('sha256').update(val).digest('hex').substring(0, 16);
};
const En = (val: string, key: string): string => {
  const iv = getIV(key);
  const cipher = Crypto.createCipheriv('aes-128-cbc', iv, iv);
  const encryptedData = cipher.update(val, 'utf8', 'hex');
  return encryptedData + cipher.final('hex');
};
const De = (val: string, key: string): string => {
  const iv = getIV(key);
  const decipher = Crypto.createDecipheriv('aes-128-cbc', iv, iv);
  return decipher.update(val, 'hex', 'utf8') + decipher.final('utf8');
};
const EnBuffer = (val: Buffer, key: string): Buffer => {
  const iv = getIV(key);
  const cipher = Crypto.createCipheriv('aes-128-cbc', iv, iv);
  const data: string = cipher.update(val, undefined, 'hex') + cipher.final('hex');
  return Buffer.from(data, 'hex');
};
const DeBuffer = (val: Buffer, key: string): Buffer => {
  const iv = getIV(key);
  const decipher = Crypto.createDecipheriv('aes-128-cbc', iv, iv);
  const data = decipher.update(val, undefined, 'hex') + decipher.final('hex');
  return Buffer.from(data, 'hex');
};

export const encryptAndSign = (
  originalData: string,
): {
  e: string;
  d: string;
  priKey: string;
  pubKey: string;
} => {
  const { publicKey, privateKey } = Crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: {
      type: 'pkcs1',
      format: 'pem',
    },
    privateKeyEncoding: {
      type: 'pkcs8',
      format: 'pem',
    },
  });
  const encrypted = Crypto.publicEncrypt(
    {
      key: publicKey,
      padding: Crypto.constants.RSA_PKCS1_PADDING,
    },
    Buffer.from(originalData),
  );

  const decrypted = Crypto.privateDecrypt(
    {
      key: privateKey,
      padding: Crypto.constants.RSA_PKCS1_PADDING,
    },
    encrypted,
  );

  return {
    e: encrypted.toString('base64'),
    d: decrypted.toString('base64'),
    pubKey: publicKey,
    priKey: privateKey,
  };
};

export default {
  En,
  De,
  EnBuffer,
  DeBuffer,
  encryptAndSign,
};
