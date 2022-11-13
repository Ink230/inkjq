import type { NextPage } from 'next';
import { Layout, Main } from '../components';

const title: string = 'Ink JQ';

const Home: NextPage = () => {
  return (
    <Layout _home={true} _pageTitle={title}>
      <Main></Main>
    </Layout>
  );
};

export default Home;
