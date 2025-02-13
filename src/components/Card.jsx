import React from 'react';

const Card = ({ ticket, onclick, ticketType }) => {
	const selectedTicket = ticketType?.access === ticket?.access;
	return (
		<div
			className={`w-[110px] md:w-[158px] h-[90px] md:h-[110px] m-auto border border-[#197686] hover:bg-[#12464E] rounded-xl text-gray-400 pl-3 pt-2 hover:cursor-pointer`}
			style={{ backgroundColor: selectedTicket && '#12464E' }}
			onClick={onclick}
		>
			<h3 className='font-semibold text-[18px] md:text-[24px] pb-1'>
				{ticket?.plan}
			</h3>
			<p className='uppercase text-[10px] md:text-[16px]'>{ticket?.access}</p>
			<p className='text-[10px] md:text-[16px]'>20/52</p>
		</div>
	);
};

export default Card;
