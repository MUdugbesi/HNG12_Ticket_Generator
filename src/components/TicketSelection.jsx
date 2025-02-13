import React, { useCallback, useContext, useEffect, useState } from 'react';
import ProgressLine from './ProgressLine';
import Card from './Card';
import { ticketTypeData } from '../utils';
import Input from './Input';
import { IoIosArrowDown } from 'react-icons/io';
import Button from './Button';
import Header from './Header';
import { AuthContext } from '../context/AuthContext';
import MessageHandler from './message/MessageHandler';

const TicketSelection = ({
	isValidTicket,
	setIsValidTicket,
	setIsWelcomePage,
	setIsFirstPage,
	setIsSecondPage,
	message,
	setMessage,
}) => {
	const { formData, setFormData } = useContext(AuthContext);
	const [ticketType, setTicketType] = useState(null);
	const [ticketNum, setTicketNum] = useState(0);
	const [isSubmitting, setIsSubmitting] = useState(true);

	useEffect(() => {
		const updatedData = sessionStorage.getItem('formData');
		if (updatedData) {
			try {
				const { ticketType, ticketNum } = JSON.parse(updatedData);
				if (ticketType || ticketNum) {
					setTicketType(ticketType || null);
					setTicketNum(ticketNum || 0);
				}
			} catch (e) {
				console.error('Error parsing sessionStorage data:', e);
			}
		}
	}, []);

	const handleTicketType = (ticket) => {
		setTicketType(ticket);
	};

	const handleSelectTicketNum = ({ target }) => {
		const value = parseInt(target.value, 10);
		if (value < 1) {
			setMessage({
				message: 'Invalid number of ticket selection',
				type: 'error',
			});
		} else {
			setMessage(null);
		}
		setTicketNum(value);
	};

	const handleBackBtn = () => {
		setIsFirstPage(false);
		setIsWelcomePage(true);
		sessionStorage.removeItem('formData');
	};

	const handleTicketSelection = useCallback((e) => {
		e.preventDefault();
		if (ticketType && ticketNum) {
			const updatedData = {
				...formData,
				ticketNum,
				ticketType,
			};
			setFormData(updatedData);
			sessionStorage.setItem('formData', JSON.stringify(updatedData));

			setIsSubmitting(false);
			setIsValidTicket(true);
			setMessage({ message: 'Valid Ticket Selection', type: 'success' });

			setTimeout(() => {
				setMessage({ message: 'Loading next page...', type: 'success' });
			}, 2000);

			setTimeout(() => {
				setIsFirstPage(false);
				setIsSecondPage(true);
			}, 4000);
		} else {
			setMessage({
				message: 'Ticket type and number both required',
				type: 'error',
			});
		}
	});

	useEffect(() => {
		const handleEnterKey = async (e) => {
			if (e.key === 'Enter') {
				e.preventDefault();
				if (!isSubmitting) return;
				handleTicketSelection(e);
			}
		};
		window.addEventListener('keydown', handleEnterKey);

		return () => {
			window.removeEventListener('keydown', handleEnterKey);
		};
	}, [handleTicketSelection, isSubmitting]);

	return (
		<section className='w-[450px] md:w-[650px] lg:w-[700px] min-h-[858px] h-auto md:h-[858px] pb-5 mx-auto m-auto border border-[#0E464F] rounded-3xl flex flex-col justify-center text-white bg-[#041E23] relative'>
			{message?.message && <MessageHandler userMessage={message} />}
			<div className='w-[85%] md:w-[90%] lg:w-[85%] h-[98%] m-auto flex flex-col justify-evenly'>
				<Header title={'Ticket Selection'} step={'1/3'} width={'40%'} />

				<form className='w-full min-h-[85%] h-auto m-auto border border-[#0E464F] rounded-3xl bg-[#08252B] max-md:p-2 my-10 pb-3'>
					<div className='w-[90%] md:w-[556px] h-[200px] border border-[#07373F] mx-auto mt-5 rounded-3xl flex flex-col items-center justify-center px-2 pb-2'>
						<h2 className='font-roadRage text-[32px] md:text-[62px]'>
							Techember Fest ”25
						</h2>
						<p className='font-roboto text-[12px] md:text-[16px] text-center text-gray-400'>
							Join us for an unforgettable experience at <br />
							[Event Name]! Secure your spot now.
						</p>
						<p className='font-roboto text-[12px] md:text-[16px]  text-gray-400'>
							📍 [Event Location] || March 15, 2025 | 7:00pm
						</p>
					</div>

					<div className='w-[95%] mx-auto my-8'>
						<ProgressLine />
					</div>
					<div className='w-full md:w-[556px] mx-auto'>
						<p className='font-roboto text-gray-400 mb-2'>
							Select Ticket Type:
						</p>
						<div className='grid grid-cols-1 md:grid-cols-3 w-full h-auto md:h-[142px] border border-[#07373F] rounded-2xl max-md:gap-3 p-1 max-md:py-3'>
							{ticketTypeData.map((ticket, i) => (
								<Card
									ticket={ticket}
									key={i}
									onclick={() => handleTicketType(ticket)}
									ticketType={ticketType}
								/>
							))}
						</div>
					</div>

					<div className='w-[95%] mx-auto relative mt-5'>
						<p className='text-gray-400 pb-2'>Number of Tickets</p>
						<IoIosArrowDown className='absolute text-white right-2 bottom-4' />
						<select
							className='w-full bg-transparent border-2 border-[#07373F] h-[48px] rounded-lg appearance-none text-gray-500 pl-2 outline-none'
							onChange={handleSelectTicketNum}
							value={ticketNum}
						>
							<option>0</option>
							<option>1</option>
							<option>2</option>
							<option>3</option>
						</select>
					</div>
					<div className='w-[95%] justify-centers items-center mx-auto h-[48px] flex mt-8 gap-5 max-md:pb-4'>
						<Button
							text='Cancel'
							className={
								'text-[#24A0B5] border-[#24A0B5] hover:text-opacity-70'
							}
							onclick={handleBackBtn}
						/>
						<Button
							text='Next'
							className={
								'text-white bg-[#24A0B5] border-[#24A0B5] hover:bg-[#249fb5c0]'
							}
							onclick={handleTicketSelection}
							disabled={!isSubmitting}
						/>
					</div>
				</form>
			</div>
		</section>
	);
};

export default TicketSelection;
