export interface User {
  id: number;
  username: string;
  nickname: string;
  avatar: string;
  address: string;
  gender: number;
  sign: string;
  pubKey: string;
  status: number;
  email: string;
  mobile: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Account {
  address: string;
  data: string;
  sign: string;
  userInfo: User;
}

export interface SystemInfo {
  pubKey: string;
  address: string;
}
