import { PinataSDK } from 'pinata';

import myCache from '../libs/cache';

/**
 * 文件处理 service
 */
class FileService {
  private pinataInstance: PinataSDK;

  constructor() {
    this.pinataInstance = new PinataSDK({
      pinataJwt: process.env.NEXT_PUBLIC_PINATA_JWT,
      pinataGateway: process.env.NEXT_PUBLIC_PINATA_GATEWAY,
    });
  }

  async uploadFile(file: string): Promise<string> {
    const upload = await this.pinataInstance.upload.base64(file);
    return upload.cid;
  }

  /**
   * 根据文件cid 生成有时效的访问link
   * @param cid
   * @returns
   */
  async fileUrl(cid: string): Promise<string> {
    const key = `img_${cid}`;
    const path = myCache.get<string>(key);
    if (path) {
      return path;
    }
    const res = await this.pinataInstance.gateways.createSignedURL({
      cid,
      expires: 600000,
    });
    myCache.set(key, res, 600000);
    return res;
  }
}

let fileService: FileService | null = null;

export const getFileService = () => {
  if (!fileService) {
    fileService = new FileService();
  }
  return fileService;
};

export default FileService;
