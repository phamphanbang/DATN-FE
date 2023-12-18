import { Button } from "@chakra-ui/react";
import { IExamHistoryNavigateQuestion } from "models/exam";

interface INavButton {
  question: IExamHistoryNavigateQuestion;
  partIndex: number;
  onNavigateClick: (index: number, id: string) => void;
}

const HistoryNavButton = ({ question, partIndex, onNavigateClick }: INavButton) => {
  return (
    <Button
      size={"sm"}
      w={"20%"}
      border={"1px solid black"}
      
      style={question.is_right ? {
        backgroundColor: "#ddfbe1",
        borderColor: "#3cb46e"
      } : {
        backgroundColor: "#ffe8e8",
        borderColor: "#e43a45"
      }}
      _hover={{
        border: "1px solid #2b6cb0",
        backgroundColor: "#2b6cb0",
      }}
      id={'navButton_'+question.id}
      onClick={() => onNavigateClick(partIndex, question.id)}
    >
      {question.order_in_test}
    </Button>
  );
};

export default HistoryNavButton;
