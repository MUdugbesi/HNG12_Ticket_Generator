import React, { useEffect, useRef, useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

const Select = ({ options = [], ticketNum, handleSelectTicketNum }) => {
	const [open, setOpen] = useState(null);
	const dropdownRef = useRef();

	useEffect(() => {
		const handleClickEvt = (evt) => {
			if (dropdownRef.current && !dropdownRef.current.contains(evt.target)) {
				setOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickEvt);
		return () => {
			document.removeEventListener('mousedown', handleClickEvt);
		};
	}, []);

	return (
		<>
			<div className='relative w-full' ref={dropdownRef}>
				<div
					className='w-full border-2 border-[#07373F] bg-transparent h-[48px] rounded-lg pl-2 flex items-center justify-between cursor-pointer'
					onClick={() => setOpen(!open)}
				>
					<span>{ticketNum}</span>
					<span className='pr-2'>
						{!open ? <IoIosArrowDown /> : <IoIosArrowUp />}
					</span>
				</div>
				{open && (
					<ul
						className={`absolute left-0 w-full bg-[#08252B] border border-[#07373F] rounded-lg mt-1 shadow-lg z-10 animate__animated animate__slideInDown`}
					>
						{options.map((option, index) => (
							<li
								key={index}
								className='px-4 py-2 cursor-pointer hover:bg-[#07373F] hover:text-white'
								onClick={() => {
									handleSelectTicketNum(option);
									setOpen(false);
								}}
							>
								{option}
							</li>
						))}
					</ul>
				)}
			</div>
		</>
	);
};

export default Select;
