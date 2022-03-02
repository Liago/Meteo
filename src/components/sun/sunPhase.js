import { IonIcon, IonItem, IonRange } from "@ionic/react";
import { moon, sunny } from "ionicons/icons";

import Container from "components/UI/container";

import moment from "moment";

const SunPhaseComponent = ({ sunsetTime, sunriseTime }) => {
	const now = moment().unix()

	return (
		<Container className="p-4 mt-3">
			<h5 className="text-md font-light capitalize">fase solare</h5>
			<IonItem lines="none">
				<IonRange
					className="p-2"
					min={parseInt(sunriseTime)}
					max={parseInt(sunsetTime)}
					value={parseInt(now)}
					disabled
				/>
				<IonIcon size='small' slot="start" icon={sunny} className="m-0 text-yellow-600 " />
				<IonIcon size='small' slot="end" icon={moon} className="m-0" />
			</IonItem>
		</Container>
	)
}
export default SunPhaseComponent;