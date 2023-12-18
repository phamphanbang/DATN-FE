import { Flex } from "@chakra-ui/react";

import SideBar from "common/usercomponents/SideBar";
import BlogIndexTable from "./index/BlogIndexTable";
import { useSearchParams } from "react-router-dom";
import { setItem } from "utils";
import { LocalStorageKeys } from "common/enums";

const BlogIndexPage = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page") ?? "";
  const search = searchParams.get("search") ?? "";
  setItem(LocalStorageKeys.prevURL, '/blogs');
  return (
    <Flex justifyContent={"center"}>
      <BlogIndexTable page={page} search={search}/>
    </Flex>
  );
};

export default BlogIndexPage;
