import { Radio, RadioProps } from "@chakra-ui/react";
import { ExamAnswer } from "models/exam";

interface IAnswer extends RadioProps {
  answer: ExamAnswer;
  questionId: string;
  onAnswerSelect: (question_id:string,answer_id:string,is_right:boolean) => void;
}

const Answer = ({ answer,questionId,onAnswerSelect ,...inputProps }: IAnswer) => {
  return (
    // <Radio
    //   {...inputProps}
    //   value={answer.id}
    //   // onChange={(e) => onRadioChange(e.target.value)}
    //   onChange={(e) => console.log(e.target.value)}
    // >
    //   {answer.answer}
    // </Radio>
    <label htmlFor={"answers_" + answer.id} style={{
      display: 'flex',
      alignItems: 'center',
      width: '50%'
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
