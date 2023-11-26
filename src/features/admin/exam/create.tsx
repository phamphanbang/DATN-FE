import Page from "common/components/Page";
import { Box, Button } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { MdArrowBackIosNew } from "react-icons/md";
import ExamCreateForm from "./components/create/ExamCreateForm";

const CreateNewExam = () => {
  const navigate = useNavigate();
  const { id } = useParams();

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
              <p>Create New Exam</p>
            </div>
          </Page.Heading>
        </Page.HeaderLeft>
      </Page.Header>
      <Page.Body>
        <ExamCreateForm templateId={id as string}/>
      </Page.Body>
    </Page>
  );
};

export default CreateNewExam;
