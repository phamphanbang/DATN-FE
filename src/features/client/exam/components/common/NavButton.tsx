import { Button } from "@chakra-ui/react";
import { IExamNavigateQuestion } from "models/exam";

interface INavButton {
  question: IExamNavigateQuestion;
  partIndex: number;
  onNavigateClick: (index: number, id: string) => void;
}

const NavButton = ({ question, partIndex, onNavigateClick }: INavButton) => {
  return (
    <Button
      size={"sm"}
      w={"20%"}
      border={"1px solid black"}
      _hover={{
        border: "1px solid #2b6cb0",
        backgroundColor: "#2b6cb0",
        color: "white",
      }}
      onClick={() => onNavigateClick(partIndex, question.id)}
    >
      {question.order_in_test}
    </Button>
  );
};

export default NavButton;
