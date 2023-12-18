import {
  Box,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { useGetHistoryDetail } from "api/apiHooks/examHook";
import styles from "./style.module.scss";
import theme from "themes/theme";
import {
  ExamHistoryDetail,
  IExamHistoryNavigate,
  IExamHistoryNavigateQuestion,
  IExamNavigate,
  IExamNavigateQuestion,
} from "models/exam";
import { useEffect, useState } from "react";
import ExamTitle from "../common/ExamTitle";
import NavPart from "../common/NavPart";
import GroupHistory from "../common/history/GroupHistory";
import QuestionHistory from "../common/history/QuestionHistory";
import HistoryNavPart from "../common/HistoryNavPart";

interface IExamStart {
  examId: string;
  historyId: string;
}

const HistoryDetail = ({ examId, historyId }: IExamStart) => {
  const [partIndex, setPartIndex] = useState<number>(0);
  const [examNavigate, setExamNavigate] = useState<IExamHistoryNavigate[]>();

  const { data: exam, isLoading } = useGetHistoryDetail(examId, historyId);

  const newNavigate = (data: ExamHistoryDetail): IExamHistoryNavigate[] => {
    return data.parts.map((item) => {
      const questions: IExamHistoryNavigateQuestion[] = [];
      if (item.groups) {
        item.groups?.forEach((group) => {
          group.questions.forEach((question) => {
            questions.push({
              id: question.id,
              order_in_test: question.order_in_test,
              is_right: question.is_right
            });
          });
        });
      } else {
        item.questions?.forEach((question) => {
          questions.push({
            id: question.id,
            order_in_test: question.order_in_test,
            is_right: question.is_right
          });
        });
      }
      return {
        part: item.order_in_test,
        questions: questions,
      };
    });
  };

  const getExamData = async () => {
    const nav: IExamNavigate[] = newNavigate(exam as ExamHistoryDetail);
    setExamNavigate(nav);
  };

  const onNavigateClick = (index: number, id: string) => {
    const el = document.querySelector("#questions_" + id);
    if (el) {
      setPartIndex(index);
      el.classList.add(styles["question-hightlight"]);
      el.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      setTimeout(function () {
        el.classList.remove(styles["question-hightlight"]);
      }, 2000);
    }
  };

  useEffect(() => {
    getExamData();
  }, [isLoading]);

  return (
    <Box mt={"10px"} w={"100%"} >
      <ExamTitle
        to={"/exams/" + examId + "/history/" + historyId}
        isLoaded={exam ? true : false}
        title={exam?.name ?? ""}
        buttonTitle="Quay về trang kết quả"
        isConfirm={false}
      />

      <Flex>
        <Box
          w={"80%"}
          flexDirection={"column"}
          m={"15px"}
          backgroundColor={"white"}
          borderRadius={"10px"}
          border={`1px solid #c7c7c7`}
          p={"15px"}
        >
          <audio
            controls
            src={exam?.audio}
            preload="none"
            style={{
              width: "100%",
              padding: "0px 14px",
            }}
          ></audio>
          <Tabs
            variant="soft-rounded"
            mt={"30px"}
            index={partIndex}
            onChange={(index) => setPartIndex(index)}
          >
            <TabList>
              {exam?.parts.map((item) => {
                return <Tab>Part {item.order_in_test}</Tab>;
              })}
            </TabList>

            <TabPanels>
              {exam?.parts.map((item) => {
                return item.groups ? (
                  <TabPanel key={"part_" + item.id}>
                    {item.groups?.map((group) => {
                      return (
                        <GroupHistory
                          partType={item.part_type}
                          examId={examId}
                          group={group}
                        />
                      );
                    })}
                  </TabPanel>
                ) : (
                  <TabPanel key={"part_" + item.id}>
                    {item.questions?.map((question) => {
                      return (
                        <QuestionHistory
                          id={"questions_" + question.id}
                          examId={examId}
                          question={question}
                        />
                      );
                    })}
                  </TabPanel>
                );
              })}
            </TabPanels>
          </Tabs>
        </Box>

        <Box
          w={"18%"}
          flexDirection={"column"}
          m={"15px"}
          backgroundColor={"white"}
          borderRadius={"10px"}
          border={`1px solid #c7c7c7`}
          p={"15px"}
          h={"fit-content"}
        >
          {examNavigate?.map((item, index) => {
            return (
              <HistoryNavPart
                key={"navpart_" + index}
                partIndex={index}
                onNavigateClick={onNavigateClick}
                navPart={item}
              />
            );
          })}
        </Box>
      </Flex>
    </Box>
  );
};

export default HistoryDetail;
