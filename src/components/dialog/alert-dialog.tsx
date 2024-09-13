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

export interface AlertDialogProps {
  visible: boolean;
  title: string;
  describe: string;
  onClose: (confirm: boolean) => void;
}

function ConfirmDialog(props: AlertDialogProps) {
  const cancelRef = useRef(null);

  return (
    <AlertDialog
      motionPreset="slideInBottom"
      leastDestructiveRef={cancelRef}
      onClose={() => {
        props.onClose(true);
      }}
      isOpen={props.visible}
      isCentered>
      <AlertDialogOverlay />

      <AlertDialogContent>
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
