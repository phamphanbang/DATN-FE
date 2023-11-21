import Page from "common/components/Page";
import { MyTemplateTable } from "./components/MyTemplateTable";

const Template = () => {

  return (
    <Page>
      <Page.Header>
        <Page.HeaderLeft>
          <Page.Heading>Template Manager</Page.Heading>
        </Page.HeaderLeft>
      </Page.Header>
      <Page.Body>
        <MyTemplateTable />
      </Page.Body>
    </Page>
  );
};

export default Template;
