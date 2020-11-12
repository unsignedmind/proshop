import React from 'react';
import './message-styles.scss';

interface Props {
	variant?: string;
	children: any;
}

const MessageView: React.FC<Props> = ({ variant = 'message--info', children }) => {
	return <div className={`message ${variant}`}>{children}</div>;
};

export default MessageView;
