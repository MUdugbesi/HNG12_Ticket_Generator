import React from 'react';
import Button from '../components/Button';

const WelcomePage = ({ setIsFirstPage, setIsWelcomePage }) => {
	const handleclick = () => {
		setIsWelcomePage(false);
		setIsFirstPage(true);
	};
	return (
		<>
			<section className='w-[450px] md:w-[650px] lg:w-[700px] h-[858px] mx-auto m-auto border border-[#0E464F] rounded-3xl flex flex-col justify-center text-white bg-[#041E23] relative'>
				<div className='w-[85%] h-[98%] m-auto flex flex-col justify-evenly items-center'>
					<div className='w-full h-[80%] m-auto border border-[#0E464F] rounded-3xl bg-[#08252B] flex justify-evenly flex-col'>
						<h1 className='font-roadRage w-[75%] md:w-[80%] border mx-auto text-[40px] md:text-[64px] border-[#07373F] rounded-3xl text-center px-2 py-10 md:px-2 md:py-2 drop-shadow-[5px_5px_5px_black]'>
							Welcome to the Ultimate Ticket Generator App
						</h1>
						<p className='text-center text-gray-400 text-[16px] w-[85%] mx-auto'>
							Generate your ticket for the upcoming{' '}
							<span className='font-alatsi text-white'>Techember Fest '25</span>
							<br />
							<em>Secure your spot now!</em>
						</p>
						<div className='text-center'>
							<Button
								text='Get Started'
								className={
									'w-[70%] md:w-[60%] max-md:h-[48px] max-lg:h-[60px] text-[#24A0B5] hover:text-white hover:bg-[#24A0B5] border-[#24A0B5] transition'
								}
								onclick={handleclick}
							/>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default WelcomePage;
