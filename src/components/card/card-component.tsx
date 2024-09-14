import './Card.module.css';

import { Box, Button, Divider, Flex, Heading } from '@chakra-ui/react';
import { useState } from 'react';
import { useAccount } from 'wagmi';

import { Address, Balance, BlockNumber, Chain as C1, SignCard, Status, TransferCard } from './components';

const Card = () => {
  const [shown, setShown] = useState(false);
  const { isConnected } = useAccount();
  const fetchTransactions = () => setShown(!shown);

  return (
    <Box className={'container'}>
      <Heading as="h2" fontSize="2rem" mb={10} className="text-center [text-shadow:_0_4px_0_var(--tw-ring-color)]">
        User Profile
      </Heading>
      <Flex className="flex-col items-start gap-4 w-4/5 m-auto">
        <Status />
        {isConnected && (
          <>
            <Address />
            <C1 />
            <Balance />
            <Flex w="100%" display="flex" justifyContent="space-between" flexWrap="wrap">
              <BlockNumber />
              <Button
                onClick={fetchTransactions}
                variant="ghost"
                className="border border-stone-400 rounded-[20px] hover:shadow-[0_0_8px_8px_rgba(30,136,229,0.2)]">
                {shown ? 'Hide' : 'Show'} block info
              </Button>
            </Flex>
            <Divider mb={1} />
            <Flex w="100%" display="flex" justifyContent="space-around" flexWrap="wrap" gap={5}>
              <SignCard />
              <TransferCard />
            </Flex>
          </>
        )}
      </Flex>
    </Box>
  );
};

export default Card;
