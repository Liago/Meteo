import Charts from "components/charts/charts";
import { useSelector } from "react-redux";
import { getChartData } from "utils/utils";

const PrecipitationContainer = () => {
	const { forecast } = useSelector(state => state);
	const { selectedLocation } = useSelector(state => state.app);

	const chartPrecipitations = getChartData(forecast[selectedLocation?.place_id]?.daily?.data, 'precipProbability');

	return (
		<>
			<div className="container mx-auto px-4">
				<Charts
					type='ColumnChart'
					data={chartPrecipitations.dataset}
					chartTitle='Temperatura Massima'
					options={{
						title: 'Precipitazioni',
						// labelX: 'orario',
						labelY: '%'
					}}
				/>
			</div>
		</>
	)
}
export default PrecipitationContainer;