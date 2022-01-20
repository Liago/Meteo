import WeatherIcon from "components/UI/weatherIcon";

import { getDataFormatted, getPercent, getTemp } from "../../utils/utils";
import { round } from 'lodash'

const Today = ({ data, summary }) => {
	const renderTemperature = () => {
		if (data.temperatureHigh)
			return <div className="flex justify-between">
				<p className="text-6xl font-medium text-gray-700">{getTemp(data.temperatureHigh)}</p>
				<p className="text-6xl font-medium text-gray-400">{getTemp(data.temperatureLow)}</p>
			</div>

		return <div className="flex justify-between">
			<p className="text-6xl font-medium text-gray-700">{getTemp(data.temperature)}</p>
		</div>
	}
	const renderSunriseTime = () => {
		if (!data.sunriseTime) return;

		return (
			<>
				<div className="flex items-center text-gray-700">
					<WeatherIcon className='text-gray-500' icon='sunrise' />
					{getDataFormatted(data.sunriseTime, 'HH:mm')}
				</div>
				<div className="flex items-center text-gray-700 px-1">
					<WeatherIcon className='text-gray-500' icon='sunset' />
					{getDataFormatted(data.sunsetTime, 'HH:mm')}
				</div>
			</>
		)
	}
	const renderCardHeader = () => {
		if (data.sunriseTime)
			return (
				<div className="text-right">
					<h3 className="text-right text-sm font-light text-gray-900 pl-3">{getDataFormatted(data.time, 'dddd DD MMMM YYYY')}</h3>
					<span className="text-sm lowercase font-light text-red-700 pl-3">{data.summary}</span>
				</div>
			)

		return (
			<>
				<h3 className="text-right text-sm font-light text-gray-900 pl-3">Adesso, {getDataFormatted(data.time, 'dddd DD MMMM YYYY')}</h3>
				<div className="flex justify-end">
					{/* <i className={`wi wi-${getWeatherIcon(summary.icon)}`} /> */}
					<span className="text-sm lowercase font-light text-red-700 pl-3">{summary.text}</span>
				</div>
			</>
		)
	}
	return (
		<div>
			<div className="bg-white shadow-md rounded-lg w-full pt-3">
				<div className="px-4 py-5 sm:px-6">
					{renderCardHeader()}
					<div className="flex justify-between pt-8">
						<div className="text-6xl text-grey-600 text-center">
							<WeatherIcon icon={data.icon} />
						</div>
						{renderTemperature()}
					</div>
					<div className="flex justify-between pt-3 pb-1.5">
						<div className="flex justify-end font-normal text-xs">
							{renderSunriseTime()}
						</div>
						<div className="text-xs text-right font-light text-gray-900">{data.summary}</div>
					</div>
					<div className="flex justify-between w-full font-normal text-xs pt-2">
						<div className="flex items-center text-gray-700 pr-1">
							<WeatherIcon icon='rain' />
							<span className="px-1">{getPercent(data.precipProbability)}</span>
						</div>
						<div className="flex items-center text-gray-700 pl-1">
							<WeatherIcon icon='cloud' />
							<span className="px-1">{getPercent(data.cloudCover)}</span>
						</div>
						<div className="flex items-center text-gray-700 pl-1">
							<WeatherIcon icon='strong-wind' />
							<span className="px-1">{round(data.windSpeed, 1)}m/s</span>
						</div>
						<div className="flex items-center text-gray-700 pl-1">
							<WeatherIcon icon='humidity' />
							<span className="px-1">{getPercent(data.humidity)}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default Today;
