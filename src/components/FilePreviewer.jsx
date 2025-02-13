import React, { useState, useEffect } from 'react';


const FilePreview = ({ file, width, height }) => {
	const [fileUrl, setFileUrl] = useState(null);

	useEffect(() => {
		if (file) {
			const url = URL.createObjectURL(file);
			setFileUrl(url);
			return () => URL.revokeObjectURL(url);
		} else {
			setFileUrl(null);
		}
	}, [file]);

	return (
		<div className='w-full h-full flex items-center justify-center'>
			{fileUrl && (
				<img
					src={fileUrl}
					alt={file?.name || 'Preview'}
					width={width}
					height={height}
					className={`w-full h-full object-cover object-top rounded-[32px]`}
				/>
			)}
		</div>
	);
};

export default FilePreview;
