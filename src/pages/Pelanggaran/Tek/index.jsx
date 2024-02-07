import { useQuery } from 'react-query';
import { allPelanggaranTekFn, allSiswasFn } from '@/api/Pelanggaran'

import { TekTable } from './TekTable';

export default function Tek() {

	const { data: dataPelanggaranTek, refetch:refetchPelanggaranTek, isLoading: loadingPelanggaranTek } = useQuery(
		'allPelanggaranTek',
		allPelanggaranTekFn
	)

	const { data: dataSiswa, isLoading: loadingSiswa } = useQuery(
		'allSiswa',
		allSiswasFn
	)

	const siswaTek = dataSiswa?.data?.filter((item) => item.jurusan === 'Teknik Elektronika Komunikasi')

	console.log('data pelanggaran tek:', dataPelanggaranTek);

	return (
		<div className='mt-14 lg:mt-0 lg:p-4'>
			<div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
				<div className='p-4 bg-white shadow-md rounded-lg'>
					<p className='text-sm font-medium text-black/40'>
						Jumlah Pelanggaran
					</p>
					{!loadingPelanggaranTek && (
						<h1 className='font-semibold'>
							{dataPelanggaranTek.data.length}
						</h1>
					)}
				</div>
				<div className='p-4 bg-white shadow-md rounded-lg'>
					<p className='text-sm font-medium text-black/40'>
						Jumlah Siswa
					</p>
					{siswaTek && (
						<h1 className='font-semibold'>
							{siswaTek.length}
						</h1>
					)}
				</div>
			</div>
			<div className='mt-10 border rounded-lg p-5'>
				<h3 className='font-medium mb-8 text-black/60'>
					Tabel Pelanggaran TEK
				</h3>
				{
					!loadingPelanggaranTek && (
						<TekTable
							refetch={refetchPelanggaranTek}
							dataPelanggaran={dataPelanggaranTek.data}
						/>
					)
				}
			</div>
		</div>
	)
}
