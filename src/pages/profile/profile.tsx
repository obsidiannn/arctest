import { Box, Button, Flex, Heading, Input, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { useRecoilState } from 'recoil';

import auth from '../../api/auth';
import UploadAvatar from '../../components/avatar-upload';
import eventManager from '../../libs/event-manager';
import { getFileService } from '../../libs/file';
import validate from '../../libs/validate';
import { CurrentAccount } from '../../store/sys-recoil';
import { Account, User } from '../../types/account';
import { IModel } from '../../types/system';
import InputLine from './input-line';

/**
 * 资料编辑页面
 * @returns
 */
const ProfileScreen = () => {
  const [currentAccount, setCurrentAccount] = useRecoilState<Account | null>(CurrentAccount);
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState<User | null>(currentAccount?.userInfo ?? null);

  const formValid = (): boolean => {
    if (!userInfo) {
      eventManager.emit('event_toast_key', {
        type: IModel.Event.EventTypeEnum.TOAST,
        title: 'valid data error',
        status: 'error',
      } as IModel.Event.EventToast);
      return false;
    }

    if (userInfo.email && !validate.isEmail(userInfo.email)) {
      eventManager.emit('event_toast_key', {
        type: IModel.Event.EventTypeEnum.TOAST,
        title: 'valid email error',
        status: 'error',
      } as IModel.Event.EventToast);
      return false;
    }
    return true;
  };

  const save = async () => {
    const valid = formValid();
    if (!valid) {
      return;
    }
    const fileService = getFileService();
    if (fileService && userInfo) {
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
          eventManager.emit('event_toast_key', {
            type: IModel.Event.EventTypeEnum.TOAST,
            title: 'success',
            status: 'success',
          } as IModel.Event.EventToast);
        }
      } catch (error) {
        eventManager.emit('event_toast_key', {
          type: IModel.Event.EventTypeEnum.TOAST,
          title: 'operation error',
          status: 'error',
        } as IModel.Event.EventToast);
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
            disabled
            type="textarea"
            placeholder="Enter message to sign"
          />
        </div>

        <InputLine
          title="username"
          value={userInfo?.username ?? ''}
          onChangeText={(val: string) => {
            if (userInfo) {
              setUserInfo({ ...userInfo, username: val });
            }
          }}
        />

        <InputLine
          title="nickname"
          value={userInfo?.nickname ?? ''}
          onChangeText={(val: string) => {
            if (userInfo) {
              setUserInfo({ ...userInfo, nickname: val });
            }
          }}
        />

        <InputLine
          title="sign"
          value={userInfo?.sign ?? ''}
          onChangeText={(val: string) => {
            if (userInfo) {
              setUserInfo({ ...userInfo, sign: val });
            }
          }}
        />

        <InputLine
          title="mobile"
          value={userInfo?.mobile ?? ''}
          onChangeText={(val: string) => {
            if (userInfo) {
              setUserInfo({
                ...userInfo,
                mobile: val.replace(/[^0-9]/g, ''),
              });
            }
          }}
        />

        <InputLine
          title="email"
          value={userInfo?.email ?? ''}
          onChangeText={(val: string) => {
            if (userInfo) {
              setUserInfo({ ...userInfo, email: val });
            }
          }}
        />

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
