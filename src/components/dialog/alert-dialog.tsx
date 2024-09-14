import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react';
import { useRef } from 'react';

import { useWindowSize } from '../../hooks';

export interface AlertDialogProps {
  visible: boolean;
  title: string;
  describe: string;
  onClose: (confirm: boolean) => void;
}

function ConfirmDialog(props: AlertDialogProps) {
  const cancelRef = useRef(null);
  const { width, isMobile } = useWindowSize();
  return (
    <AlertDialog
      motionPreset="slideInBottom"
      leastDestructiveRef={cancelRef}
      onClose={() => {
        props.onClose(false);
      }}
      isOpen={props.visible}
      isCentered>
      <AlertDialogOverlay />

      <AlertDialogContent maxWidth={isMobile ? width - 40 : undefined}>
        <AlertDialogHeader>{props.title}</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>{props.describe}</AlertDialogBody>
        <AlertDialogFooter>
          <Button
            ref={cancelRef}
            onClick={() => {
              props.onClose(false);
            }}>
            No
          </Button>
          <Button
            colorScheme="red"
            ml={3}
            onClick={() => {
              props.onClose(true);
            }}>
            Yes
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default ConfirmDialog;
