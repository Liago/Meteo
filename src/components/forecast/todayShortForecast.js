import { useEffect } from "react"
import { getDataFormatted } from "utils/utils";
import ShortForecastItem from "./shortForecastItem";

import moment from "moment";

const TodayShortForecast = ({ hourly }) => {
	const renderCards = () => {
		return (
			hourly.map(item => {
				const { time, temperature, icon } = item;
				let myTime = getDataFormatted(time, 'HH:mm');
				const options = { myTime, temperature, icon };
				let temp = new Date();
				let today = moment(temp).format('DD');				
				let day = getDataFormatted(time, 'D');

				if (day > today) return null;
				
				if (myTime === "7:00" || myTime === "12:00" || myTime === "16:00" || myTime === "21:00" || myTime === "23:00")
					return <ShortForecastItem key={item.time} {...options} />
			})
		)
	}

	return (
		<>
			{renderCards()}
		</>
	)
}
export default TodayShortForecast;