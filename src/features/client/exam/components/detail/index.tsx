import {
  Box,
  Center,
  Flex,
  ListItem,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  UnorderedList,
} from "@chakra-ui/react";
import { useGetUserExamDetail } from "api/apiHooks/examHook";
import styles from "./style.module.scss";
import DetailPanel from "./DetailPanel";
import { IUserExamDetail } from "models/exam";
import { NavLink } from "common/usercomponents/NavLink";
import { FaCheckCircle } from "react-icons/fa";
import UserNotFound from "features/client/notFound/UserNotFound";
import CommentSection from "common/usercomponents/CommentSection";
import { getItem } from "utils";
import { LocalStorageKeys } from "common/enums";
import TestPanel from "./TestPanel";

interface IExamDetail {
  examId: string;
}

const ExamDetail = ({ examId }: IExamDetail) => {
  const user_id = getItem(LocalStorageKeys.id) ?? "";
  const { data: exam, isLoading } = useGetUserExamDetail(examId, user_id);

  const practicePanel = () => {
    return (
      <Tabs variant="soft-rounded" isLazy={true}>
        <TabList>
          <Tab _selected={{ color: "blue.600", bg: "#e8f2ff" }}>
            Thông tin đề thi
          </Tab>
          <Tab _selected={{ color: "blue.600", bg: "#e8f2ff" }}>Đáp án</Tab>
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
                to={"/exams/" + examId + "/solution"}
                text="Xem đáp án đề thi"
              />
              <Box my={"10px"}>Xem đáp án các phần thi</Box>
              <UnorderedList my={"10px"} pl={"20px"}>
                {exam?.parts.map((item) => {
                  return (
                    <ListItem>
                      <Flex alignItems={"center"}>
                        <Box>Part {item.order_in_test}</Box>
                        <NavLink
                          to={
                            "/exams/" +
                            examId +
                            "/part/" +
                            item.order_in_test +
                            "/solution"
                          }
                          text="Đáp án"
                        />
                      </Flex>
                    </ListItem>
                  );
                })}
              </UnorderedList>
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>
    );
  };

  const testPanel = () => {
    return (
      <Tabs variant="soft-rounded" isLazy={true}>
        <TabList>
          <Tab _selected={{ color: "blue.600", bg: "#e8f2ff" }}>
            Thông tin đề thi
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel className={styles.panel} px={"0px"} pb={"0px"}>
            <TestPanel exam={exam as IUserExamDetail} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    );
  };

  return (
    <Flex w={"70%"} flexDirection={"column"} my={"30px"}>
      <Box
        mb={"15px"}
        p={"15px"}
        backgroundColor={"white"}
        borderRadius={"10px"}
        border={`1px solid #c7c7c7`}
      >
        {isLoading ? (
          <Center h="200px">
            <Spinner mx="auto" speed="0.65s" thickness="3px" size="xl" />
          </Center>
        ) : !exam ? (
          <UserNotFound />
        ) : (
          <Box>
            <Flex alignItems={"center"}>
              <Box fontSize={"25px"} fontWeight={"700"} p={"8px"}>
                {exam?.name ?? ""}
              </Box>
              {exam.histories.length > 0 && (
                <Box
                  fontSize={"25px"}
                  fontWeight={"700"}
                  p={"8px"}
                  color={"#3cb46e"}
                >
                  <FaCheckCircle />
                </Box>
              )}
            </Flex>

            {/* <Tabs variant="soft-rounded" isLazy={true}>
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
                      to={"/exams/" + examId + "/solution"}
                      text="Xem đáp án đề thi"
                    />
                    <Box my={"10px"}>Xem đáp án các phần thi</Box>
                    <UnorderedList my={"10px"} pl={"20px"}>
                      {exam?.parts.map((item) => {
                        return (
                          <ListItem>
                            <Flex alignItems={"center"}>
                              <Box>Part {item.order_in_test}</Box>
                              <NavLink
                                to={
                                  "/exams/" +
                                  examId +
                                  "/part/" +
                                  item.order_in_test +
                                  "/solution"
                                }
                                text="Đáp án"
                              />
                            </Flex>
                          </ListItem>
                        );
                      })}
                    </UnorderedList>
                  </Box>
                </TabPanel>
              </TabPanels>
            </Tabs> */}
            {exam.type == "practice" ? practicePanel() : testPanel()}
          </Box>
        )}
      </Box>

      <CommentSection comment_id={examId} comment_type="exams" />
    </Flex>
  );
};

export default ExamDetail;
