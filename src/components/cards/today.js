import WeatherIcon from "components/UI/weatherIcon";

import { getDataFormatted, getPercent, getTemp } from "../../utils/utils";
import { round } from 'lodash'
import SunriseContainer from "components/forecast/sunrise";
import MiniCardInfo from "components/UI/miniCard";

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

		return <SunriseContainer data={data} />
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
					<span className="text-right text-sm lowercase font-light text-blue-500 pl-3">{summary.text}</span>
				</div>
			</>
		)
	}
	return (
		<div>
			<div className="bg-white dark:bg-black w-full pt-3 h-screen">
				<div className="px-2 py-5 h-full">
					{renderCardHeader()}
					<div className="flex flex-col h-full">
						<div>
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
						</div>
						<div className="flex-grow">
							<div className="grid grid-cols-4 gap-1 text-xs font-medium">
								<MiniCardInfo
									icon='rain'
									label='Prob.'
									fontSize='text-xs'
									value={getPercent(data.precipProbability)}
								/>
								<MiniCardInfo
									icon='cloud'
									label='Cop.'
									fontSize='text-xs'
									value={getPercent(data.cloudCover)}
								/>
								<MiniCardInfo
									icon='windy'
									label='Vento'
									fontSize='text-xs'
									value={round(data.windSpeed, 1)}
									unit='m/s'
								/>
								<MiniCardInfo
									icon='humidity'
									label='Umidità'
									fontSize='text-xs'
									value={getPercent(data.humidity)}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default Today;
