import React from 'react';

const MessageHandler = ({ userMessage }) => {
	if (!userMessage) return null;
	const { type, message } = userMessage;
	return (
		<p
			className={`absolute right-6 md:right-4 top-4 md:top-0 mt-2 text-sm ${
				type === 'error' ? 'text-red-500' : 'text-green-500'
			}`}
			aria-live='assertive'
		>
			{type === 'error' ? `❗️${message}` : `✅ ${message}`}
		</p>
	);
};

export default MessageHandler;
