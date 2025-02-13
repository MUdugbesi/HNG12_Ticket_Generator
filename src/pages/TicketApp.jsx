import React, { useContext, useEffect, useState } from 'react';
import TicketSelection from './TicketSelection';
import AttendeeForm from './AttendeeForm';
import Ticket from './Ticket';
import { AuthContext } from '../context/AuthContext';
import WelcomePage from './WelcomePage';
import PageHeader from '../components/PageHeader';

const TicketApp = () => {
	const { formData, setFormData } = useContext(AuthContext);
	const [isWelcomePage, setIsWelcomePage] = useState(true);
	const [isFirstPage, setIsFirstPage] = useState(false);
	const [isSecondPage, setIsSecondPage] = useState(false);
	const [isLastPage, setIsLastPage] = useState(false);
	const [isValidTicket, setIsValidTicket] = useState(false);
	const [ticketGenerated, setTicketGenerated] = useState(false);
	const [message, setMessage] = useState({});

	useEffect(() => {
		const storedData = sessionStorage.getItem('formData');
		if (storedData) {
			setFormData(JSON.parse(storedData));
		}
	}, [setFormData]);

	useEffect(() => {
		if (message?.message) {
			const timeout = setTimeout(
				() => setMessage(null),
				isFirstPage ? 2000 : 5000
			);
			return () => clearTimeout(timeout);
		}
	}, [message]);

	return (
		<>
			{!isWelcomePage && <PageHeader />}
			{isWelcomePage && (
				<WelcomePage
					setIsWelcomePage={setIsWelcomePage}
					setIsFirstPage={setIsFirstPage}
				/>
			)}
			{isFirstPage && (
				<TicketSelection
					isValidTicket={isValidTicket}
					setIsValidTicket={setIsValidTicket}
					setIsFirstPage={setIsFirstPage}
					setIsWelcomePage={setIsWelcomePage}
					setIsSecondPage={setIsSecondPage}
					message={message}
					setMessage={setMessage}
				/>
			)}
			{isSecondPage && (
				<AttendeeForm
					message={message}
					setMessage={setMessage}
					setIsFirstPage={setIsFirstPage}
					setIsSecondPage={setIsSecondPage}
					setIsLastPage={setIsLastPage}
					setTicketGenerated={setTicketGenerated}
				/>
			)}
			{isLastPage && ticketGenerated && (
				<Ticket setIsFirstPage={setIsFirstPage} setIsLastPage={setIsLastPage} />
			)}
			{isWelcomePage && (
				<p className='text-gray-500 text-center text-[10px]'>
					UI by @AviOfLagos
					<br />
					Built by @sparkleking
				</p>
			)}
		</>
	);
};

export default TicketApp;
