// Function to concatenate classes conditionally
export const classNames = (...classes) => {
	return classes.filter(Boolean).join(' ');
}

// Function to display toast notifications dynamically for errors
import { toast } from 'react-toastify';

export const errorNotification = (error) => {
	if (Array.isArray(error.response.data.message)) {
		// If error message is an array, display each message as a separate toast
		error.response.data.message.forEach((el) =>
			toast.error(el, {
				position: 'top-right',
			})
		);
	} else {
		// If error message is a string, display it as a single toast
		toast.error(error.response.data.message, {
			position: 'top-right',
		});
	}
}
