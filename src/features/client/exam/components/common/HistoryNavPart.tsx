import { Box, Flex } from "@chakra-ui/react";
import { IExamHistoryNavigate, IExamNavigate } from "models/exam";
import "./navPart.css";
import HistoryNavButton from "./HistoryNavButton";

interface INavPart {
  navPart: IExamHistoryNavigate;
  partIndex: number;
  onNavigateClick: (index: number, id: string) => void;
}

const HistoryNavPart = ({ navPart,onNavigateClick,partIndex }: INavPart) => {
  return (
    <Box p={"10px"} >
      <Box fontWeight={"600"} my={"10px"}>
        Part {navPart.part}
      </Box>
      <Flex wrap={"wrap"} gap={"10px"}>
        {navPart.questions.map((question) => {
          return (
            <HistoryNavButton
              key={"navbutton_" + question.id}
              partIndex={partIndex}
              question={question}
              onNavigateClick={onNavigateClick}
            />
          );
        })}
      </Flex>
    </Box>
  );
};

export default HistoryNavPart;
