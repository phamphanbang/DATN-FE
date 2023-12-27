import { Radio, RadioProps } from "@chakra-ui/react";
import { ExamAnswer } from "models/exam";

interface IAnswer extends RadioProps {
  answer: ExamAnswer;
  questionId: string;
  onAnswerSelect: (question_id:string,answer_id:string,is_right:boolean) => void;
}

const Answer = ({ answer,questionId,onAnswerSelect ,...inputProps }: IAnswer) => {
  return (
    <label htmlFor={"answers_" + answer.id} style={{
      display: 'flex',
      alignItems: 'center',
    }}>
      <input
        type="radio"
        id={"answers_" + answer.id}
        value={answer.id}
        name={'questions_'+questionId}
        onChange={(e) => onAnswerSelect(questionId,e.target.value,answer.is_right)}
        style={{
          marginRight: '10px'
        }}
      />
      {answer.answer}
    </label>
  );
};

export default Answer;
