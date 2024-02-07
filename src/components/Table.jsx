import { useState, useEffect } from 'react'
import {
	useReactTable,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	flexRender,
	getSortedRowModel,
} from '@tanstack/react-table'
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'

import { classNames } from '@/lib/common'

export const Table = ({
	data = [],
	columns = [],
	setSelectedRows,
	globalFilter,
	setGlobalFilter,
}) => {
	const [rowSelection, setRowSelection] = useState({})
	const [sorting, setSorting] = useState([])

	const table = useReactTable({
		data,
		columns,
		state: {
			rowSelection,
			sorting,
			globalFilter,
		},
		onRowSelectionChange: setRowSelection,
		onGlobalFilterChange: setGlobalFilter,
		globalFilterFn: (row, columnId, filterValue) => {
			const safeValues = (() => {
				const id = columnId || row.id
				const value = row.getValue(id)
				return typeof value === 'number' ? String(value) : value
			})()

			return safeValues.toLowerCase().includes(filterValue.toLowerCase())
		},
		onSortingChange: setSorting,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		debugTable: false,
	})
	const getHeaderLength = () => {
		return table.getHeaderGroups()[0].headers.length
	}

	const selectedRowData = table
		.getSelectedRowModel()
		.flatRows.map((row) => row.original)

	useEffect(() => {
		setSelectedRows?.(selectedRowData)
	}, [rowSelection, selectedRowData, setSelectedRows])

	return (
		<>
			<table
				className='block min-w-full border-separate overflow-x-auto'
				style={{ borderSpacing: 0 }}
			>
				<thead className='bg-[#8884D8]/50'>
					{table.getHeaderGroups().map((headerGroup) => (
						<tr key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<th
									key={header.id}
									scope='col'
									className='whitespace-nowrap bg-[#8884D8]/50 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6 lg:pl-8'
								>
									{header.isPlaceholder
										? null
										: flexRender(
												header.column.columnDef.header,
												header.getContext()
										  )}
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody>
					{data.length === 0 ? (
						<tr>
							<td colSpan={getHeaderLength()}>
								<div className='flex w-full flex-col items-center justify-center'>
									<h1 className='mt-1 text-2xl font-semibold text-gray-900'>
										Tidak ada data
									</h1>
									<p className='text-gray-500'>
										Belum ada data yang tersedia
									</p>
								</div>
							</td>
						</tr>
					) : (
						table.getRowModel().rows.map((row) => (
							<tr key={row.id} className='even:bg-[#70ACC7]/30 '>
								{row.getVisibleCells().map((cell) => (
									<td
										key={cell.id}
										className={classNames(
											row.id !== row.length - 1
												? 'border-b border-gray-200'
												: '',
											'whitespace-nowrap py-4 pl-4 pr-3 text-base text-[#232323E5] sm:pl-6 lg:pl-8'
										)}
									>
										{flexRender(
											cell.column.columnDef.cell,
											cell.getContext()
										)}
									</td>
								))}
							</tr>
						))
					)}
				</tbody>
			</table>
			<div className='mt-4 flex items-center justify-between'>
				<div>
					<p className='text-sm font-semibold text-[#989898]'>
						Page {table.getState().pagination.pageIndex + 1} of{' '}
						{table.getPageCount()}
					</p>
				</div>
				<div className='flex items-center rounded-md border border-[#E1E1E1]'>
					<button
						className={classNames(
							table.getCanPreviousPage()
								? ''
								: 'opacity-60 cursor-not-allowed',
							'border-none p-2'
						)}
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
					>
						<AiOutlineLeft size={16} color='#4658F4' />
					</button>
					<button
						className={classNames(
							table.getCanNextPage()
								? ''
								: 'opacity-60 cursor-not-allowed',
							'border-none p-2'
						)}
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}
					>
						<AiOutlineRight size={16} color='#4658F4' />
					</button>
				</div>
			</div>
		</>
	)
}
