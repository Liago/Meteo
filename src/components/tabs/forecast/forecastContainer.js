import Daily from "components/cards/daily";
import Charts from "components/charts/charts";
import { useSelector } from "react-redux";
import { getChartData } from "utils/utils";

const ForecastContainer = ({ data, pageRef }) => {
	const { forecast } = useSelector(state => state);
	const { selectedLocation } = useSelector(state => state.app);

	const chartTemp = getChartData(forecast[selectedLocation?.place_id]?.hourly?.data, 'temperature');
	const chartWind = getChartData(forecast[selectedLocation?.place_id]?.hourly?.data, 'windSpeed');

	const renderdaysOfWeek = () => {
		return (
			data.map((day, i) => {
				if (i >= 1)
					return (
						<Daily
							key={i}
							data={day}
							pageRef={pageRef}
						/>
					)
			})
		)
	}

	return (
		<>
			{renderdaysOfWeek()}
			<div className="container mx-auto px-4">
				<Charts
					type='AreaChart'
					data={chartTemp.dataset}
					chartTitle='Temperatura Massima'
					options={{
						title: 'Temperatura Massima',
						// labelX: 'orario',
						labelY: 'gradi'
					}}
					/>
			</div>
			<div className="container mx-auto px-4">
				<Charts
					type='AreaChart'
					data={chartWind.dataset}
					options={{
						title: 'Variazione vento',
						// labelX: 'orario',
						labelY: 'velocità m/s'
					}}
					/>
			</div>
		</>
	)




}
export default ForecastContainer;