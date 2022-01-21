import WeatherIcon from "./weatherIcon";
import { MiniCardContainer } from './cardContainer';

const MiniCardInfo = ({ icon, label, value, unit }) => {
	return (
		<MiniCardContainer>
			<WeatherIcon icon={icon} />
			<span className="font-light"> {label}</span>
			<p className="text-center pt-2">{value}{unit}</p>
		</MiniCardContainer>
	)
}

export default MiniCardInfo;