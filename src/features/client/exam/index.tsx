import { Flex } from "@chakra-ui/react";
import ExamIndexTable from "./components/index";
import SideBar from "./components/SideBar";

const ExamIndexPage = () => {
  return (
    <Flex justifyContent={"center"}>
      <ExamIndexTable />
      <SideBar />
    </Flex>
  );
};

export default ExamIndexPage;
