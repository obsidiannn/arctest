import { useCallback, useEffect, useState } from 'react';
import { Address, recoverMessageAddress } from 'viem';
import { useSignMessage } from 'wagmi';

export function useSignInfo() {
  const [recoveredAddress, setRecoveredAddress] = useState<Address>();
  const { data: signature, variables, error, isPending, signMessage } = useSignMessage();

  const recoverAddress = useCallback(async () => {
    if (variables?.message && signature) {
      const recoveredAddressResponse = await recoverMessageAddress({
        message: variables?.message,
        signature,
      });
      setRecoveredAddress(recoveredAddressResponse);
    }
  }, [signature, variables?.message]);

  useEffect(() => {
    recoverAddress();
  }, [recoverAddress]);

  return { signature, recoveredAddress, error, isPending, signMessage };
}
