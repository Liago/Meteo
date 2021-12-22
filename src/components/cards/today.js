import { getDataFormatted } from "../../utils/utils";
import { round } from 'lodash'

const Today = ({ data, location }) => {
	console.log('Today :>> ', data);
	console.log('Location :>> ', location);
	return (
		<div>
			<div className="py-3"></div>
			<div className="bg-white shadow-md rounded-lg w-80 mx-auto pt-3">
				<div className="px-4 py-5 sm:px-6">
					<div className="flex flex-auto">
						<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
						</svg>
						<h3 className="text-lg leading-6 font-medium text-gray-900 pl-3">{location.city}</h3>
					</div>
					<h3 className="text-right text-sm font-light text-gray-900 pl-3">{getDataFormatted(data.time, 'dddd DD MMMM YYYY')}</h3>
					<div className="flex justify-between pt-8">
						<div className="text-6xl text-grey-600 text-center">
							<i className={`wi wi-day-${data.icon}`} />
						</div>
						<div className="flex justify-between">
							<p className="text-6xl font-medium text-gray-700">{round(data.temperatureHigh)}º</p>
							<p className="text-6xl font-medium text-gray-400">{round(data.temperatureLow)}º</p>
						</div>
					</div>
					<div className="flex justify-between py-3">
						<div className="flex justify-end font-normal text-xs">
							<div className="flex items-center text-gray-700"><i className="wi wi-sunrise text-red-500" /> {getDataFormatted(data.sunriseTime, 'HH:mm')}</div>
							<div className="flex items-center text-gray-700 px-1"><i className="wi wi-sunset text-blue-500" /> {getDataFormatted(data.sunsetTime, 'HH:mm')}</div>
						</div>
						<div className="text-xs text-right font-light text-gray-900">{data.summary}</div>
					</div>
					<div className="flex justify-between w-full font-normal text-xs pt-2">
						<div className="flex items-center text-gray-700 pr-1"><i className="wi wi-rain" />
							<span className="px-1">{data.precipProbability * 100}%</span>
						</div>
						<div className="flex items-center text-gray-700 pl-1"><i className="wi wi-cloud" />
							<span className="px-1">{data.cloudCover * 100}%</span>
						</div>
						<div className="flex items-center text-gray-700 pl-1"><i className="wi wi-strong-wind" />
							<span className="px-1">{round(data.windSpeed, 1)}m/s</span>
						</div>
						<div className="flex items-center text-gray-700 pl-1"><i className="wi wi-humidity" />
							<span className="px-1">{round(data.humidity * 100)}%</span>
						</div>
					</div>
				</div>
			</div>

			{/* <div className="bg-white shadow-md rounded-lg w-72 mx-auto mt-8">
				<div className="px-4 py-5 font-medium">
					<div className="flex justify-between">
						<div className="text-sm font-medium text-gray-500">Copertura nuvolosa</div>
						<div className="text-sm text-gray-900">{data.cloudCover * 100}%</div>
					</div>
					<div className="flex justify-between">
						<div className="text-sm font-medium text-gray-500">Probabilità di pioggia</div>
						<div className="text-sm text-gray-900">{data.precipProbability * 100}%</div>
					</div>
					<div className="flex justify-between">
						<div className="text-sm font-medium text-gray-500">Intensità</div>
						<div className="text-sm text-gray-900">{data.precipIntensity}mm</div>
					</div>
					<div className="flex justify-between pb-1">
						<div className="text-sm font-medium text-gray-500">Precipitazione attesa</div>
						<div className="text-sm text-gray-900">{getDataFormatted(data.precipIntensityMaxTime, 'HH:mm')}</div>
					</div>
					<div className="flex justify-between border-t border-gray-200 py-1">
						<div className="text-sm font-medium text-gray-500">Pressione</div>
						<div className="text-sm text-gray-900">{data.pressure}hPa</div>
					</div>
					<div className="flex justify-between">
						<div className="text-sm font-medium text-gray-500">Umidità</div>
						<div className="text-sm text-gray-900">{data.humidity * 100}%</div>
					</div>
					<div className="flex justify-between">
						<div className="text-sm font-medium text-gray-500">Indice UV</div>
						<div className="text-sm text-gray-900">{data.uvIndex} alle {getDataFormatted(data.uvIndexTime, 'HH:mm')}</div>
					</div>
					<div className="flex justify-between">
						<div className="text-sm font-medium text-gray-500">Visibilità</div>
						<div className="text-sm text-gray-900">{round(data.visibility)}Km</div>
					</div>
					<div className="flex justify-between">
						<div className="text-sm font-medium text-gray-500">Vento</div>
						<div className="text-sm text-gray-900">{round(data.windSpeed, 1)}m/s</div>
					</div>
				</div>
			</div> */}
		</div>
	);
};
export default Today;
