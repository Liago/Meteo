import { useDispatch } from "react-redux";

import { IonIcon, IonItem, IonLabel } from "@ionic/react";
import { removeCircle } from "ionicons/icons";

import { removeLocation, removeLocationForecastData } from '../../store/actions'

const MenuLocations = ({ locations, selectCity }) => {
	const dispatch = useDispatch()

	const removeHandler = (cityId) => {
		dispatch(removeLocation(cityId))
		dispatch(removeLocationForecastData(cityId))
	}

	return (
		locations.map(city => (
			<IonItem 
			key={city.id} 
			lines="none" 
			onClick={() => selectCity(city)}
			>
				<IonIcon
					slot="start"
					color="danger"
					icon={removeCircle}
					onClick={() => removeHandler(city.id)}
				/>
				<IonLabel>{city.name}</IonLabel>
			</IonItem>
		))
	)
}

export default MenuLocations;