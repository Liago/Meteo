import { getDataFormatted, getWeatherIcon } from "../../utils/utils";
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/outline'
import { round } from 'lodash'

const Daily = ({ data }) => {
	return (
		<div className="bg-white shadow-md rounded-lg w-full mx-auto my-3 pt-3">
			<div className="px-4 py-5">
				<div className="grid grid-cols-7 gap-4">
					<div className="text-center">
						<p className="font-light text-sm">{getDataFormatted(data.time, 'ddd')}</p>
						<p className="font-normal">{getDataFormatted(data.time, 'DD')}</p>
					</div>
					<div className="col-span-5 text-base font-light">
						<p>{data.summary}</p>
						<div className="font-normal flex">
							<div className="text-red-500 pr-2 flex items-center">{round(data.temperatureHigh)}° <ArrowUpIcon className="h-3 w-3 text-red-500" /></div>
							<div className="text-blue-500 flex items-center">{round(data.temperatureLow)}° <ArrowDownIcon className="h-3 w-3 text-blue-500" /></div>
						</div>
					</div>
					<div className="text-center text-sm">
						<i className={`wi wi-${getWeatherIcon(data.icon)}`} />
						<div className="font-light">{round(data.precipProbability * 100)}%</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default Daily;
