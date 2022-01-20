import { getWeatherIcon } from "utils/utils";

const WeatherIcon = ({ className, icon }) => {
	return <i className={`wi wi-${getWeatherIcon(icon)} ${className}`} /> 
}

export default WeatherIcon;