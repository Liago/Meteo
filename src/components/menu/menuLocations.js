import { useDispatch, useSelector } from "react-redux";

import { IonIcon, IonItem, IonLabel } from "@ionic/react";
import { removeCircle } from "ionicons/icons";

import { removeLocation, removeLocationForecastData} from '../../store/actions'

const MenuLocations = ({ locations, selectCity }) => {
	const dispatch = useDispatch()
	const { selectedLocationId } = useSelector(state => state.app)

	const removeHandler = (cityId) => {
		if (selectedLocationId.place_id === cityId)
			return;

		dispatch(removeLocation(cityId))
		dispatch(removeLocationForecastData(cityId))
	}

	return (
		locations.map(city => (
			<IonItem
				key={city.place_id}
				lines="none"
				onClick={() => selectCity(city)}
			>
				<IonIcon
					slot="start"
					color="danger"
					icon={removeCircle}
					onClick={() => removeHandler(city.place_id)}
				/>
				<IonLabel>{city.display_name}</IonLabel>
			</IonItem>
		))
	)
}

export default MenuLocations;