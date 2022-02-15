import WeatherIcon from "../UI/weatherIcon";
import { MiniCardContainer } from '../UI/cardContainer';

import { getDataFormatted, getTemp } from "utils/utils";

const HourlyCard = ({ item }) => {
	const { time, icon, temperature } = item;

	return (
		<MiniCardContainer >
			<div className="flex flex-col text-center text-sm">
				{/* <p className="font-light text-xs">{getDataFormatted(time, 'ddd DD')}</p> */}
				<p className="font-light text-xs">{getDataFormatted(time, 'H')}</p>
				<WeatherIcon icon={icon} />
				<p className="text-center pt-2">{getTemp(temperature)}</p>
			</div>
		</MiniCardContainer>
	)
}

export default HourlyCard;