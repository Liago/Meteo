import WeatherIcon from "components/UI/weatherIcon"
import { useEffect } from "react"
import { getTemp } from "utils/utils"

const ShortForecastItem = ({ myTime, temperature, icon }) => {

	
	const dayMoment = {
		"moment": {
			"07:00": "Mattina",
			"12:00": "Mezzogiorno",
			"16:00": "Pomeriggio",
			"21:00": "Sera",
			"23:00": "Notte",
		}
	}

	const revertMomentOfDay = (time) => dayMoment['moment'][time]

	return (
		<div className="text-gray-800 flex justify-between">
			<div>{revertMomentOfDay(myTime)}</div>
			<div><WeatherIcon icon={icon} className="text-md text-yellow-600" /></div>
			<div className="text-center">{getTemp(temperature)}</div>
		</div>
	)
}
export default ShortForecastItem;