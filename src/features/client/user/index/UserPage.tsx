import {
  Box,
  Center,
  Flex,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { LocalStorageKeys } from "common/enums";
import { useEffect, useState } from "react";
import { getItem } from "utils";
import { useNavigate } from "react-router-dom";
import HistoryPanel from "./HistoryPanel";
import UserUpdatePanel from "./UserUpdatePanel";
import ChangePassword from "./ChangePassword";

interface IUserIndexPage {}

const UserIndexPage = ({}: IUserIndexPage) => {
  const navigate = useNavigate();
  const id = getItem(LocalStorageKeys.id);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    if (!id) navigate("/notFound");
    setIsLoading(false);
  }, []);
  

  

  return (
    <Flex w={"70%"} flexDirection={"column"} my={"30px"}>
      <Box
        mb={"15px"}
        p={"15px"}
        backgroundColor={"white"}
        borderRadius={"10px"}
        border={`1px solid #c7c7c7`}
      >
        {isLoading ? (
          <Center h="200px">
            <Spinner mx="auto" speed="0.65s" thickness="3px" size="xl" />
          </Center>
        ) : (
          <Tabs>
            <TabList>
              <Tab>Kết quả luyện thi</Tab>
              <Tab>Thông tin cơ bản</Tab>
              <Tab>Thay đổi mật khẩu</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <HistoryPanel userId={id ?? ""}/>
              </TabPanel>
              <TabPanel>
                <UserUpdatePanel userId={id ?? ""} />
              </TabPanel>
              <TabPanel>
                <ChangePassword userId={id ?? ""}/>
              </TabPanel>
            </TabPanels>
          </Tabs>
        )}
      </Box>
    </Flex>
  );
};

export default UserIndexPage;
