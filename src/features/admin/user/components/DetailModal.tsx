import {
  Divider,
  HStack,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  Image,
} from "@chakra-ui/react";
import styles from "./style.module.scss";
import { User } from "models/user";
import { TextGroup } from "common/components/TextGroup/TextGroup";
import { getImage } from "utils";

interface IDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  userDetail: User;
}

export const UserDetailModal = ({
  isOpen,
  onClose,
  userDetail,
}: IDetailModalProps) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} blockScrollOnMount={false}>
        <ModalOverlay />
        <ModalContent p="10px" maxW="700px">
          <ModalHeader>
            <HStack>
              <Heading ml={1} w="550px">
                <Text fontSize={16} fontWeight={400} mt={1.5}>
                  User Detail
                </Text>
              </Heading>
            </HStack>
          </ModalHeader>
          <ModalCloseButton mt="15px" mr="10px" />
          <ModalBody>
            <Divider mb={5}></Divider>
            <div className={styles.container}>
              <TextGroup label="User Name" content={userDetail?.name} />
              <TextGroup label="User Email" content={userDetail?.email} />
              <TextGroup label="User Name" content={""} />
              <Image
                boxSize="200px"
                src={getImage("users/" + userDetail.id, userDetail?.avatar)}
                alt="User Avatar"
                my={"10px"}
                borderRadius={"full"}
              />
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
