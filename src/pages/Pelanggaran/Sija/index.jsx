import { useQuery } from 'react-query';
import { allPelanggaranSijaFn, allSiswasFn } from '@/api/Pelanggaran'

import { SijaTable } from './SijaTable';

export default function Sija() {

	const { data: dataPelanggaranSija, refetch:refetchPelanggaranSija, isLoading: loadingPelanggaranSija } = useQuery(
		'allPelanggaranSija',
		allPelanggaranSijaFn
	)

	const { data: dataSiswa, isLoading: loadingSiswa} = useQuery(
		'allSiswa',
		allSiswasFn
	)

	const siswaSija = dataSiswa?.data?.filter((item) => item.jurusan === 'Sistem Jaringan dan Aplikasi')

	console.log('data pelanggaran sija:', dataPelanggaranSija);

	return (
		<div className='mt-14 lg:mt-0 lg:p-4'>
			<div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
				<div className='p-4 bg-white shadow-md rounded-lg'>
					<p className='text-sm font-medium text-black/40'>
						Jumlah Pelanggaran
					</p>
					{!loadingPelanggaranSija && (
						<h1 className='font-semibold'>
							{dataPelanggaranSija.data.length}
						</h1>
					)}
				</div>
				<div className='p-4 bg-white shadow-md rounded-lg'>
					<p className='text-sm font-medium text-black/40'>
						Jumlah Siswa
					</p>
					{siswaSija && (
						<h1 className='font-semibold'>
							{siswaSija.length}
						</h1>
					)}
				</div>
			</div>
			<div className='mt-10 border rounded-lg p-5'>
				<h3 className='font-medium mb-8 text-black/60'>
					Tabel Pelanggaran SIJA
				</h3>
				{
					!loadingPelanggaranSija && (
						<SijaTable
							refetch={refetchPelanggaranSija}
							dataPelanggaran={dataPelanggaranSija.data}
						/>
					)
				}
			</div>
		</div>
	)
}
