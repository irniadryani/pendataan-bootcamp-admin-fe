import { useQuery } from 'react-query';
import { allPelanggaranPsptFn, allSiswasFn } from '@/api/Pelanggaran'

import { PsptTable } from './PsptTable';

export default function Pspt() {

	const { data: dataPelanggaranPspt,  refetch: refetchPelanggaranPspt, isLoading: loadingPelanggaranPspt } = useQuery(
		'allPelanggaranPspt',
		allPelanggaranPsptFn
	)

	const { data: dataSiswa, isLoading: loadingSiswa } = useQuery(
		'allSiswa',
		allSiswasFn
	)

	const siswaPspt = dataSiswa?.data?.filter((item) => item.jurusan === 'Produk Siaran Program Televisi')

	console.log('data pelanggaran pspt:', dataPelanggaranPspt);

	return (
		<div className='mt-14 lg:mt-0 lg:p-4'>
			<div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
				<div className='p-4 bg-white shadow-md rounded-lg'>
					<p className='text-sm font-medium text-black/40'>
						Jumlah Pelanggaran
					</p>
					{!loadingPelanggaranPspt && (
						<h1 className='font-semibold'>
							{dataPelanggaranPspt.data.length}
						</h1>
					)}
				</div>
				<div className='p-4 bg-white shadow-md rounded-lg'>
					<p className='text-sm font-medium text-black/40'>
						Jumlah Siswa
					</p>
					{siswaPspt && (
						<h1 className='font-semibold'>
							{siswaPspt.length}
						</h1>
					)}
				</div>
			</div>
			<div className='mt-10 border rounded-lg p-5'>
				<h3 className='font-medium mb-8 text-black/60'>
					Tabel Pelanggaran PSPT
				</h3>
				{
					!loadingPelanggaranPspt && (
						<PsptTable
							refetch={refetchPelanggaranPspt}
							dataPelanggaran={dataPelanggaranPspt.data}
						/>
					)
				}
			</div>
		</div>
	)
}
