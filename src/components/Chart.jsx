import { allPelanggaranFn } from '@/api/Pelanggaran'
import { useQuery } from 'react-query'
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from 'recharts'

const Chart = ({ dataPelanggaran }) => {
	const dataByMonth = Array.isArray(dataPelanggaran.data)
		? dataPelanggaran.data.reduce((result, item) => {
				const date = new Date(item.tanggal)
				const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`

				console.log(`Date: ${date}, monthYear: ${monthYear}`)

				if (!result[monthYear]) {
					result[monthYear] = 0
				}

				result[monthYear] += 1

				return result
		  }, {})
		: {}

	console.log(dataByMonth)

	console.log(dataPelanggaran)

	return (
		<ResponsiveContainer className='w-full' height={300}>
			<BarChart
				data={Object.keys(dataByMonth).map((bulan) => ({
					bulan,
					jumlah_pelanggaran: dataByMonth[bulan],
				}))}
			>
				{/* <CartesianGrid strokeDasharray='3 3' /> */}
				<XAxis
					dataKey='bulan'
					// label={{ value: 'Bulan', position: 'insideBottom' }}
				/>
				<YAxis
				// label={{
				// 	value: 'Jumlah Pelanggaran',
				// 	angle: -90,
				// 	position: 'insideLeft',
				// }}
				/>
				<Legend />
				<Tooltip />

				<Bar dataKey='jumlah_pelanggaran' fill='#8884d8' />
			</BarChart>
		</ResponsiveContainer>
	)
}

export default Chart
