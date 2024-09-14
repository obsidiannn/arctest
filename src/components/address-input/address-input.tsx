import { Box, Input, InputGroup, InputLeftAddon, Spinner } from '@chakra-ui/react';
import React, { ChangeEvent, useCallback } from 'react';
import { isAddress, zeroAddress } from 'viem';
import { useEnsResolver } from 'wagmi';

import { useDebounce, useNotify } from '../../hooks';

interface AddressInputProps {
  receiver: string;
  setReceiver: (receiver: string) => void;
}

const AddressInput = ({ receiver, setReceiver }: AddressInputProps) => {
  const {
    data: resolvedAddress,
    isLoading: isResolvingInProgress,
    isError,
    error,
  } = useEnsResolver({
    name: receiver,
  });

  const debouncedReceiver = useDebounce(receiver, 2000);
  const { notifyError } = useNotify();

  const isValidEthAddress = (value: string) => value.startsWith('0x') && value.length === 42;

  const handleInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => {
      setReceiver(e.target.value);

      if (resolvedAddress && resolvedAddress !== zeroAddress) {
        setReceiver(resolvedAddress);
      } else if (debouncedReceiver && isError) {
        notifyError({
          title: 'Error:',
          message: error?.message ?? 'Invalid address or ENS name.',
        });
      }
    },
    [resolvedAddress, debouncedReceiver, isError, error?.message, notifyError, setReceiver],
  );

  const getAddonContent = (): React.JSX.Element | null => {
    if (isResolvingInProgress) return <Spinner />;

    const isValid = isValidEthAddress(receiver);
    const isAddressFlag = isAddress(resolvedAddress as string) && resolvedAddress !== zeroAddress;
    let validAddress;
    if (isValid) {
      validAddress = receiver;
    } else if (isAddressFlag) {
      validAddress = resolvedAddress;
    }

    if (validAddress) return <input value={validAddress.toLowerCase()} />;

    return <input />;
  };

  return (
    <Box w="100%">
      <InputGroup>
        <InputLeftAddon w="50px" p={0} justifyContent="center">
          {getAddonContent()}
        </InputLeftAddon>
        <Input
          value={receiver}
          onChange={handleInput}
          placeholder="Enter Ethereum name or address"
          name="ethereum"
          spellCheck={false}
        />
      </InputGroup>
    </Box>
  );
};

export default AddressInput;
