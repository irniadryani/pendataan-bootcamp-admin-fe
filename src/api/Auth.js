import { Api } from '@/lib/common'

export const loginUserFn = async (user) => {
	const response = await Api.post('login', user)
	return response.data
}

export const currentUserFn = async () => {
	const response = await Api.get('me')
	return response.data
}
