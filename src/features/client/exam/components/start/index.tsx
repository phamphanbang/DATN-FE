import {
  Box,
  Button,
  Flex,
  Skeleton,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import {
  useUserGetExamForTest,
  useUserSubmitExam,
} from "api/apiHooks/examHook";
import styles from "./style.module.scss";
import { useNavigate } from "react-router-dom";
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
import { useEffect, useRef, useState } from "react";
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
  const [answer, setAnswer] = useState<IExamPartRequest[]>([]);
  const [partIndex, setPartIndex] = useState<number>(0);
  // const [duration, setDuration] = useState<string>("");
  const startDate = useRef(Date.now());
  let duration = useRef<string>("");
  let def = useRef<string>("");
  const [submit, setSubmit] = useState<IExamRequest>();
  const { mutateAsync: submitExam } = useUserSubmitExam(
    examId,
    submit as IExamRequest
  );

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

  const defaultAnswer = (data: IUserExamForTest): IExamPartRequest[] => {
    return data.parts.map((item) => {
      const answers: IExamAnswerRequest[] = [];
      if (item.has_group_question) {
        item.groups?.forEach((group) => {
          group.questions.forEach((question) => {
            answers.push({
              question_id: question.id,
              answer_id: "",
              is_right: false,
            });
          });
        });
      } else {
        item.questions?.forEach((question) => {
          answers.push({
            question_id: question.id,
            answer_id: "",
            is_right: false,
          });
        });
      }
      return {
        part_id: item.id,
        part_type: item.part_type,
        order_in_test: item.order_in_test,
        answers: answers,
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
    const defaultSubmit: IExamRequest = {
      duration: exam.duration,
      test_type: "fulltest",
      exam_type: exam.exam_type,
      parts: [...ans],
    };
    setSubmit(defaultSubmit);
    def.current = exam.duration;
  };

  const setTime = (time: string) => {
    const t = parseInt(time) * 60 * 1000;
    return startDate.current + t;
  };

  const getDuration = () => {
    const pad = (n: number) => (n < 10 ? `0${n}` : n);
    const total = parseInt(exam?.duration ?? "0") * 60 * 1000;
    const time = parseInt(duration.current ?? "0");
    const dur = total - time;
    const hours = Math.floor(dur / (1000 * 60 * 60));
    const minutes = Math.floor((dur % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((dur % (1000 * 60)) / 1000);
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  };

  const onAnswerSelect = (
    question_id: string,
    answer_id: string,
    is_right: boolean
  ) => {
    const el = document.querySelector("#navButton_" + question_id);
    if(el) {
      el.classList.add('question_answered');
    }
    const newAnswer = [...answer];
    const obj = newAnswer[partIndex].answers.find(
      (item) => item.question_id === question_id
    );
    if (obj) {
      obj.answer_id = answer_id;
      obj.is_right = is_right;
    }
    setAnswer(answer);
  };

  const rendererCountdown = ({
    hours,
    minutes,
    seconds,
    completed,
  }: CountdownRenderProps) => {
    const pad = (n: number) => (n < 10 ? `0${n}` : n);
    if (completed) {
      onSubmit();
    }
    return (
      <Box fontWeight={"700"} fontSize={"24px"}>
        {pad(hours)}:{pad(minutes)}:{pad(seconds)}
      </Box>
    );
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
    if(submit) {
      const finalSubmit : IExamRequest = { ...submit };
      finalSubmit.parts = [...answer];
      finalSubmit.duration = getDuration();
      // console.log(getDuration());
      setSubmit(finalSubmit);
    }
    
    try {
      const { history_id } = await submitExam();
      navigate("/exams/" + examId + "/history/" + history_id);
    } catch (e) {
      toast({
        description: "Đã có lỗi xảy ra trong hệ thống",
        status: "error",
      });
    }
  };

  const onSubmitButton = () => {
    onSubmit();
  };

  return (
    <Box mt={"10px"} w={"100%"}>
      <ExamTitle
        to={"/exams/" + examId}
        isLoaded={isSuccess}
        title={exam?.name ?? ""}
        buttonTitle="Thoát"
        isConfirm={true}
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
                return item.has_group_question ? (
                  <TabPanel key={"part_" + item.id}>
                    {item.groups?.map((group) => {
                      return (
                        <Group
                          key={'group_'+group.id}
                          partType={item.part_type}
                          examId={examId}
                          group={group}
                          onAnswerSelect={onAnswerSelect}
                          showAudio={false}
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
                          showAudio={false}
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
          <Box>Thời gian còn lại:</Box>
          <Skeleton h={"30px"} isLoaded={exam?.duration ? true : false}>
            <Countdown
              date={setTime(exam?.duration as string)}
              renderer={rendererCountdown}
              onTick={(e) => (duration.current = e.total.toString())}
            />
          </Skeleton>

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

export default ExamStart;
