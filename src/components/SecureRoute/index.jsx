import { Navigate, useLocation } from 'react-router-dom';  
import useStore from '@/store';  
import { useQuery } from 'react-query';  
import { currentUserFn } from '@/api/Auth';  
import { toast } from 'react-toastify'; 

// Component for rendering secure routes based on authentication status
const SecureRoute = ({ children }) => {
	const auth = useStore((state) => state.userToken);  // Getting userToken from useStore
	const location = useLocation();  // Getting current location using useLocation
	const store = useStore();  // Accessing store from useStore

	// Fetching current user data using useQuery
	useQuery(['authUser'], currentUserFn, {
		// On successful fetch, update authUser in store and set loading to false
		onSuccess(data) {
			store.setAuthUser(data.data);  
			store.setRequestLoading(false);  
		},
		// On error, handle error, set loading to false, and clear userToken
		onError(error) {
			store.setRequestLoading(false); 
			store.setUserToken(null);  
			
			// Displaying error message(s) in toast notifications
			if (Array.isArray(error)) {
				error.forEach((el) =>
					toast.error(el.message, {
						position: 'top-right',
					})
				);
			} else {
				toast.error(error.message, {
					position: 'top-right',
				});
			}
		},
	});

	// Render children if authenticated, otherwise navigate to login page with previous location
	return auth ? (
		<>{children}</>
	) : (
		<Navigate to='login' state={{ prevLocation: location.pathname }} />
	);
}

export default SecureRoute;  
