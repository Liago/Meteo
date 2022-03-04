import { getDataFormatted, getTemp } from "utils/utils";
import SunriseContainer from "./forecast/sunrise";
import WeatherIcon from "./UI/weatherIcon";

const TodayHeader = ({ data, today }) => {

	const renderCardHeader = () => {
		if (!data) return;

		return (
			<div>
				<h3 className="text-right text-sm font-light text-gray-900 pl-3">{getDataFormatted(data.time, 'dddd DD MMMM YYYY')}</h3>
				<div className="flex justify-end">
					<span className="text-right text-sm lowercase font-light text-gray-900 pl-3">{data.summary}</span>
				</div>
			</div>
		)
	}
	const renderTemperature = () => {
		if (!data) return;

		if (data.temperatureHigh)
			return (
				<div className="flex justify-between">
					<p className="text-6xl font-medium text-gray-700">{getTemp(data.temperatureHigh)}</p>
					<p className="text-6xl font-medium text-gray-400">{getTemp(data.temperatureLow)}</p>
				</div>
			)

		return (
			<div className="flex justify-between">
				<p className="text-8xl font-medium text-gray-700">{getTemp(data.temperature)}</p>
			</div>
		)
	}
	const renderSunriseTime = () => {
		if (!today?.sunriseTime) return;

		return <SunriseContainer data={today} />
	}
	return (
		<div className="bg-white dark:bg-black w-full pt-3">
			<div className="flex flex-col px-2 py-5 h-90">
				{renderCardHeader()}
				<div className="flex flex-col">
					<div>
						<div className="flex justify-between pt-8">
							<div className={`text-8xl text-grey-600 text-center`}>
								<WeatherIcon icon={data.icon} />
							</div>
							{renderTemperature()}
						</div>
						<div className="flex justify-between pt-3 pb-1.5">
							<div className="flex justify-end font-normal text-xs">
								{renderSunriseTime()}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
export default TodayHeader;