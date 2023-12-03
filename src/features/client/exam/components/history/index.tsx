import {
  Box,
  Button,
  Center,
  Flex,
  Spinner,
} from "@chakra-ui/react";
import {
  useGetHistoryDetail,
} from "api/apiHooks/examHook";
import theme from "themes/theme";
import { useEffect } from "react";
import UserNotFound from "features/client/notFound/UserNotFound";
import HistoryInfo from "./HistoryInfo";
import HistoryAnswer from "./HistoryAnswer";

interface IExamDetail {
  examId: string;
  historyId: string;
}

const HistoryDetail = ({ examId, historyId }: IExamDetail) => {
  const { data, isLoading, error, status } = useGetHistoryDetail(
    examId,
    historyId
  );

  useEffect(() => {
    console.log(data);
  }, [isLoading]);

  return (
    <Flex w={"70%"} flexDirection={"column"} my={"30px"}>
      <Box
        mb={"15px"}
        p={"15px"}
        backgroundColor={"white"}
        borderRadius={"10px"}
        borderBottom={`1px solid ${theme.colors.borderColor}`}
      >
        {isLoading ? (
          <Center h="200px">
            <Spinner mx="auto" speed="0.65s" thickness="3px" size="xl" />
          </Center>
        ) : !data ? (
          <UserNotFound />
        ) : (
          <Box>
            <Flex alignItems={"center"} justifyContent={"space-between"}>
              <Box fontSize={"25px"} fontWeight={"700"} p={"8px"}>
                Kết quả thi : {data?.name ?? ""}
              </Box>
              <Button
                ml={"10px"}
                border={"1px solid #2b6cb0"}
                backgroundColor={"white"}
                color={'#2b6cb0'}
                _hover={{
                  border: "1px solid #2b6cb0",
                  backgroundColor: "#2b6cb0",
                  color: "white",
                }}
              >
                Quay về trang đề thi
              </Button>
            </Flex>
            <HistoryInfo history={data}/>
            <HistoryAnswer history={data}/>
          </Box>
        )}
      </Box>

      {/* <Box
        p={"15px"}
        backgroundColor={"white"}
        borderRadius={"10px"}
        borderBottom={`1px solid ${theme.colors.borderColor}`}
      >
        <Flex>
          <TextAreaField size={"sm"} />
          <Button
            mt="14px"
            _hover={{ background: "blue.800" }}
            background="blue.600"
            color="white"
          >
            Gửi
          </Button>
        </Flex>
        <VStack>
          <Flex my={"10px"}>
            <Box w={"50px"} display={"contents"} mx={"10px"}>
              <Image
                boxSize="50px"
                src={getImage("users/1", "defaultAvatar.png")}
                alt="User Avatar"
                mx={"auto"}
                borderRadius={"full"}
              />
            </Box>
            <Box>
              <Flex>
                <Text fontWeight={"700"}>Random name</Text>
                <Text ml={"10px"}>20/11/2023</Text>
              </Flex>
              <Box>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero
                nostrum, ipsam fugiat atque sequi quasi beatae quaerat explicabo
                unde mollitia quas repellat officiis reiciendis ea in incidunt
                ab, soluta asperiores.
              </Box>
            </Box>
          </Flex>
        </VStack>
      </Box> */}
    </Flex>
  );
};

export default HistoryDetail;
