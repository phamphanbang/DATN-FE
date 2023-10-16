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
} from '@chakra-ui/react';
import styles from './style.module.scss';
import { User } from "models/user";
import { TextGroup } from 'common/components/TextGroup/TextGroup';


interface IDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  userDetail: User;
}

export const UserDetailModal = ({
  isOpen,
  onClose,
  userDetail
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
              <TextGroup
                label="User Name"
                content={userDetail?.name}
              />
              <TextGroup
                label="User Email"
                content={userDetail?.name}
              />
              <TextGroup
                label="User Name"
                content={userDetail?.name}
              />
              <TextGroup
                label="User Name"
                content={userDetail?.name}
              />
            </div>
            {/* <Divider mt={2} mb={5}></Divider>
            <Text mb="15px" fontWeight={600} fontStyle="italic" color="primary">
              Detail
            </Text>
            <div className={styles.container}>

            </div> */}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}