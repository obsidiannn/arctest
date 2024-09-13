import { Box, Text } from '@chakra-ui/react';

const Footer = () => (
  <Box
    as="footer"
    p="1rem"
    position="sticky"
    bottom="0"
    zIndex="10"
    textAlign="center"
    className="flex justify-center flex-col">
    <div className="flex min-w-0 gap-x-4">
      <div className="min-w-0 flex-auto">
        <p className="text-sm font-semibold leading-6 ">author：sunjx</p>
        <p className="truncate text-xs leading-5">arctest blocklet demo application</p>
      </div>
    </div>
    <Text textAlign="center">
      <a href="https://github.com/obsidiannn/arctest" target="_blank" rel="noopener noreferrer">
        Github repo address
      </a>
    </Text>
  </Box>
);

export default Footer;
