import React from 'react';
import TicketSelection from './TicketSelection';
import AttendeeForm from './AttendeeForm';
import Ticket from './Ticket';
import WelcomePage from './WelcomePage';
import { BrowserRouter, Routes, Route } from 'react-router';
import RootLayout from '../layout/RootLayout';

const TicketApp = () => {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route element={<RootLayout />}>
						<Route index element={<WelcomePage />} />
						<Route path='/ticket-selection' element={<TicketSelection />} />
						<Route path='/attendee-form' element={<AttendeeForm />} />
						<Route path='/ticket' element={<Ticket />} />

						<Route path='*' element={<WelcomePage />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</>
	);
};

export default TicketApp;
