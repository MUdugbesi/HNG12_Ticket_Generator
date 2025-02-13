import React from 'react';

const MessageHandler = ({ userMessage, className }) => {
	if (!userMessage) return null;
	const { type, message } = userMessage;
	return (
		<p
			className={`absolute mt-2 ${
				type === 'error' ? 'text-red-500' : 'text-green-500'
			} ${className ? className : 'text-sm right-6 md:right-4 top-4 md:top-0'}`}
			aria-live='assertive'
		>
			{type === 'error' ? `❗️${message}` : `✅ ${message}`}
		</p>
	);
};

export default MessageHandler;
