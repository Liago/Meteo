import { CardContainer } from "components/UI/cardContainer";
import SunPhase from "./sunPhase";

const SunAndWind = ({ data }) => {
	const { windSpeed, pressure, cloudCover, ozone, windGust, moonPhase } = data;
	return (
		<CardContainer>
			<div>
				<p className="text-md font-medium">Sole e Vento</p>
			</div>
			<div className="pt-6 pb-2 text-xs font-medium">
				<SunPhase
					windSpeed={windSpeed}
					pressure={pressure}
					cloudCover={cloudCover}
					ozone={ozone}
					windGust={windGust}
					moonPhase={moonPhase}
				/>
			</div>
		</CardContainer>

	)
}
export default SunAndWind;