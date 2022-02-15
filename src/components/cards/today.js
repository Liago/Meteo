import WeatherIcon from "components/UI/weatherIcon";
import SunriseContainer from "components/forecast/sunrise";
import MiniCardInfo from "components/cards/miniCard";

import { getDataFormatted, getPercent, getTemp } from "../../utils/utils";

import Slider from "react-slick";
import { round } from 'lodash'
import HourlyCard from "./hourlyCard";

const Today = ({ data, today, hourly }) => {
	const slideOptions = {
		dots: false,
		arrows: false,
		slidesToShow: 6,
		slidesToScroll: 6
	};


	const renderHourlyForecast = () => {
		if (!hourly) return;

		return (
			<>
				<Slider
					{...slideOptions}
				>
					{hourly.map(item => {
						return (
							<HourlyCard
								key={item.time}
								item={item}
							/>
						)
					})}
				</Slider>
			</>
		)
	}

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
		if (!today.sunriseTime) return;

		return <SunriseContainer data={today} />
	}
	const renderCardHeader = () => {
		return (
			<>
				<h3 className="text-right text-sm font-light text-gray-900 pl-3">Adesso, {getDataFormatted(data.time, 'dddd DD MMMM YYYY')}</h3>
				<div className="flex justify-end">
					<span className="text-right text-sm lowercase font-light text-gray-900 pl-3">{data.summary}</span>
				</div>
			</>
		)
	}
	return (
		<div className="bg-white dark:bg-black w-full pt-3 h-screen">
			<div className="px-2 py-5 h-full">
				{renderCardHeader()}
				<div className="flex flex-col h-full">
					<div>
						<div className="flex justify-between pt-8">
							<div className={`text-6xl text-grey-600 text-center`}>
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
					<div className="py-3">
					{renderHourlyForecast()}
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
	);
};
export default Today;
