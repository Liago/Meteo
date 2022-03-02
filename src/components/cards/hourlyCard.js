import WeatherIcon from "../UI/weatherIcon";
import { MiniCardContainer } from '../UI/cardContainer';

import { getDataFormatted, getTemp } from "utils/utils";

const HourlyCard = ({ item }) => {
	const { time, icon, temperature } = item;

	return (
		<MiniCardContainer additionalClass="px-4">
			<div className="flex flex-col text-center text-md">
				<p className="font-light text-gray-500">{getDataFormatted(time, 'HH:mm')}</p>
				<div className="flex flex-row">
					<div className="text-center">
						<WeatherIcon icon={icon} className="text-md text-yellow-600" />
					</div>
					<p className="text-center">{getTemp(temperature)}</p>
				</div>
			</div>
		</MiniCardContainer>
	)
}

export default HourlyCard;