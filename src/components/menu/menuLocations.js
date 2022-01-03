import { IonIcon, IonItem, IonLabel } from "@ionic/react";
import { bookmarkOutline } from "ionicons/icons";

const MenuLocations = ({ locations }) => {
	return (
		locations.map(city => (
			<IonItem lines="none" key={city.id}>
				<IonIcon slot="start" icon={bookmarkOutline} />
				<IonLabel>{city.name}</IonLabel>
			</IonItem>
		))
	)
}

export default MenuLocations;