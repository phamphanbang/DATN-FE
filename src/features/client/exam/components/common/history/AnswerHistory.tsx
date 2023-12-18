import { Text } from "@chakra-ui/react";
import { ExamAnswer } from "models/exam";

interface IAnswer {
  answer: ExamAnswer;
  questionId: string;
  selectAnswer: string;
}

const AnswerHistory = ({
  answer,
  questionId,
  selectAnswer,
  ...inputProps
}: IAnswer) => {
  const isSelect = selectAnswer == answer.id;
  const textStyle = (): React.CSSProperties => {
    if (isSelect && answer.is_right) {
      return {
        backgroundColor: "#ddfbe1",
      };
    }
    if (isSelect && !answer.is_right) {
      return {
        backgroundColor: "#ffe8e8",
      };
    }
    return {};
  };

  return (
    <label
      htmlFor={"answers_" + answer.id}
      style={{
        display: "flex",
        alignItems: "center",
        width: "50%",
        margin: '10px 0px'
      }}
    >
      <input
        type="radio"
        id={"answers_" + answer.id}
        value={answer.id}
        name={"questions_" + questionId}
        style={{
          marginRight: "10px",
        }}
        disabled={true}
        checked={isSelect}
      />
      <Text style={textStyle()}>{answer.answer}</Text>
    </label>
  );
};

export default AnswerHistory;
