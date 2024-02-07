import { useQuery } from 'react-query';
import { allPelanggaranTptuFn, allSiswasFn } from '@/api/Pelanggaran'

import { TptuTable } from './TptuTable';

export default function Tptu() {

	const { data: dataPelanggaranTptu, refetch:refetchPelanggaranTptu, isLoading: loadingPelanggaranTptu} = useQuery(
		'allPelanggaranTptu',
		allPelanggaranTptuFn
	)

	const { data: dataSiswa, isLoading: loadingSiswa} = useQuery(
		'allSiswa',
		allSiswasFn
	)

	const siswaTptu = dataSiswa?.data?.filter((item) => item.jurusan === 'Teknik Pendingin dan Tata Udara')

	console.log('data pelanggaran tptu:', dataPelanggaranTptu);

	return (
		<div className='mt-14 lg:mt-0 lg:p-4'>
			<div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
				<div className='p-4 bg-white shadow-md rounded-lg'>
					<p className='text-sm font-medium text-black/40'>
						Jumlah Pelanggaran
					</p>
					{!loadingPelanggaranTptu && (
						<h1 className='font-semibold'>
							{dataPelanggaranTptu.data.length}
						</h1>
					)}
				</div>
				<div className='p-4 bg-white shadow-md rounded-lg'>
					<p className='text-sm font-medium text-black/40'>
						Jumlah Siswa
					</p>
					{siswaTptu && (
						<h1 className='font-semibold'>
							{siswaTptu.length}
						</h1>
					)}
				</div>
			</div>
			<div className='mt-10 border rounded-lg p-5'>
				<h3 className='font-medium mb-8 text-black/60'>
					Tabel Pelanggaran TPTU
				</h3>
				{
					!loadingPelanggaranTptu && (
						<TptuTable
							refetch={refetchPelanggaranTptu}
							dataPelanggaran={dataPelanggaranTptu.data}
						/>
					)
				}
			</div>
		</div>
	)
}
