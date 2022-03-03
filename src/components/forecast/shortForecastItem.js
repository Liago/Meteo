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
		<div className="text-gray-800 text-base font-light grid grid-cols-3">
			<div>{revertMomentOfDay(myTime)}</div>
			<div className="text-center"><WeatherIcon icon={icon} className="text-md text-yellow-600 px-20" /></div>
			<div className="text-right">{getTemp(temperature)}</div>
		</div>
	)
}
export default ShortForecastItem;