import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  FormControl,
  Image,
  ListItem,
  SimpleGrid,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  UnorderedList,
  VStack,
  Text,
} from "@chakra-ui/react";
import { useGetUserExamDetail } from "api/apiHooks/examHook";
import styles from "./style.module.scss";
import theme from "themes/theme";
import DetailPanel from "./DetailPanel";
import { IUserExamDetail } from "models/exam";
import { NavLink } from "common/usercomponents/NavLink";
import { TextAreaField } from "common/components/TextAreaField";
import { getImage, getItem } from "utils";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LocalStorageKeys } from "common/enums";
import UserNotFound from "features/client/notFound/UserNotFound";

interface IExamDetail {
  examId: string;
}

const ExamDetail = ({ examId }: IExamDetail) => {
  const { data: exam, isLoading } = useGetUserExamDetail(examId);

  return (
    <Flex w={"70%"} flexDirection={"column"} my={"30px"}>
      <Box
        mb={"15px"}
        p={"15px"}
        backgroundColor={"white"}
        borderRadius={"10px"}
        borderBottom={`1px solid ${theme.colors.borderColor}`}
      >
        {isLoading ? (
          <Center h="200px">
            <Spinner mx="auto" speed="0.65s" thickness="3px" size="xl" />
          </Center>
        ) : !exam ? (
          <UserNotFound />
        ) : (
          <Box>
            <Box fontSize={"25px"} fontWeight={"700"} p={"8px"}>
              {exam?.name ?? ""}
            </Box>
            <Tabs variant="soft-rounded" isLazy={true}>
              <TabList>
                <Tab _selected={{ color: "blue.600", bg: "#e8f2ff" }}>
                  Thông tin đề thi
                </Tab>
                <Tab _selected={{ color: "blue.600", bg: "#e8f2ff" }}>
                  Đáp án
                </Tab>
              </TabList>
              <TabPanels>
                <TabPanel className={styles.panel} px={"0px"} pb={"0px"}>
                  <DetailPanel exam={exam as IUserExamDetail} />
                </TabPanel>
                <TabPanel className={styles.panel} px={"0px"} pb={"0px"}>
                  <Box>
                    <NavLink
                      my={"10px"}
                      pl={"0px"}
                      to="/register"
                      text="Xem đáp án đề thi"
                    />
                    <Box my={"10px"}>Xem đáp án các phần thi</Box>
                    <UnorderedList my={"10px"} pl={"20px"}>
                      {exam?.parts.map((item) => {
                        return (
                          <ListItem>
                            <Flex alignItems={"center"}>
                              <Box>Part {item.order_in_test}</Box>
                              <NavLink to="/register" text="Đáp án" />
                            </Flex>
                          </ListItem>
                        );
                      })}
                    </UnorderedList>
                  </Box>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        )}
      </Box>

      <Box
        p={"15px"}
        backgroundColor={"white"}
        borderRadius={"10px"}
        borderBottom={`1px solid ${theme.colors.borderColor}`}
      >
        <Flex>
          <TextAreaField size={"sm"} />
          <Button
            mt="14px"
            _hover={{ background: "blue.800" }}
            background="blue.600"
            color="white"
          >
            Gửi
          </Button>
        </Flex>
        <VStack>
          <Flex my={"10px"}>
            <Box w={"50px"} display={"contents"} mx={"10px"}>
              <Image
                boxSize="50px"
                src={getImage("users/1", "defaultAvatar.png")}
                alt="User Avatar"
                mx={"auto"}
                borderRadius={"full"}
              />
            </Box>
            <Box>
              <Flex>
                <Text fontWeight={"700"}>Random name</Text>
                <Text ml={"10px"}>20/11/2023</Text>
              </Flex>
              <Box>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero
                nostrum, ipsam fugiat atque sequi quasi beatae quaerat explicabo
                unde mollitia quas repellat officiis reiciendis ea in incidunt
                ab, soluta asperiores.
              </Box>
            </Box>
          </Flex>
        </VStack>
      </Box>
    </Flex>
  );
};

export default ExamDetail;
