import { useQuery } from 'react-query';
import { allPelanggaranIopFn, allSiswasFn } from '@/api/Pelanggaran'

import { IopTable } from './IopTable';

export default function Iop() {

	// Manggil useQuery untuk dapetin data pelanggaran IOP 
	const { data: dataPelanggaranIop, refetch: refetchPelanggaranIop, isLoading: loadingPelanggaranIop } = useQuery(
		'allPelanggaranIop',
		allPelanggaranIopFn
	)

	// Manggil useQuery untuk dapeting data siswa
	const { data: dataSiswa, isLoading: loadingSiswa } = useQuery(
		'allSiswa',
		allSiswasFn
	)

	const siswaIop = dataSiswa?.data?.filter((item) => item.jurusan === 'Instrumentasi Otomasi Proses')

	console.log('data pelanggaran iop:', dataPelanggaranIop);

	return (
		<div className='mt-14 lg:mt-0 lg:p-4'>
			<div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
				<div className='p-4 bg-white shadow-md rounded-lg'>
					<p className='text-sm font-medium text-black/40'>
						Jumlah Pelanggaran
					</p>
					{!loadingPelanggaranIop && (
						<h1 className='font-semibold'>
							{dataPelanggaranIop.data.length}
						</h1>
					)}
				</div>
				<div className='p-4 bg-white shadow-md rounded-lg'>
					<p className='text-sm font-medium text-black/40'>
						Jumlah Siswa
					</p>
					{siswaIop && (
						<h1 className='font-semibold'>
							{siswaIop.length}
						</h1>
					)}
				</div>
			</div>
			<div className='mt-10 border rounded-lg p-5'>
				<h3 className='font-medium mb-8 text-black/60'>
					Tabel Pelanggaran IOP
				</h3>
				{
					!loadingPelanggaranIop && (
						<IopTable
							refetch={refetchPelanggaranIop}
							dataPelanggaran={dataPelanggaranIop.data}
						/>
					)
				}
			</div>
		</div>
	)
}
