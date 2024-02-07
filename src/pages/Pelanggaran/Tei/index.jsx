import { useQuery } from 'react-query';
import { allPelanggaranTeiFn, allSiswasFn } from '@/api/Pelanggaran'

import { TeiTable } from './TeiTable';

export default function Tei() {
     
	const { data: dataPelanggaranTei, refetch:refetchPelanggaranTei, isLoading: loadingPelanggaranTei } = useQuery(
		'allPelanggaranTei',
		allPelanggaranTeiFn
	)

	const { data: dataSiswa, isLoading: loadingSiswa } = useQuery(
		'allSiswa',
		allSiswasFn
	)

	const siswaTei = dataSiswa?.data?.filter((item) => item.jurusan === 'Teknik Elektronika Industri')

	console.log('data pelanggaran tei:', dataPelanggaranTei);

	return (
		<div className='mt-14 lg:mt-0 lg:p-4'>
			<div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
				<div className='p-4 bg-white shadow-md rounded-lg'>
					<p className='text-sm font-medium text-black/40'>
						Jumlah Pelanggaran
					</p>
					{!loadingPelanggaranTei && (
						<h1 className='font-semibold'>
							{dataPelanggaranTei.data.length}
						</h1>
					)}
				</div>
				<div className='p-4 bg-white shadow-md rounded-lg'>
					<p className='text-sm font-medium text-black/40'>
						Jumlah Siswa
					</p>
					{siswaTei && (
						<h1 className='font-semibold'>
							{siswaTei.length}
						</h1>
					)}
				</div>
			</div>
			<div className='mt-10 border rounded-lg p-5'>
				<h3 className='font-medium mb-8 text-black/60'>
					Tabel Pelanggaran TEI
				</h3>
				{
					!loadingPelanggaranTei && (
						<TeiTable
							refetch={refetchPelanggaranTei}
							dataPelanggaran={dataPelanggaranTei.data}
						/>
					)
				}
			</div>
		</div>
	)
}
