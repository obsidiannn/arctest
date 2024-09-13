import { Box, Flex } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';

import { Footer } from '../components/footer';
import { Header } from '../components/header';

const Layout = () => {
  return (
    <Flex flexDirection="column" minHeight="100vh">
      <Header />
      <Box as="main" flex={1} p={4} className="flex flex-col">
        <Outlet />
      </Box>
      <Footer />
    </Flex>
  );
};
export default Layout;
