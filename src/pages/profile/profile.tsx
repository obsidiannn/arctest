import { Box, Button, Flex, Heading, Input, Text, useToast } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

import auth from '../../api/auth';
import UploadAvatar from '../../components/avatar-upload';
import { getFileService } from '../../libs/file';
import validate from '../../libs/validate';
import { CurrentAccount } from '../../store/sys-recoil';
import { Account, User } from '../../types/account';

/**
 * 资料编辑页面
 * @returns
 */
const ProfileScreen = () => {
  const [currentAccount, setCurrentAccount] = useRecoilState<Account | null>(CurrentAccount);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const [userInfo, setUserInfo] = useState<User | null>(currentAccount?.userInfo ?? null);

  useEffect(() => {
    if (currentAccount?.userInfo) {
      setUserInfo(currentAccount.userInfo);
    }
  }, [currentAccount?.userInfo]);

  const save = async () => {
    const fileService = getFileService();
    if (fileService) {
      if (!userInfo) {
        toast({
          title: '数据异常',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
        return;
      }

      if (userInfo.email && !validate.isEmail(userInfo.email)) {
        toast({
          title: 'email格式错误',
          status: 'error',
          duration: 2000,
          isClosable: true,
        });
        return;
      }

      try {
        setLoading(true);
        const param = {
          sign: userInfo.sign ?? '',
          username: userInfo.username ?? userInfo.address,
          nickname: userInfo.nickname ?? '',
          avatar: userInfo.avatar ?? '',
          mobile: userInfo.mobile ?? '',
          email: userInfo.email ?? '',
        };
        // 如果头像是以data://.. 开头，意味着发生过变更，base64需要进行上传并获取cid
        if (userInfo.avatar && userInfo.avatar.startsWith('data:')) {
          const avatarUrl = await fileService.uploadFile(userInfo.avatar);
          param.avatar = avatarUrl;
        }
        const res = await auth.updateProfile(param);
        if (res && currentAccount) {
          setCurrentAccount({
            ...currentAccount,
            userInfo: res,
          });
          toast({
            title: 'success',
            status: 'success',
            duration: 5000,
          });
        }
      } catch (error) {
        toast({
          title: '数据异常',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Flex className={'flex-col'} flex={1}>
      <Heading as="h2" fontSize="2rem" mb={10} className="text-center [text-shadow:_0_4px_0_var(--tw-ring-color)]">
        User Profile
      </Heading>

      <Box minWidth={'270px'} gap={4} flex={1} className="flex flex-col p-5 self-center">
        <div className="flex flex-row items-center justify-center w-full mt-4">
          <UploadAvatar
            enableUpload
            url={userInfo?.avatar ?? ''}
            onChoosed={(val: string) => {
              if (userInfo) {
                setUserInfo({ ...userInfo, avatar: val });
              }
            }}
          />
        </div>

        <div className="flex flex-row items-center justify-center w-full mt-4">
          <Text className="mr-4 text-1xl font-bold items-center">address:</Text>
          <Input
            className="flex-nowrap text-nowrap w-auto"
            contentEditable={false}
            value={userInfo?.address ?? ''}
            onChange={() => {}}
            type="textarea"
            placeholder="Enter message to sign"
          />
        </div>

        <div className="flex flex-row items-center justify-center w-full mt-4">
          <Text className="mr-4 text-1xl font-bold items-center">username:</Text>
          <Input
            className="flex-nowrap text-nowrap w-auto"
            value={userInfo?.username ?? ''}
            onChange={(e) => {
              if (userInfo) {
                setUserInfo({ ...userInfo, username: e.target.value });
              }
            }}
            type="textarea"
            placeholder="Enter message to sign"
          />
        </div>

        <div className="flex flex-row items-center justify-center w-full mt-4">
          <Text className="mr-4 text-1xl font-bold items-center">nickname:</Text>
          <Input
            className="flex-nowrap text-nowrap w-auto"
            value={userInfo?.nickname ?? ''}
            onChange={(e) => {
              if (userInfo) {
                setUserInfo({ ...userInfo, nickname: e.target.value });
              }
            }}
            type="textarea"
            placeholder="Enter message to sign"
          />
        </div>

        <div className="flex flex-row items-center justify-center w-full mt-4">
          <Text className="mr-4 text-1xl font-bold items-center">sign:</Text>
          <Input
            className="flex-nowrap text-nowrap w-auto"
            value={userInfo?.sign ?? ''}
            onChange={(e) => {
              if (userInfo) {
                setUserInfo({ ...userInfo, sign: e.target.value });
              }
            }}
            type="text"
            placeholder="Enter message to sign"
          />
        </div>

        <div className="flex flex-row items-center justify-center w-full mt-4">
          <Text className="mr-4 text-1xl font-bold items-center">mobile:</Text>
          <Input
            className="flex-nowrap text-nowrap w-auto"
            value={userInfo?.mobile ?? ''}
            onChange={(e) => {
              if (userInfo) {
                setUserInfo({
                  ...userInfo,
                  mobile: e.target.value.replace(/[^0-9]/g, ''),
                });
              }
            }}
            type="tel"
            placeholder="Enter message to sign"
          />
        </div>

        <div className="flex flex-row items-center justify-center w-full mt-4">
          <Text className="mr-4 text-1xl font-bold items-center">email:</Text>
          <Input
            className="flex-nowrap text-nowrap w-auto"
            value={userInfo?.email ?? ''}
            onChange={(e) => {
              if (userInfo) {
                setUserInfo({
                  ...userInfo,
                  email: e.target.value,
                });
              }
            }}
            type="email"
            placeholder="Enter message to sign"
          />
        </div>

        <Button
          isLoading={loading}
          onClick={save}
          variant="ghost"
          maxWidth={'40xl'}
          className="w-4/5 border self-center bg-blue-400 mt-4 rounded-[20px] hover:shadow-[0_0_8px_8px_rgba(30,136,229,0.2)]">
          <Text className="text-gray-200"> 修改 </Text>
        </Button>
      </Box>
    </Flex>
  );
};

export default ProfileScreen;
