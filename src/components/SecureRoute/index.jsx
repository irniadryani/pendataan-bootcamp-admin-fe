import { Navigate, useLocation } from 'react-router-dom'
import useStore from '@/store'
import { useQuery } from 'react-query'
import { currentUserFn } from '@/api/Auth'
import { toast } from 'react-toastify'

const SecureRoute = ({ children }) => {
	const auth = useStore((state) => state.userToken)
	const location = useLocation()
	const store = useStore()

	useQuery(['authUser'], currentUserFn, {
		onSuccess(data) {
			store.setAuthUser(data.data)
			store.setRequestLoading(false)
		},
		onError(error) {
			store.setRequestLoading(false)
			store.setUserToken(null)
			if (Array.isArray(error)) {
				error.forEach((el) =>
					toast.error(el.message, {
						position: 'top-right',
					})
				)
			} else {
				toast.error(error.message, {
					position: 'top-right',
				})
			}
		},
	})

	return auth ? (
		<>{children}</>
	) : (
		<Navigate to='login' state={{ prevLocation: location.pathname }} />
	)
}

export default SecureRoute
