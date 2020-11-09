import React from 'react';
import './message-styles.scss';

interface Props {
	variant: string;
	message: string;
}

const MessageView: React.FC<Props> = ({ variant = 'message--info', message }) => {
	return <div className={`message ${variant}`}>{message}</div>;
};

export default MessageView;
