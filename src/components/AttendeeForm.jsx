import React, { useCallback, useContext, useEffect, useState } from 'react';
import Header from './Header';
import Input from './Input';
import uploadImg from '../assets/upload.svg';
import changeImg from '../assets/change.svg';
import ProgressLine from './ProgressLine';
import Button from './Button';
import { AuthContext } from '../context/AuthContext';
import FilePreview from './FilePreviewer';
import MessageHandler from './message/MessageHandler';

const AttendeeForm = ({
	message,
	setMessage,
	setIsFirstPage,
	setIsSecondPage,
	setIsLastPage,
	setTicketGenerated,
}) => {
	const { formData, setFormData } = useContext(AuthContext);
	const [userDetails, setUserDetails] = useState({
		fullName: '',
		email: '',
		request: '',
	});

	// cloudinary
	const [imageFile, setImageFile] = useState(null);
	const UPLOAD_NAME = import.meta.env.VITE_CLOUDINARY_NAME;
	const UPLOAD_PRESET = import.meta.env.VITE_UPLOAD_PRESET;

	// form validation
	const [formValidated, setFormValidated] = useState(false);
	const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

	//form submission
	const [isSubmitting, setIsSubmitting] = useState(false);

	useEffect(() => {
		const updatedData = sessionStorage.getItem('formData');
		if (updatedData) {
			try {
				const { fullName, email, request } = JSON.parse(updatedData);
				if (fullName || email || request) {
					setUserDetails({
						fullName,
						email,
						request,
					});
				}
			} catch (e) {
				console.error('Error parsing sessionStorage data:', e);
			}
		}
	}, []);

	const handleFileSelection = (e) => {
		const selectedFile = e.target.files?.[0];
		if (
			selectedFile &&
			(selectedFile.type === 'image/png' ||
				selectedFile.type === 'image/jpg') &&
			selectedFile.size < 2000000
		) {
			setImageFile(selectedFile);
			setMessage({ message: 'File successfully uploaded!', type: 'success' });
		} else {
			if (
				(selectedFile && selectedFile?.type !== 'image/png') ||
				selectedFile?.type !== 'image/jpg'
			) {
				setMessage({
					message: 'Wrong image type - upload the right type',
					type: 'error',
				});
			}
			if (selectedFile && selectedFile?.size > 2000000) {
				setMessage({
					message: 'Image size is over 2MB, retry?',
					type: 'error',
				});
			}
		}
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setUserDetails((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const validateForm = useCallback(() => {
		let isValidForm = true;
		const { fullName, email } = userDetails;

		if (!imageFile) {
			isValidForm = false;
			setMessage({ message: 'Invalid user profile photo', type: 'error' });
		}

		if (!email || !emailRegex.test(email)) {
			setMessage({ message: 'invalid email', type: 'error' });
			isValidForm = false;
		}

		if (!fullName || fullName.trim().length < 5) {
			isValidForm = false;
			setMessage({
				message: 'Full name must be at least 5 characters.',
				type: 'error',
			});
		}

		// If no errors, return true indicating form is valid

		if (isValidForm) {
			setFormValidated(true);
			setMessage(null);
		} else {
			setFormValidated(false);
		}

		return isValidForm;
	}, [userDetails, imageFile, emailRegex, setMessage]);

	const handleFileUpload = async () => {
		if (!imageFile) return;
		const formData = new FormData();
		formData.append('file', imageFile);
		formData.append('upload_preset', UPLOAD_PRESET);

		try {
			const response = await fetch(
				`https://api.cloudinary.com/v1_1/${UPLOAD_NAME}/image/upload`,
				{
					method: 'POST',
					body: formData,
				}
			);

			const data = await response.json();
			if (data.secure_url) {
				return data.secure_url;
			} else {
				setMessage({ message: 'Image upload failed', type: 'error' });
				return null;
			}
		} catch (error) {
			console.error('Error uploading image: ', error);
		}
	};

	const handleAttendeeFormSubmission = useCallback(async (e) => {
		e.preventDefault();

		if (!validateForm()) {
			setMessage({ message: 'Form validation failed', type: 'error' });
			return;
		}

		const uploadedImageUrl = await handleFileUpload();
		if (!uploadedImageUrl) {
			setMessage({
				message: 'Image upload failed, try again',
				type: 'error',
			});
			return;
		}

		const updatedData = {
			...formData,
			...userDetails,
			imageUrl: uploadedImageUrl,
		};

		setFormData(updatedData);
		sessionStorage.setItem('formData', JSON.stringify(updatedData));

		setMessage({ message: 'Form validated and submitted!', type: 'success' });
		setTimeout(() => {
			setMessage({
				message: 'Image uploaded successfully to cloud storage',
				type: 'success',
			});
		}, 2000);
		setTimeout(() => {
			setMessage({ message: 'Generating Ticket', type: 'success' });
		}, 4000);
		setTimeout(() => {
			setMessage({
				message: 'Ticket Generated Successfully!',
				type: 'success',
			});
		}, 6000);

		const timeout = setTimeout(() => {
			setIsSecondPage(false);
			setIsLastPage(true);
			setTicketGenerated(true);
		}, 6000);
		return () => clearTimeout(timeout);
	});

	useEffect(() => {
		const handleEnterKey = async (e) => {
			if (e.key === 'Enter') {
				e.preventDefault();

				if (isSubmitting) return;
				const isValidForm = validateForm();
				console.log(isValidForm);
				if (!isValidForm) {
					setMessage({ message: 'Form not validated', type: 'error' });
					return;
				}

				setIsSubmitting(true);
				await handleAttendeeFormSubmission(e);
				setIsSubmitting(false);
			}
		};
		window.addEventListener('keydown', handleEnterKey);

		return () => {
			window.removeEventListener('keydown', handleEnterKey);
		};
	}, [
		handleAttendeeFormSubmission,
		isSubmitting,
		setMessage,
		userDetails,
		validateForm,
	]);

	const handleBackBtn = (e) => {
		e.preventDefault();
		setIsFirstPage(true);
		setIsSecondPage(false);
	};

	return (
		<section
			className='w-[450px] md:w-[650px] lg:w-[700px] h-[1083px] mx-auto m-auto border border-[#0E464F] rounded-3xl flex flex-col justify-center text-white bg-[#041E23] my-20 relative
		'
		>
			{message?.message && <MessageHandler userMessage={message} />}
			<div className='w-[85%] md:w-[90%] lg:w-[85%] h-[98%] m-auto flex flex-col justify-evenly'>
				<Header width={'55%'} title={'Attendee Details'} step={'2/3'} />

				<form
					className='w-full h-[85%] m-auto border border-[#0E464F] rounded-3xl bg-[#08252B]'
					noValidate
					onBlur={validateForm}
				>
					<div className='w-[90%] md:w-[556px] h-[328px] border border-[#07373F] bg-[#052228] mx-auto mt-5 rounded-3xl p-[12px] md:p-[24px] text-gray-400'>
						<p className='max-md:pt-3 pb-3'>Upload Profile Photo</p>
						<div className='w-[98%] md:w-[508px] h-[200px] mx-auto bg-[#0000003f] mt-4 relative flex place-content-center'>
							<div className='absolute top-0 md:-top-4 w-[200px] md:w-[240px] h-[200px] md:h-[240px] border-[3px] border-[#249fb586] bg-[#0e464fc5] rounded-[32px] flex place-content-center hover:cursor-pointer'>
								{!imageFile ? (
									<label
										htmlFor='dropzone'
										className='flex flex-col justify-center items-center gap-3'
									>
										<img
											src={uploadImg}
											alt='upload'
											width={27}
											height={19}
											className=' hover:cursor-pointer'
										/>
										<small className='text-center'>
											Drag & drop or click to <br />
											upload
										</small>
									</label>
								) : (
									<FilePreview file={imageFile} width={240} height={240} />
								)}
								{imageFile && (
									<label
										htmlFor='dropzone'
										className='flex flex-col justify-center items-center gap-3 absolute inset-0'
									>
										<img
											src={changeImg}
											alt='upload'
											width={100}
											height={100}
											className=' hover:cursor-pointer'
										/>
									</label>
								)}
								<Input
									id='dropzone'
									type='file'
									className='hidden w-full h-full border'
									onChange={handleFileSelection}
								/>
							</div>
						</div>
					</div>
					<div className='w-[95%] mx-auto my-8'>
						<ProgressLine />
					</div>

					<section className='w-[95%] mx-auto text-gray-400'>
						<Input
							type={'text'}
							label={'Enter your name'}
							id={'name'}
							name={'fullName'}
							value={userDetails.fullName}
							minLength={5}
							onChange={handleChange}
						/>
						<Input
							name={'email'}
							value={userDetails.email}
							type={'email'}
							label={'Enter your email'}
							id={'email'}
							className={'pl-10'}
							onChange={handleChange}
							placeholder={''}
							pattern={emailRegex}
						/>
						<div className='mt-4'>
							<p>Special request?</p>
							<textarea
								className='bg-transparent border border-[#07373F] w-full h-[127px] mt-2 rounded-xl pl-2 pt-2 outline-none'
								placeholder='Textarea'
								name='request'
								id='request'
								value={userDetails.request}
								onChange={handleChange}
							></textarea>
						</div>
					</section>

					<div className='w-[95%] justify-centers items-center mx-auto h-[48px] flex mt-8 gap-5'>
						<Button
							text='Back'
							className={'text-[#24A0B5] border-[#24A0B5]'}
							onclick={handleBackBtn}
						/>
						<Button
							text='Get My Free Ticket'
							className={'text-white bg-[#24A0B5] border-[#24A0B5]'}
							disabled={!formValidated}
							onclick={handleAttendeeFormSubmission}
						/>
					</div>
				</form>
			</div>
		</section>
	);
};

export default AttendeeForm;
