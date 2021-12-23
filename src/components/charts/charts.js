import { Chart } from "react-google-charts";

const Charts = ({ data }) => {

	const labels = [['ora', 'temperatura']]
	const chartData = [].concat(labels, data)

	return (
		<Chart
			width={350}
			height={300}
			chartType="AreaChart"
			loader={<div>Caricamento</div>}
			data={chartData}
			options={{
				title: 'Dati orari',
				chartArea: { width: '80%' },
				hAxis: {
					title: 'Orario',
				},
				vAxis: {
					title: 'Gradi',
				},
				animation: {
					startup: true,
					easing: 'linear',
					duration: 1500,
				},
				legend: "none"
			}}
			legendToggle
		/>
	)
}
export default Charts;