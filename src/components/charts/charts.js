import { Chart } from "react-google-charts";

const Charts = ({ data, options, type }) => {
	const labels = [['ora', options.label]]
	const chartData = [].concat(labels, data)

	return (
		<Chart
			width={350}
			height={150}
			chartType={type}
			loader={<div>Caricamento</div>}
			data={chartData}
			options={{
				title: options.title,
				chartArea: { width: '80%' },
				hAxis: {
					title: options.labelX,
				},
				vAxis: {
					title: options.labelY,
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