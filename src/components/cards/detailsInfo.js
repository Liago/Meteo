import { getPercent, getTemp, getDataFormatted } from "utils/utils";
import { round } from 'lodash';
import WeatherIcon from "components/UI/weatherIcon";
import SunriseContainer from "components/forecast/sunrise";
import CardContainer from "components/UI/cardContainer";

const DetailsInfo = ({ data }) => {
	return (
		<CardContainer>
			<div>
				<p className="text-md font-medium">Dettagli</p>
			</div>
			<div className="grid grid-cols-2 pt-6 pb-2">
				<div className="text-center">
					<WeatherIcon className='text-7xl' icon={data.icon} />
					<div className="flex justify-center text-xs font-light pt-8">
						<SunriseContainer data={data} />
					</div>
				</div>
				<div className="text-xs font-light">
					<div className="flex justify-between">
						<span>Max temp.</span>
						<span>{getTemp(data.apparentTemperatureHigh)}</span>
					</div>
					<div className="flex justify-between">
						<span>Max temp. perc.</span>
						<span>{getTemp(data.temperatureHigh)}</span>
					</div>
					<div className="flex justify-between">
						<span>Max temp. time</span>
						<span>{getDataFormatted(data.apparentTemperatureHighTime, 'HH:mm')}</span>
					</div>
					<div className="flex justify-between">
						<span>Min temp.</span>
						<span>{getTemp(data.apparentTemperatureMin)}</span>
					</div>
					<div className="flex justify-between">
						<span>Min temp. perc.</span>
						<span>{getTemp(data.temperatureMin)}</span>
					</div>
					<div className="flex justify-between">
						<span>Min temp. time</span>
						<span>{getDataFormatted(data.apparentTemperatureMinTime, 'HH:mm')}</span>
					</div>
					<div className="border border-t-1 my-2" />
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
		</CardContainer>

	)
}
export default DetailsInfo;