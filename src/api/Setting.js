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

export const updateDefaultTextHomeUser = async (data) => {
	const response = await Api.post(`settings/textHomeUser`, data, formDataconfig)
	return response.data
}

export const updateDefaultImageHomeUser = async (data) => {
	const response = await Api.post(`settings/imageHomeUser`, data, formDataconfig)
	return response.data
}

export const updateLinkGdriveAdminFn = async (data) => {
	const response = await Api.post(`settings/linkDriveCv`, data, formDataconfig)
	return response.data
}

export const updateLinkCertificateAdminFn = async (data) => {
	const response = await Api.post(`settings/linkDriveCerti`, data, formDataconfig)
	return response.data
}

export const updateDefaultBatchImageFn = async (data) => {
	const response = await Api.post(`settings/defaultImageBatch`, data, formDataconfig)
	return response.data
}

export const updateDefaultLogoAdminFn = async (data) => {
	const response = await Api.post(`settings/logoAdmin`, data, formDataconfig)
	return response.data
}

export const updateDefaultLogoUserFn = async (data) => {
	const response = await Api.post(`settings/logoUser`, data, formDataconfig)
	return response.data
}

export const updateDefaultPasswordFn = async (data) => {
	const response = await Api.post(`settings/defaultPassword`, data, formDataconfig)
	return response.data
}