import { getPercent, getTemp, getDataFormatted } from "utils/utils";
import { round } from 'lodash';

const DetailsInfo = ({ data }) => {
	return (
		<div className="shadow-md bg-gray-100 rounded-lg w-full mx-auto my-3 p-3">
			<div>
				<p className="text-md font-medium">Dettagli</p>
			</div>
			<div className="text-md">
				
			</div>
			<div className="text-xs font-light">
				<div className="flex justify-between">
					<span>Temp. percepita</span>
					<span>{getTemp(data.apparentTemperatureHigh)}</span>
				</div>
				<div className="flex justify-between">
					<span>Umidità</span>
					<span>{getPercent(data.humidity)}</span>
				</div>
				<div className="flex justify-between">
					<span>Visibilità</span>
					<span>{round(data.visibility)}Km</span>
				</div>
				<div className="flex justify-between">
					<span>UV Index</span>
					<span>{data.uvIndex}</span>
				</div>
				<div className="flex justify-between">
					<span>UV Index Time</span>
					<span>{getDataFormatted(data.uvIndexTime, 'HH:mm')}</span>
				</div>
				<div className="flex justify-between">
					<span>Punto di rugiada</span>
					<span>{getTemp(data.dewPoint)}</span>
				</div>
			</div>
		</div>
	)
}
export default DetailsInfo;