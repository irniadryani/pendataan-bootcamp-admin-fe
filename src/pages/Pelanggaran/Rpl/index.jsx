import { useQuery } from 'react-query';
import { allPelanggaranRplFn, allSiswasFn } from '@/api/Pelanggaran'

import { RplTable } from './RplTable';

export default function Rpl() {

	// Manggil useQuery untuk dapetin data pelanggaran RPL 
	const { data: dataPelanggaranRpl, refetch:refetchPelanggaranRpl, isLoading: loadingPelanggaranRpl } = useQuery(
		'allPelanggaranRpl',
		allPelanggaranRplFn
	)

	// Manggil useQuery untuk dapeting data siswa
	const { data: dataSiswa, isLoading: loadingSiswa } = useQuery(
		'allSiswa',
		allSiswasFn
	)

	const siswaRpl = dataSiswa?.data?.filter((item) => item.jurusan === 'Rekayasa Perangkat Lunak')

	console.log('data pelanggaran rpl:', dataPelanggaranRpl);

	return (
		<div className='mt-14 lg:mt-0 lg:p-4'>
			<div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
				<div className='p-4 bg-white shadow-md rounded-lg'>
					<p className='text-sm font-medium text-black/40'>
						Jumlah Pelanggaran
					</p>
					{!loadingPelanggaranRpl && (
						<h1 className='font-semibold'>
							{dataPelanggaranRpl.data.length}
						</h1>
					)}
				</div>
				<div className='p-4 bg-white shadow-md rounded-lg'>
					<p className='text-sm font-medium text-black/40'>
						Jumlah Siswa
					</p>
					{siswaRpl && (
						<h1 className='font-semibold'>
							{siswaRpl.length}
						</h1>
					)}
				</div>
			</div>
			<div className='mt-10 border rounded-lg p-5'>
				<h3 className='font-medium mb-8 text-black/60'>
					Tabel Pelanggaran RPL
				</h3>
				{
					!loadingPelanggaranRpl && (
						<RplTable
							refetch={refetchPelanggaranRpl}
							dataPelanggaran={dataPelanggaranRpl.data}
						/>
					)
				}
			</div>
		</div>
	)
}
