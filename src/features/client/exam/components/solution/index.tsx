import {
  Box,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import {
  useUserGetExamForTest,
} from "api/apiHooks/examHook";
import styles from "./style.module.scss";
import { useNavigate } from "react-router-dom";
import theme from "themes/theme";
import {
  IExamNavigate,
  IExamNavigateQuestion,
  IUserExamForTest,
  IUserGetExamRequest,
} from "models/exam";
import { useEffect, useRef, useState } from "react";
import ExamTitle from "../common/ExamTitle";
import NavPart from "../common/NavPart";
import GroupSolution from "../common/solution/GroupHistory";
import QuestionSolution from "../common/solution/QuestionSolution";

interface IExamStart {
  examId: string;
  part? :string;
}

const ExamSolution = ({ examId,part }: IExamStart) => {
  const navigate = useNavigate();
  const { mutateAsync, isSuccess } = useUserGetExamForTest(examId);
  const [exam, setExam] = useState<IUserExamForTest>();
  const [examNavigate, setExamNavigate] = useState<IExamNavigate[]>();
  const [partIndex, setPartIndex] = useState<number>(0);

  const newNavigate = (data: IUserExamForTest): IExamNavigate[] => {
    return data.parts.map((item) => {
      const questions: IExamNavigateQuestion[] = [];
      if (item.has_group_question) {
        item.groups?.forEach((group) => {
          group.questions.forEach((question) => {
            questions.push({
              id: question.id,
              order_in_test: question.order_in_test,
            });
          });
        });
      } else {
        item.questions?.forEach((question) => {
          questions.push({
            id: question.id,
            order_in_test: question.order_in_test,
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
    const params: IUserGetExamRequest = {};
    if(part) {
      params.part = [part];
    }
    const exam = await mutateAsync(params);
    setExam(exam);
    const nav: IExamNavigate[] = newNavigate(exam);
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
  }, []);


  return (
    <Box mt={"10px"} w={"100%"}>
      <ExamTitle
        to={"/exams/" + examId}
        isLoaded={isSuccess}
        title={exam?.name ?? ""}
        buttonTitle="Quay lại trang đề thi"
        isConfirm={false}
      />

      <Flex>
        <Box
          w={"80%"}
          flexDirection={"column"}
          m={"15px"}
          backgroundColor={"white"}
          borderRadius={"10px"}
          border={`1px solid ${theme.colors.borderColor}`}
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
                return item.has_group_question ? (
                  <TabPanel key={"part_" + item.id}>
                    {item.groups?.map((group) => {
                      return (
                        <GroupSolution
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
                        <QuestionSolution
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
          border={`1px solid ${theme.colors.borderColor}`}
          p={"15px"}
          h={"fit-content"}
        >

          {examNavigate?.map((item, index) => {
            return (
              <NavPart
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

export default ExamSolution;
