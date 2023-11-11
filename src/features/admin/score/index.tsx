import Page from 'common/components/Page';
import { MyScoreTable } from './components/MyScoreTable';

const Scores = () => {

  return (
    <Page>
      <Page.Header>
        <Page.HeaderLeft>
          <Page.Heading>Score Manager</Page.Heading>
        </Page.HeaderLeft>
      </Page.Header>
      <Page.Body>
        <MyScoreTable />
      </Page.Body>
    </Page>
  );
};

export default Scores;
