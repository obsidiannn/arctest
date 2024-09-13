import fileApi from '../api/file';

export class FileService {
  async uploadFile(file: string): Promise<string> {
    const sp = file.split(',');
    const res = await fileApi.upload(sp.length > 1 ? (sp[1] ?? '') : file);
    return res;
  }

  async fileUrl(cid: string): Promise<string> {
    const res = await fileApi.fileUrl(cid);
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
