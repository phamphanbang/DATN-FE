import Page from "common/components/Page";
import BlogCreateForm from "./components/create/BlogCreateForm";
import { Box, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { MdArrowBackIosNew } from "react-icons/md";

const CreateNewBlog = () => {
  const navigate = useNavigate();

  return (
    <Page>
      <Page.Header>
        <Page.HeaderLeft>
          <Page.Heading>
            <div style={{display: "flex" , alignItems: "center"}}>
              <Box mr={"20px"}>
                <Button w={"100%"} onClick={() => navigate(-1)}>
                  <MdArrowBackIosNew />
                </Button>
              </Box>
              <p>Create New Blog</p>
            </div>
          </Page.Heading>
        </Page.HeaderLeft>
      </Page.Header>
      <Page.Body>
        <BlogCreateForm />
      </Page.Body>
    </Page>
  );
};

export default CreateNewBlog;
