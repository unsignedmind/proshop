import React from 'react';
import { Spinner } from 'react-bootstrap';
import './loader-styles.scss';

const LoaderView = () => {
	return (
		<Spinner animation='border' role='status' className='loader__spinner'>
			<span className='loader__screen-reader-only'>Loading...</span>
		</Spinner>
	);
};

export default LoaderView;
