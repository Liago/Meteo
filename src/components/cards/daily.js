import { getDataFormatted, getWeatherIcon } from "../../utils/utils";
import { round } from 'lodash'

const Daily = ({ data }) => {
	return (
		<div className="bg-white shadow-md rounded-lg w-80 mx-auto my-3 pt-3">
			<div className="px-4 py-5 sm:px-6">
				<div className="grid grid-cols-8 gap-4">
					<div className="text-normal">{getDataFormatted(data.time, 'DD')}</div>
					<div className="text-xs font-light col-span-5">{data.summary}</div>
					<div className="col-span-2 text-center">
						<i className={`wi wi-${getWeatherIcon(data.icon)}`} />
						<div className="text-xs font-light">{round(data.precipProbability * 100)}%</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default Daily;
