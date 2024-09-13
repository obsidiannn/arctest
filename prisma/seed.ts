// import { Prisma } from "@prisma/db-system";
// import { prisma } from "../src/lib/database";
// import { getInstance } from "../src/lib/cache";
// import { IModel } from '@repo/enums';
// import "dotenv/config";

// const nodes: Prisma.NodeCreateInput[] = [
//   {
//     code: "0002",
//     region: "ASIA",
//     type: "API_GATEWAY",
//     status: IModel.INode.Status.ONLINE,
//     addr: process.env.API_ADDR,
//     version: "0.1",
//   },
//   {
//     code: "0007",
//     region: "ASIA",
//     type: "STATIC_URL",
//     status: IModel.INode.Status.ONLINE,
//     addr: "https://static.splive.top",
//     version: "0.1",
//   },
//   {
//     code: "0008",
//     region: "ASIA",
//     type: "SOCKET_API",
//     status: IModel.INode.Status.ONLINE,
//     addr: process.env.SOCKET_ADDR,
//     version: "0.1",
//   },
// ];
// const versions: Prisma.AppVersionCreateInput[] = [
//   {
//     versionCode: 23,
//     versionName: "0.2.10",
//     description: "1.新增版本接口\n2.修复群聊解密失败\n",
//     forceUpdate: 0,
//     language: "zh-CN",
//     platform: "android",
//     downloadUrl: "https://cdqr.s3.bitiful.net/bobo-0.2.10.apk?no-wait=on",
//   },
//   {
//     versionCode: 24,
//     versionName: "0.2.11",
//     description: "1.新增版本接口\n2.修复群聊解密失败\n",
//     forceUpdate: 0,
//     language: "zh-CN",
//     platform: "android",
//     downloadUrl: "https://cdqr.s3.bitiful.net/bobo-0.2.11.apk?no-wait=on",
//   },
//   {
//     versionCode: 25,
//     versionName: "0.2.12",
//     description: "1.修复群聊解密\n2.优化聊天交互\n3.新增版本历史接口",
//     forceUpdate: 0,
//     language: "zh-CN",
//     platform: "android",
//     downloadUrl: "https://cdqr.s3.bitiful.net/bobo-0.2.12.apk?no-wait=on",
//   },
//   {
//     versionCode: 26,
//     versionName: "0.2.13",
//     description: "1.新增开屏\n2.优化菜单弹窗\n",
//     forceUpdate: 0,
//     language: "zh-CN",
//     platform: "android",
//     downloadUrl: "https://cdqr.s3.bitiful.net/bobo-0.2.13.apk?no-wait=on",
//   },
//   {
//     versionCode: 27,
//     versionName: "0.2.14",
//     description: "1.修改欢迎页逻辑\n2.群&好友缓存优化\n3.修复聊天已知问题\n4.新增图标",
//     forceUpdate: 0,
//     language: "zh-CN",
//     platform: "android",
//     downloadUrl: "https://cdqr.s3.bitiful.net/bobo-0.2.14.apk?no-wait=on",
//   },
//   {
//     versionCode: 28,
//     versionName: "0.2.15",
//     description: "1.修复sqlite闪退\n2.优化消息缓存化\n3.好友拉黑\n4.其他问题优化",
//     forceUpdate: 0,
//     language: "zh-CN",
//     platform: "android",
//     downloadUrl: "https://cdqr.s3.bitiful.net/bobo-0.2.15.apk?no-wait=on",
//   },
//   {
//     versionCode: 29,
//     versionName: "0.2.16",
//     description: "1.修复本地消息存储\n2.更新离线逻辑",
//     forceUpdate: 0,
//     language: "zh-CN",
//     platform: "android",
//     downloadUrl: "https://cdqr.s3.bitiful.net/bobo-0.2.16.apk?no-wait=on",
//   },
//   {
//     versionCode: 30,
//     versionName: "0.2.17",
//     description: "1.拆分聊天本地逻辑",
//     forceUpdate: 0,
//     language: "zh-CN",
//     platform: "android",
//     downloadUrl: "https://cdqr.s3.bitiful.net/bobo-0.2.17.apk?no-wait=on",
//   },
//   {
//     versionCode: 31,
//     versionName: "0.2.18",
//     description: "1.新增输入中状态\n2.优化主题结构\n3.聊天组件调整\n4.其他问题优化",
//     forceUpdate: 0,
//     language: "zh-CN",
//     platform: "android",
//     downloadUrl: "https://cdqr.s3.bitiful.net/bobo-0.2.18.apk?no-wait=on",
//   },
//   {
//     versionCode: 32,
//     versionName: "0.2.19",
//     description: "1.群默认头像\n2.优化输入中\n",
//     forceUpdate: 0,
//     language: "zh-CN",
//     platform: "android",
//     downloadUrl: "https://cdqr.s3.bitiful.net/bobo-0.2.19.apk?no-wait=on",
//   },
//   {
//     versionCode: 33,
//     versionName: "0.2.20",
//     description: "1.颜色主题调整\n2.多语言调整\n",
//     forceUpdate: 0,
//     language: "zh-CN",
//     platform: "android",
//     downloadUrl: "https://cdqr.s3.bitiful.net/bobo-0.2.20.apk?no-wait=on",
//   },
// ];

// const categories: Prisma.SysCategoryCreateInput[] = [
//   {
//     name: '闪退、卡顿或界面错位',
//     type: IModel.ISystem.CategoryType.FEEDBACK,
//     describe: '',
//     sort: 1
//   },
//   {
//     name: '通讯录、添加朋友',
//     type: IModel.ISystem.CategoryType.FEEDBACK,
//     describe: '无法添加朋友、群聊丢失',
//     sort: 2
//   },
//   {
//     name: '账号安全',
//     type: IModel.ISystem.CategoryType.FEEDBACK,
//     describe: '绑定与解绑、登录',
//     sort: 3
//   },
//   {
//     name: '聊天功能',
//     type: IModel.ISystem.CategoryType.FEEDBACK,
//     describe: '收发消息、单聊设置',
//     sort: 4
//   },
//   {
//     name: '音视频通话',
//     type: IModel.ISystem.CategoryType.FEEDBACK,
//     describe: '断开、收不到声音',
//     sort: 5
//   },
//   {
//     name: '聊天记录',
//     type: IModel.ISystem.CategoryType.FEEDBACK,
//     describe: '',
//     sort: 6
//   },
//   {
//     name: '表情',
//     type: IModel.ISystem.CategoryType.FEEDBACK,
//     describe: '',
//     sort: 7
//   },
// ];

// (async () => {
//   console.log("初始化", nodes);
//   await prisma.$connect();
//   const cacheClient = await getInstance();
//   await prisma.node.deleteMany();
//   await prisma.node.createMany({
//     data: nodes,
//   });
//   await prisma.appVersion.deleteMany();
//   await prisma.appVersion.createMany({
//     data: versions,
//   });
//   await prisma.sysCategory.deleteMany()
//   await prisma.sysCategory.createMany({
//     data: categories
//   })
//   await cacheClient.reset();
//   await prisma.$disconnect();
//   console.log("初始化成功!");
//   process.exit(0);
// })();
