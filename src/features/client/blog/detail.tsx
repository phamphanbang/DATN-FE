import { Flex } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import BlogDetail from "./detail/BlogDetail";
import { setItem } from "utils";
import { LocalStorageKeys } from "common/enums";

const BlogDetailPage = () => {
  const { id } = useParams();
  setItem(LocalStorageKeys.prevURL, '/blogs/'+id);
  return (
    <Flex justifyContent={"center"}>
      <BlogDetail blogId={id as string} />
    </Flex>
  );
};

export default BlogDetailPage;