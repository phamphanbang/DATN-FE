import Page from "common/components/Page";
import { MyExamTable } from "./components/MyExamTable";

const Exam = () => {

  return (
    <Page>
      <Page.Header>
        <Page.HeaderLeft>
          <Page.Heading>Exam Manager</Page.Heading>
        </Page.HeaderLeft>
      </Page.Header>
      <Page.Body>
        <MyExamTable />
      </Page.Body>
    </Page>
  );
};

export default Exam;
