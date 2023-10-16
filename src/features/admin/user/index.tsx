// import { useRequestTemplates } from 'api/apiHooks/requestHooks';
import Page from 'common/components/Page';
import { MyUserTable } from './components/MyUserTable';
// import { RequestTemplateTable } from './components/RequestTemplateTable';

const Users = () => {
  // const { data, isLoading } = useRequestTemplates();

  return (
    <Page>
      <Page.Header>
        <Page.HeaderLeft>
          <Page.Heading>User Manager</Page.Heading>
        </Page.HeaderLeft>
      </Page.Header>
      <Page.Body>
        <MyUserTable />
      </Page.Body>
    </Page>
  );
};

export default Users;
