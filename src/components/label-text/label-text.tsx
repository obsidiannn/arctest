import { CopyIcon } from '@chakra-ui/icons';
import { BoxProps, Text, type, useClipboard } from '@chakra-ui/react';
import { ReactNode, useEffect } from 'react';

import { useNotify } from '../../hooks';

interface LabelTextProps extends BoxProps {
  label?: string;
  value?: ReactNode | string;
  isAddress?: boolean;
  copyable?: boolean;
  rightWidth?: string;
}

const LabelText = ({
  label = '',
  value = 'N/A',
  textAlign = 'right',
  width = 200,
  isAddress = false,
  copyable = isAddress,
  rightWidth,
  children,
  ...props
}: LabelTextProps) => {
  const { onCopy, setValue } = useClipboard(typeof value === 'string' ? value : '');
  const { notifySuccess } = useNotify();

  useEffect(() => {
    if (typeof value === 'string' && copyable) setValue(value as string);
  }, [value, copyable, setValue]);

  const handleCopy = () => {
    onCopy();
    notifySuccess({
      title: '',
      message: value,
      position: 'bottom',
      containerStyle: { wordBreak: 'keep-all', maxWidth: '100%' },
    });
  };

  return (
    <Text as="span" className="w-full" {...props}>
      {label && (
        <Text
          as="span"
          textAlign={textAlign}
          className="inline-block mr-6"
          width={width}
          fontSize={20}
          fontWeight="800">
          {`${label}: `}
        </Text>
      )}
      {children ? (
        <Text as="span" className="inline-block absolute pt-0.5 mt-px" w={rightWidth}>
          {children}
        </Text>
      ) : (
        <>
          <Text as="span">{value}</Text>
          {copyable && <CopyIcon className="ml-1 cursor-pointer" _hover={{ color: 'pink' }} onClick={handleCopy} />}
        </>
      )}
    </Text>
  );
};

export default LabelText;
