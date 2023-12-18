import { Box, Center, Flex, Image, Spinner, Text } from "@chakra-ui/react";
import UserNotFound from "features/client/notFound/UserNotFound";
import CommentSection from "common/usercomponents/CommentSection";
import { useUserGetBlogDetail } from "api/apiHooks/blogHooks";
import parse from "html-react-parser";
import { getImage } from "utils";
import "./style.css";
import { useEffect, useState } from "react";
import { NavLink } from "common/usercomponents/NavLink";

interface IBlogDetail {
  blogId: string;
}

interface INav {
  id: string;
  content: string;
}

const BlogDetail = ({ blogId }: IBlogDetail) => {
  const { data: blog, isLoading } = useUserGetBlogDetail(blogId);
  const [nav, setNav] = useState<INav[]>([]);

  useEffect(() => {
    const el = document
      .querySelector("#blog_content")
      ?.getElementsByTagName("h2");
    const newNav: INav[] = [];
    if (el) {
      const length = el?.length;
      for (let i = 0; i < length; i++) {
        el[i].setAttribute("id", "title_" + i);
        el[i].setAttribute("class", "scroll");
        newNav.push({
          id: "title_" + i,
          content: el[i].innerText,
        });
      }
      setNav(newNav);
    }
  }, [isLoading]);

  const onClick = (id: string) => {
    const el = document.querySelector("#" + id);
    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };
  return (
    <Flex w={"80%"} flexDirection={"column"} my={"30px"}>
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
        ) : !blog ? (
          <UserNotFound />
        ) : (
          <Box>
            <Flex gap={"10px"} alignItems={"center"}>
              <NavLink p={"0px"} m={"0px"} to="/" text="Trang chủ" />
              <Text m={"0px"}>/</Text>
              <NavLink p={"0px"} m={"0px"} to="/blogs" text="Bài viết" />
              <Text m={"0px"}>/</Text>
              <Text m={"0px"}>{blog.name}</Text>
            </Flex>
            <Text fontSize={"30px"} fontWeight={"600"} my={"20px"}>
              {blog.name}
            </Text>
            <Text fontSize={"20px"} fontWeight={"500"} my={"20px"}>
              {blog.description}
            </Text>
            <Image
              src={getImage("blogs/" + blogId, blog.thumbnail)}
              alt="Blog thumbnail"
              mx={"auto"}
              my={"20px"}
            />
            <Box
              p={"10px"}
              borderRadius={"10px"}
              border={`1px solid #c7c7c7`}
              my={"10px"}
            >
              <Text fontSize={"22px"} fontWeight={"600"} mb={"10px"}>
                Table of contents
              </Text>
              {nav.map((item, index) => {
                return (
                  <NavLink
                    key={"nav_" + index}
                    text={item.content}
                    to={"#" + item.id}
                    display={"block"}
                    onClick={() => onClick(item.id)}
                  />
                );
              })}
            </Box>
            <Box id="blog_content">{parse(blog.post)}</Box>
          </Box>
        )}
      </Box>

      <CommentSection comment_id={blogId} comment_type="blog" />
    </Flex>
  );
};

export default BlogDetail;
