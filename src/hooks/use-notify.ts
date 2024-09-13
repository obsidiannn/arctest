import { ToastPosition, useToast } from '@chakra-ui/react';
import { StyleProps } from '@chakra-ui/system';
import { ReactNode, type, useCallback } from 'react';

interface NotifyProps {
  title: string;
  message: ReactNode;
  position?: ToastPosition;
  isClosable?: boolean;
  containerStyle?: StyleProps;
}

export const useNotify = () => {
  const toast = useToast();

  const notifySuccess = useCallback(
    ({ title, message, position = 'top-right', isClosable = true, containerStyle }: NotifyProps) => {
      toast({
        title,
        description: message,
        position,
        status: 'success',
        duration: 10000,
        isClosable,
        containerStyle,
      });
    },
    [toast],
  );

  const notifyError = useCallback(
    ({ title, message, position = 'top-right', isClosable = true, containerStyle }: NotifyProps) => {
      toast({
        title,
        description: message,
        position,
        status: 'error',
        duration: 10000,
        isClosable,
        containerStyle,
      });
    },
    [toast],
  );

  return {
    notifySuccess,
    notifyError,
  };
};
