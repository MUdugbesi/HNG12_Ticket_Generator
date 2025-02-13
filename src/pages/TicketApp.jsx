import React, { useContext, useEffect, useState } from 'react';
import TicketSelection from '../components/TicketSelection';
import AttendeeForm from '../components/AttendeeForm';
import Ticket from '../components/Ticket';
import { AuthContext } from '../context/AuthContext';
import WelcomePage from './WelcomePage';
import Barcode from '../components/Barcode';

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
			const timeout = setTimeout(() => setMessage(null), 2000);
			return () => clearTimeout(timeout);
		}
	}, [message]);

	return (
		<>
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

		</>
	);
};

export default TicketApp;
