import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
} from "@chakra-ui/react";

export interface ModalConfirmProps {
  title: string;
  description: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
  isDisableConfirm?: boolean;
}

export const ModalConfirm = ({
  title,
  description,
  isOpen,
  onClose,
  onConfirm,
  isDisableConfirm,
  isLoading = false
}: ModalConfirmProps) => {
  return (
    <Modal
      isCentered
      onClose={onClose}
      isOpen={isOpen}
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontSize="16px">{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody pt={0}>
          <p>{description}</p>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="gray" color="gray" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button backgroundColor="primary" color="white" isLoading={isLoading} onClick={onConfirm} display={isDisableConfirm ? "none" : "block"}>
            Yes
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
