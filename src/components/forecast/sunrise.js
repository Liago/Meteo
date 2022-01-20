import WeatherIcon from "components/UI/weatherIcon";
import { getDataFormatted } from "utils/utils";

const SunriseContainer = ({ data }) => {
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
export default SunriseContainer;