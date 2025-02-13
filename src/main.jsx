import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import 'animate.css';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { ToastContainer } from 'react-toastify';

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<ToastContainer />
		<AuthProvider>
				<App />
		</AuthProvider>
	</StrictMode>
);
