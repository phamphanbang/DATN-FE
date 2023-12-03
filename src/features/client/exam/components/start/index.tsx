import {
  Box,
  Button,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import {
  useUserGetExamForTest, useUserSubmitExam,
} from "api/apiHooks/examHook";
import styles from "./style.module.scss";
import { useNavigate } from 'react-router-dom';
import theme from "themes/theme";
import {
  IExamAnswerRequest,
  IExamNavigate,
  IExamNavigateQuestion,
  IExamPartRequest,
  IExamRequest,
  IUserExamForTest,
  IUserGetExamRequest,
} from "models/exam";
import { useEffect, useState } from "react";
import ExamTitle from "../common/ExamTitle";
import Group from "../common/Group";
import Question from "../common/Question";
import NavPart from "../common/NavPart";
import Countdown, { CountdownRenderProps } from "react-countdown";
import { toast } from "common/components/StandaloneToast";

interface IExamStart {
  examId: string;
}

const ExamStart = ({ examId }: IExamStart) => {
  const navigate = useNavigate();
  const { mutateAsync, isSuccess } = useUserGetExamForTest(examId);
  const [exam, setExam] = useState<IUserExamForTest>();
  const [examNavigate, setExamNavigate] = useState<IExamNavigate[]>();
  const [answer,setAnswer] = useState<IExamPartRequest[]>([]);
  const [partIndex, setPartIndex] = useState<number>(0);
  const [submit,setSubmit] = useState<IExamRequest>();
  const {mutateAsync : submitExam} = useUserSubmitExam(examId,submit as IExamRequest);

  const newNavigate = (data : IUserExamForTest): IExamNavigate[] => {
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

  const defaultAnswer = (data : IUserExamForTest): IExamPartRequest[] => {
    return data.parts.map((item) => {
      const answers: IExamAnswerRequest[] = [];
      if (item.has_group_question) {
        item.groups?.forEach((group) => {
          group.questions.forEach((question) => {
            answers.push({
              question_id: question.id,
              answer_id: "",
              is_right: false
            });
          });
        });
      } else {
        item.questions?.forEach((question) => {
          answers.push({
            question_id: question.id,
            answer_id: "",
            is_right: false
          });
        });
      }
      return {
        part_id: item.id,
        part_type: item.part_type,
        answers: answers
      };
    });
  };

  const getExamData = async () => {
    const params: IUserGetExamRequest = {};
    const exam = await mutateAsync(params);
    setExam(exam);
    const nav: IExamNavigate[] = newNavigate(exam);
    setExamNavigate(nav);
    const ans = defaultAnswer(exam);
    setAnswer(ans);
    const defaultSubmit : IExamRequest = {
      duration: exam.duration,
      test_type: 'fulltest',
      parts: [...ans]
    }
    setSubmit(defaultSubmit);
  };

  const onAnswerSelect = (question_id:string,answer_id:string,is_right:boolean) => {
    const newAnswer = [...answer];
    const obj = newAnswer[partIndex].answers.find((item) => item.question_id === question_id);
    if(obj) {
      console.log(answer_id)
      obj.answer_id = answer_id;
      obj.is_right = is_right;
    }
    setAnswer(answer);
  }

  const rendererCountdown = ({
    hours,
    minutes,
    seconds,
    completed,
  }: CountdownRenderProps) => {
    if (completed) {
      console.log("done");
    }
    const pad = (n: number) => (n < 10 ? `0${n}` : n);
    return (
      <Box fontWeight={"700"} fontSize={"24px"}>
        {pad(hours)}:{pad(minutes)}:{pad(seconds)}
      </Box>
    );
  };

  const onNavigateClick = (index: number, id: string) => {
    const el = document.querySelector("#questions_" + id);
    if (el) {
      setPartIndex(index - 1);
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

  // useEffect(() => {
  //   const handleBeforeUnload = (event: BeforeUnloadEvent): string => {
  //     const message = "Are you sure you want to leave? Your changes may not be saved.";
  //     event.returnValue = message;
  //     return message;
  //   };
  //   window.addEventListener('beforeunload', handleBeforeUnload);
  //   return () => {
  //     window.removeEventListener('beforeunload', handleBeforeUnload);
  //   };
  // }, []);

  const onSubmit = async () => {
    const finalSubmit = {...submit};
    finalSubmit.parts = [...answer];
    try {
      const {history_id} = await submitExam();
      navigate('/exams/'+examId+'/history/'+history_id);
    } catch (e) {
      toast({
        description: "Đã có lỗi xảy ra trong hệ thống",
        status: "error",
      });
    }
  }

  const onSubmitButton = () => {
    onSubmit();
  }

  return (
    <Box mt={"10px"} w={"100%"}>
      <ExamTitle
        examId={examId}
        isLoaded={isSuccess}
        title={exam?.name ?? ""}
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
                        <Group
                          partType={item.part_type}
                          examId={examId}
                          group={group}
                          onAnswerSelect={onAnswerSelect}
                        />
                      );
                    })}
                  </TabPanel>
                ) : (
                  <TabPanel key={"part_" + item.id}>
                    {item.questions?.map((question) => {
                      return (
                        <Question
                          id={"questions_" + question.id}
                          examId={examId}
                          question={question}
                          onAnswerSelect={onAnswerSelect}
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
          <Box>Thời gian còn lại:</Box>
          <Countdown date={Date.now() + 10000} renderer={rendererCountdown} />
          <Button
            mt={"10px"}
            w={"100%"}
            color={"#2b6cb0"}
            border={"1px solid #2b6cb0"}
            _hover={{
              border: "1px solid #2b6cb0",
              backgroundColor: "#2b6cb0",
              color: "white",
            }}
            onClick={() => onSubmitButton()}
          >
            Nộp Bài
          </Button>
          {examNavigate?.map((item, index) => {
            return (
              <NavPart
                key={"navpart_" + index}
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

export default ExamStart;
