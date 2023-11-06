// import { useRequestTemplates } from 'api/apiHooks/requestHooks';
import Page from "common/components/Page";
import { MyBlogTable } from "./components/MyBlogTable";
// import { RequestTemplateTable } from './components/RequestTemplateTable';

const Blogs = () => {
  // const { data, isLoading } = useRequestTemplates();

  return (
    <Page>
      <Page.Header>
        <Page.HeaderLeft>
          <Page.Heading>Blog Manager</Page.Heading>
        </Page.HeaderLeft>
      </Page.Header>
      <Page.Body>
        <MyBlogTable />
      </Page.Body>
    </Page>
  );
};

export default Blogs;
