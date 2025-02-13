import React, { useEffect, useState } from 'react';
import Header from './Header';
import Button from './Button';
import Barcode from '../assets/Barcode.png';

const Ticket = ({ setIsFirstPage, setIsLastPage }) => {
	const [userTicket, setUserTicket] = useState(null);
	useEffect(() => {
		const storedFormData = sessionStorage.getItem('formData');
		setUserTicket(JSON.parse(storedFormData));
	}, []);

	const handleAnotherTicket = () => {
		sessionStorage.removeItem('formData');
		setIsFirstPage(true);
		setIsLastPage(false);
	};

	return (
		<>
			<section className='w-[450px] md:w-[650px] lg:w-[700px] h-[1050px] mx-auto m-auto border border-[#0E464F] rounded-3xl flex flex-col justify-center text-white bg-[#041E23]'>
				<div className='w-[85%] h-[98%] m-auto flex flex-col justify-evenly'>
					<Header width={'100%'} title={'Ready'} step={'3/3'} />

					<section className='w-full h-[85%] m-auto text-gray-400'>
						<div className='w-full text-center'>
							<h3 className='text-white text-[32px] font-alatsi'>
								Your Ticket is Booked!
							</h3>
							<p className='mt-2'>
								Check your email for a copy or you can{' '}
								<span className='font-[600]'>download</span>
							</p>
						</div>

						<section className='mt-16 w-[300px] h-[600px] mx-auto ticket relative flex flex-col items-center justify-center'>
							<div className='w-[260px] h-[446px] mx-auto border border-[#24A0B5] mt-3 rounded-2xl absolute top-4'>
								<div className='flex flex-col items-center justify-center'>
									<h2 className='font-roadRage text-[34px]'>
										Techember Fest ”25
									</h2>
									<p className='font-roboto text-[10px] text-center text-gray-400'>
										📍 04 Rumens road, Ikoyi, Lagos
									</p>
									<p className='font-roboto text-[10px] text-gray-400 mt-1'>
										📆 March 15, 2025 | 7:00pm
									</p>
								</div>

								<img
									src={userTicket?.imageUrl}
									alt='ticket_img'
									className='w-[140px] h-[140px] mx-auto mt-6 border-2 border-[#249fb5] rounded-lg object-cover object-top'
								/>
								<section className='w-[232px] h-[160px] mx-auto mt-5 bg-[#08343C] border-[#133D44] rounded-lg text-gray-400 p-2'>
									<div className='grid grid-cols-2 h-auto'>
										<div className='border-r border-b border-[#12464E] h-[45px] flex justify-evenly items-start flex-col'>
											<p className='text-[10px] pb-1'>Enter your name</p>
											<p className='text-[8px] text-white'>
												{userTicket?.fullName || 'Avi'}
											</p>
										</div>
										<div className='border-b pl-2 border-[#12464E] h-[45px] flex justify-evenly items-start flex-col'>
											<p className='text-[10px]'>
												Enter your email<sup>*</sup>
											</p>
											<p className='text-[8px] text-white'>
												{userTicket?.email || 'user@gmail.com'}
											</p>
										</div>
										<div className='border-r border-b pb-1 border-[#12464E] flex justify-evenly items-start flex-col'>
											<p className='text-[10px]'>Ticket type</p>
											<p className='text-[8px] text-white'>
												{userTicket?.['ticketType'].plan}
											</p>
										</div>
										<div className='border-b pl-2 border-[#12464E] flex justify-evenly items-start flex-col'>
											<p className='text-[10px]'>Ticket for:</p>
											<p className='text-[8px] text-white'>
												{userTicket?.['ticketNum'] || 0}
											</p>
										</div>
									</div>

									<div>
										<p className='text-[10px] py-2'>Special request?</p>
										<p className='text-[10px]'>
											{userTicket?.request ||
												'Nil ? Or the users sad story they write in there gets this whole space, Max of three rows'}
										</p>
									</div>
								</section>
							</div>
							<div className='w-[236px] h-[68px] absolute bottom-5'>
								<img src={Barcode} alt='bar_code' />
							</div>
						</section>

						<div className='w-[95%] justify-centers items-center mx-auto h-[48px] flex mt-16 gap-5'>
							<Button
								text='Book Another Ticket'
								className={
									'text-[#24A0B5] border-[#24A0B5] hover:text-opacity-70'
								}
								onclick={handleAnotherTicket}
							/>
							<Button
								text='Download Ticket'
								className={'text-white bg-[#24A0B5] border-[#24A0B5] hover:bg-[#249fb5e2]'}
							/>
						</div>
					</section>
				</div>
			</section>
		</>
	);
};

export default Ticket;
