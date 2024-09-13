import React from 'react';
import { useAccount, useEnsName } from 'wagmi';

import { useWindowSize } from '../../../hooks';
import { getEllipsisWords } from '../../../libs/util';
import { LabelText } from '../../label-text';

const Address = (): React.JSX.Element => {
  const { address } = useAccount();
  const { data: ensName } = useEnsName({ address });
  const { isTablet } = useWindowSize();

  const displayedAddress = isTablet && address ? getEllipsisWords(address) : address;

  return <LabelText label="Address" value={ensName ?? displayedAddress} />;
};

export default Address;
