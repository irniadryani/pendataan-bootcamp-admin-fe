import { useQuery } from 'react-query';
import { allPelanggaranMekaFn, allSiswasFn } from '@/api/Pelanggaran'

import { MekaTable } from './MekaTable';

export default function Meka() {

	const { data: dataPelanggaranMeka, refetch: refetchPelanggaranMeka, isLoading: loadingPelanggaranMeka } = useQuery(
		'allPelanggaranMeka',
		allPelanggaranMekaFn
	)

	const { data: dataSiswa, isLoading: loadingSiswa } = useQuery(
		'allSiswa',
		allSiswasFn
	)

	const siswaMeka = dataSiswa?.data?.filter((item) => item.jurusan === 'Mekatronika')

	console.log('data pelanggaran meka:', dataPelanggaranMeka);

	return (
		<div className='mt-14 lg:mt-0 lg:p-4'>
			<div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
				<div className='p-4 bg-white shadow-md rounded-lg'>
					<p className='text-sm font-medium text-black/40'>
						Jumlah Pelanggaran
					</p>
					{!loadingPelanggaranMeka && (
						<h1 className='font-semibold'>
							{dataPelanggaranMeka.data.length}
						</h1>
					)}
				</div>
				<div className='p-4 bg-white shadow-md rounded-lg'>
					<p className='text-sm font-medium text-black/40'>
						Jumlah Siswa
					</p>
					{siswaMeka && (
						<h1 className='font-semibold'>
							{siswaMeka.length}
						</h1>
					)}
				</div>
			</div>
			<div className='mt-10 border rounded-lg p-5'>
				<h3 className='font-medium mb-8 text-black/60'>
					Tabel Pelanggaran MEKATRONIKA
				</h3>
				{
					!loadingPelanggaranMeka && (
						<MekaTable
							refetch={refetchPelanggaranMeka}
							dataPelanggaran={dataPelanggaranMeka.data}
						/>
					)
				}
			</div>
		</div>
	)
}
