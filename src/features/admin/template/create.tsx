import Page from "common/components/Page";
import { Box, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { MdArrowBackIosNew } from "react-icons/md";
import TemplateCreateForm from "./components/create/TemplateCreateForm";

const CreateNewTemplate = () => {
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
              <p>Create New Template</p>
            </div>
          </Page.Heading>
        </Page.HeaderLeft>
      </Page.Header>
      <Page.Body>
        <TemplateCreateForm />
      </Page.Body>
    </Page>
  );
};

export default CreateNewTemplate;
