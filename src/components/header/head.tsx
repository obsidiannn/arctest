import { ArrowLeftIcon, EmailIcon, HamburgerIcon } from '@chakra-ui/icons';
import {
  Link as ChakraLink,
  HStack,
  Heading,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { useAccount, useDisconnect } from 'wagmi';

import blockletLogo from '../../assets/blocklet.svg';
import { useWindowSize } from '../../hooks';
import { CurrentAccount } from '../../store/sys-recoil';

const Header = () => {
  const { isTablet } = useWindowSize();
  const setCurrentAccount = useSetRecoilState(CurrentAccount);
  const { disconnect } = useDisconnect();
  const { address } = useAccount();
  const navigate = useNavigate();

  return (
    <HStack as="header" p="1.5rem" position="sticky" top={0} zIndex={10} justifyContent="space-between">
      <HStack>
        <Image src={blockletLogo} alt="logo" width={45} height={45} />
        <>
          {!isTablet ? (
            <Heading as="h1" fontSize="1.5rem" className="text-shadow">
              ArcTest
            </Heading>
          ) : null}
          <Menu defaultIsOpen>
            <MenuButton as={IconButton} aria-label="Options" icon={<HamburgerIcon />} variant="outline" />
            <MenuList>
              <ChakraLink
                onClick={() => {
                  navigate('/');
                }}>
                <MenuItem icon={<ArrowLeftIcon />}>Home</MenuItem>
              </ChakraLink>
              <ChakraLink
                onClick={() => {
                  navigate('/profile');
                }}>
                <MenuItem icon={<EmailIcon />}>Profile</MenuItem>
              </ChakraLink>
              <ChakraLink
                onClick={() => {
                  disconnect();
                  setCurrentAccount(null);
                }}>
                <MenuItem icon={<EmailIcon />}>Logout</MenuItem>
              </ChakraLink>
            </MenuList>
          </Menu>
        </>
      </HStack>

      <HStack>{address ? <ConnectButton /> : null}</HStack>
    </HStack>
  );
};

export default Header;
