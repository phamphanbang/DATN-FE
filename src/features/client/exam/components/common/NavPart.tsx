import { Box, Flex } from "@chakra-ui/react";
import { IExamNavigate } from "models/exam";
import NavButton from "./NavButton";

interface INavPart {
  navPart: IExamNavigate;
  onNavigateClick: (index: number, id: string) => void;
}

const NavPart = ({ navPart,onNavigateClick }: INavPart) => {
  return (
    <Box p={"10px"}>
      <Box fontWeight={"600"} my={"10px"}>
        Part {navPart.part}
      </Box>
      <Flex wrap={"wrap"} gap={"10px"}>
        {navPart.questions.map((question) => {
          return (
            <NavButton
              key={"navbutton_" + question.id}
              partIndex={navPart.part}
              question={question}
              onNavigateClick={onNavigateClick}
            />
          );
        })}
      </Flex>
    </Box>
  );
};

export default NavPart;
