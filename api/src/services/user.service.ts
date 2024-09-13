import { Prisma, User } from '@prisma/client';

import prisma from '../libs/database';

/**
 * user service
 */
class UserService {
  async queryByAddress(address: string): Promise<User | null> {
    const user = await prisma.user.findFirst({
      where: {
        address: address.toLowerCase(),
      },
    });
    return user;
  }

  // 注册或登录
  async registe(addr: string, pubKey: string): Promise<User> {
    const address = addr.toLowerCase();
    const exist = await prisma.user.findMany({
      where: {
        address,
      },
    });
    if (exist.length > 0) {
      return exist[0] as User;
    }
    const userInput: Prisma.UserCreateInput = {
      username: address,
      address,
      pubKey,
    };
    const result = await prisma.user.create({ data: userInput });
    return result;
  }

  async updateProfile(address: string, user: Prisma.UserUpdateInput): Promise<User | null> {
    const exist = await prisma.user.findFirst({
      where: { address },
    });
    if (exist) {
      const result = await prisma.user.update({
        where: {
          id: exist.id,
        },
        data: user,
      });
      return result;
    }
    return null;
  }
}

export default UserService;
