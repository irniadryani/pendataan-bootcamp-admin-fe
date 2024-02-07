import { useQuery } from 'react-query';
import { allPelanggaranToiFn, allSiswasFn } from '@/api/Pelanggaran'

import { ToiTable } from './ToiTable';

export default function Toi() {

	const { data: dataPelanggaranToi, refetch:refetchPelanggaranToi, isLoading: loadingPelanggaranToi } = useQuery(
		'allPelanggaranToi',
		allPelanggaranToiFn
	)

	const { data: dataSiswa, isLoading: loadingSiswa } = useQuery(
		'allSiswa',
		allSiswasFn
	)

	const siswaToi = dataSiswa?.data?.filter((item) => item.jurusan === 'Teknik Otomatisasi Industri')

	console.log('data pelanggaran toi:', dataPelanggaranToi);

	return (
		<div className='mt-14 lg:mt-0 lg:p-4'>
			<div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
				<div className='p-4 bg-white shadow-md rounded-lg'>
					<p className='text-sm font-medium text-black/40'>
						Jumlah Pelanggaran
					</p>
					{!loadingPelanggaranToi && (
						<h1 className='font-semibold'>
							{dataPelanggaranToi.data.length}
						</h1>
					)}
				</div>
				<div className='p-4 bg-white shadow-md rounded-lg'>
					<p className='text-sm font-medium text-black/40'>
						Jumlah Siswa
					</p>
					{siswaToi && (
						<h1 className='font-semibold'>
							{siswaToi.length}
						</h1>
					)}
				</div>
			</div>
			<div className='mt-10 border rounded-lg p-5'>
				<h3 className='font-medium mb-8 text-black/60'>
					Tabel Pelanggaran TOI
				</h3>
				{
					!loadingPelanggaranToi && (
						<ToiTable
							refetch={refetchPelanggaranToi}
							dataPelanggaran={dataPelanggaranToi.data}
						/>
					)
				}
			</div>
		</div>
	)
}
