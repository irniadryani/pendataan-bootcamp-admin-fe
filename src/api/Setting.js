import { Api } from '@/lib/common'

const formDataconfig = {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  };

  export const settingFn = async () => {
	const response = await Api.get('userContent')
	return response.data
}

export const updateDefaultProfileFn = async (data) => {
	const response = await Api.post(`settings/defaultProfileImage`, data, formDataconfig)
	return response.data
}

export const submitDefaultProfileImageFn = async (data) => {
	const response = await Api.post(`settings/defaultProfileImage`, data, formDataconfig)
	return response.data
}