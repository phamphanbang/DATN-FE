import { Flex, Skeleton, Text, Button } from "@chakra-ui/react";
import { ModalConfirm } from "common/components/ModalConfirm";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface IExamTitle {
  isLoaded: boolean;
  title: string;
  buttonTitle: string;
  isConfirm: boolean;
  to: string;
}

const ExamTitle = ({ isLoaded, title,isConfirm,buttonTitle,to }: IExamTitle) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleConfirmation = async () => {
    setIsOpen(false);
    navigate(to);
  };

  const onClick = () => {
    if(isConfirm) {
      setIsOpen(true);
      return;
    }
    navigate(to);
  }
 
  return (
    <Flex alignItems={"center"} justifyContent={"center"}>
      <Skeleton minWidth={"100px"} isLoaded={isLoaded}>
        <Text fontSize={"25px"} fontWeight={"700"} p={"8px"}>
          {title}
        </Text>
      </Skeleton>
      <Button
        ml={"10px"}
        border={"1px solid #2b6cb0"}
        backgroundColor={"white"}
        color={"#2b6cb0"}
        _hover={{
          border: "1px solid #2b6cb0",
          backgroundColor: "#2b6cb0",
          color: "white",
        }}
        onClick={() => onClick()}
      >
        {buttonTitle}
      </Button>
      <ModalConfirm
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={handleConfirmation}
        title={"Bạn có muốn thoát khỏi bài thi ?"}
        description={"Lưu ý quá trình làm bài của bạn sẽ không được lưu"}
      />
    </Flex>
  );
};

export default ExamTitle;
