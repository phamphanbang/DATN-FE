import { Text } from "@chakra-ui/react";
import { ExamAnswer } from "models/exam";

interface IAnswer {
  answer: ExamAnswer;
  questionId: string;
}

const AnswerHistory = ({
  answer,
  questionId,
  ...inputProps
}: IAnswer) => {
  const textStyle = (): React.CSSProperties => {
    if (answer.is_right) {
      return {
        backgroundColor: "#ddfbe1",
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
        checked={answer.is_right}
      />
      <Text style={textStyle()}>{answer.answer}</Text>
    </label>
  );
};

export default AnswerHistory;
