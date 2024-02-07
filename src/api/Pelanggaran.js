import { Api } from '@/lib/common'

// Pelanggaran All
export const allPelanggaranFn = async () => {
	const response = await Api.get('pelanggarans')
	return response.data
}

// Siswa All
export const allSiswasFn = async () => {
	const response = await Api.get('siswa')
	return response.data
}

// User All
export const allUsersFn = async () => {
	const response = await Api.get('user')
	return response.data
}

// Pelanggaran RPL
export const allPelanggaranRplFn = async () => {
	const response = await Api.get('pelanggaran/rpl')
	return response.data
}

// Pelanggaran IOP
export const allPelanggaranIopFn = async () => {
	const response = await Api.get('pelanggaran/iop')
	return response.data
}

// Pelanggaran SIJA
export const allPelanggaranSijaFn = async () => {
	const response = await Api.get('pelanggaran/sija')
	return response.data
}

// Pelanggaran TEK
export const allPelanggaranTekFn = async () => {
	const response = await Api.get('pelanggaran/tek')
	return response.data
}

// Pelanggaran TEI
export const allPelanggaranTeiFn = async () => {
	const response = await Api.get('pelanggaran/tei')
	return response.data
}

// Pelanggaran TOI
export const allPelanggaranToiFn = async () => {
	const response = await Api.get('pelanggaran/toi')
	return response.data
}

// Pelanggaran PSPT
export const allPelanggaranPsptFn = async () => {
	const response = await Api.get('pelanggaran/pspt')
	return response.data
}

// Pelanggaran TPTU
export const allPelanggaranTptuFn = async () => {
	const response = await Api.get('pelanggaran/tptu')
	return response.data
}

// Pelanggaran MEKA
export const allPelanggaranMekaFn = async () => {
	const response = await Api.get('pelanggaran/meka')
	return response.data
}

// Delete pelanggaran
export const deletePelanggaranByIdFn = async (id) => {
	const response = await Api.delete(`pelanggaran/${id}`)
	return response.data
}