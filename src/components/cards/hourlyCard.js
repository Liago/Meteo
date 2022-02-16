import WeatherIcon from "../UI/weatherIcon";
import { MiniCardContainer } from '../UI/cardContainer';

import { getDataFormatted, getTemp } from "utils/utils";

const HourlyCard = ({ item }) => {
	const { time, icon, temperature } = item;

	return (
		<MiniCardContainer additionalClass="px-4">
			<div className="flex flex-col text-center text-md">
				<p className="font-lightm">{getDataFormatted(time, 'H')}</p>
				<div className="text-center">
					<WeatherIcon icon={icon} className="text-md" />
				</div>
				<p className="text-center pt-2">{getTemp(temperature)}</p>
			</div>
		</MiniCardContainer>
	)
}

export default HourlyCard;