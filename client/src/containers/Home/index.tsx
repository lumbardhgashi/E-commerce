import * as React from 'react';
import useUser from '../../hooks/useUser';

interface IHomeProps {
}

const Home: React.FunctionComponent<IHomeProps> = (props) => {
  const user = useUser()
  return (
    <>
      Home
    </>
  );
};

export default Home;
