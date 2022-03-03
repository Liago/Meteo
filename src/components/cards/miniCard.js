import WeatherIcon from "../UI/weatherIcon";
import { MiniCardContainer } from '../UI/cardContainer';

const MiniCardInfo = ({ icon, label, value, unit, fontSize, additionaClassName }) => {
	return (
		<MiniCardContainer additionalClass={`${additionaClassName}`}>
			<div className={fontSize}>
				<WeatherIcon icon={icon} />
				<span className="font-light"> {label}</span>
				<p className="text-center pt-2">{value}{unit}</p>
			</div>
		</MiniCardContainer>
	)
}

export default MiniCardInfo;