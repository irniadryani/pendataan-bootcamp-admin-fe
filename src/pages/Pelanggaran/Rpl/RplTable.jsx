import { createColumnHelper } from '@tanstack/react-table'
import { Table } from '@/components/Table'
import { Button } from '@/components/Button'
import { deletePelanggaranByIdFn } from '@/api/Pelanggaran'
import useStore from '@/store'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'
import { useState } from'react'

export const RplTable = ({ dataPelanggaran, refetch }) => {
	const columnHelper = createColumnHelper()
	const [selectedId, setSelectedId] = useState()

	console.log(dataPelanggaran)

	const store = useStore()

	// manggil useMutation buat hapus data pelanggaran by id
	const { mutate: deletePelanggaran } = useMutation(
    (id) => deletePelanggaranByIdFn(id),
    {
      onMutate: () => {
        store.setRequestLoading(true);
      },
      onSuccess: () => {
        toast.success("Data Pelanggaran Berhasil Dihapus");
				refetch()
        store.setRequestLoading(false);
      },
      onError: (error) => {
        store.setRequestLoading(false);
        toast.error(error.message);
      }
    }
  );


	const columns = [
		columnHelper.accessor((row, index) => index + 1, {
			header: 'No.',
		}),
		columnHelper.accessor('nama_siswa', {
			header: 'Nama Siswa',
			cell: (info) => info.getValue(),
			footer: (info) => info.getValue().nama_siswa,
		}),
		columnHelper.accessor('nis', {
			header: 'NIS',
			cell: (info) => info.getValue(),
			footer: (info) => info.getValue().nis,
		}),
		columnHelper.accessor('kelas', {
			header: 'Kelas',
			cell: (info) => info.getValue(),
			footer: (info) => info.getValue().kelas,
		}),
		columnHelper.accessor('angkatan', {
			header: 'Angkatan',
			cell: (info) => info.getValue(),
			footer: (info) => info.getValue().angkatan,
		}),
		columnHelper.accessor('jurusan', {
			header: 'Jurusan',
			cell: (info) => info.getValue(),
			footer: (info) => info.getValue().jurusan,
		}),
		columnHelper.accessor('jenis_pelanggaran', {
			header: 'Jenis Pelanggaran',
			cell: (info) => info.getValue(),
			footer: (info) => info.getValue().jenis_pelanggaran,
		}),
		columnHelper.accessor('keterangan', {
			header: 'Keterangan',
			cell: (info) => info.getValue(),
			footer: (info) => info.getValue().keterangan,
		}),
		columnHelper.accessor('nama_pendata', {
			header: 'Nama Pendata',
			cell: (info) => info.getValue(),
			footer: (info) => info.getValue().nama_pendata,
		}),
		columnHelper.accessor('id_user', {
			header: 'Id User',
			cell: (info) => info.getValue(),
			footer: (info) => info.getValue().id_user,
		}),
		columnHelper.accessor('tanggal', {
			header: 'Tanggal',
			cell: (info) => info.getValue(),
			footer: (info) => info.getValue().tanggal,
		}),
		columnHelper.accessor("id_pelanggaran", {
			header: "Aksi",
			cell: (info) => (
			  <div className="flex flex-row gap-5">
				<Button
				  key="delete-button"
				  variant="solid" 
				  color="blue"
				  onClick={() => {
					setSelectedId(info.getValue());
					document
						.getElementById('confirm-delete-modal')
						.showModal()
				  }}
				>
				  Delete
				</Button>
			  </div>
			),
			footer: (info) => info.getValue().id_pelanggaran
		}),
	]

	return (
		<>
			<Table data={dataPelanggaran} columns={columns} />
			<dialog id='confirm-delete-modal' className='modal'>
				<div className='modal-box'>
					<h3 className='font-bold text-lg text-[#E74C3C]'>Hapus Pelanggaran</h3>
					<p className='py-4'>Yakin ingin menghapus data ini?</p>
					<div className='modal-action'>
						<form method='dialog'>
							<Button className='btn !rounded-lg !me-4'>Tutup</Button>
							<Button
								onClick={() => deletePelanggaran(selectedId)}
								className='btn !rounded-lg text-[#E74C3C]'
							>
								Hapus
							</Button>
						</form>
					</div>
				</div>
			</dialog>
		</> 
	)
}
