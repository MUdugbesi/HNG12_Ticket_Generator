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
		<section className='ticket-main-container'>
			<div className='ticket-form-container'>
				{message?.message && <MessageHandler userMessage={message} />}
				<Header title={'Ticket Selection'} step={'1/3'} width={'40%'} />
				<form className='ticket-form  md:w-[604px] md:h-[682px] mt-5 ticket-selection'>
					<div className='fest-card-ctn'>
						<div className='d-flex'>
							<h2 className='font-roadRage text-[48px] md:text-[62px]'>
								Techember Fest ”25
							</h2>
							<p className='text-center w-[239px] md:w-[340px] mx-auto'>
								Join us for an unforgettable experience at [Event Name]! Secure
								your spot now.
							</p>
						</div>
						<p className='hidden md:flex'>
							📍 [Event Location] || March 15, 2025 | 7:00pm
						</p>
						<p className='w-[160px] flex md:hidden'>
							📍 [Event Location] March 15, 2025 | 7:00pm
						</p>
					</div>

					<div className='w-[95%] mx-auto my-8'>
						<ProgressLine />
					</div>
					<div className='w-full md:w-[556px] mx-auto'>
						<p className='mb-2'>Select Ticket Type:</p>
						<div className='grid-plan-ctn'>
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
						<p className='pb-2'>Number of Tickets</p>
						<IoIosArrowDown className='absolute right-2 bottom-4' />
						<select
							className='w-full bg-transparent border-2 border-[#07373F] h-[48px] rounded-lg appearance-none pl-2 outline-none cursor-pointer'
							onChange={handleSelectTicketNum}
							value={ticketNum}
						>
							<option>0</option>
							<option>1</option>
							<option>2</option>
							<option>3</option>
						</select>
					</div>
					<div className='btn-ctn'>
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
								'bg-[#24A0B5] border-[#24A0B5] hover:bg-[#249fb5c0]'
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
