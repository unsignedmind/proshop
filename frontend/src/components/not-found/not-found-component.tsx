import React from 'react';
import { Link } from 'react-router-dom';

interface Props {}

const NotFound:React.FC<Props> = () => {
  return (
    <>
      <h1>404</h1>
      <h2>Ooops! Something went wrong.</h2>
      <Link to={'/'} className={'btn btn-dark my-3'}>Back to Homepage</Link>
    </>
  );
};

export default NotFound;
