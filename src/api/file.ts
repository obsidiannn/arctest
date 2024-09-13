import { createInstance } from '../libs/api';

const upload = async (base64: string) => {
  const res = await createInstance(true).post('/api/file/upload', { base64 });
  return res.data;
};

const fileUrl = async (cid: string): Promise<string> => {
  const res = await createInstance(true).post('/api/file/file-url', { cid });
  return res.data;
};

export default {
  upload,
  fileUrl,
};
