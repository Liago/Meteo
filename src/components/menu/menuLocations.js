import { useDispatch, useSelector } from "react-redux";

import { IonIcon, IonItem, IonLabel, useIonToast } from "@ionic/react";
import { removeCircle } from "ionicons/icons";

import { removeLocation, removeLocationForecastData } from '../../store/actions'

const MenuLocations = ({ locations, selectCity }) => {
	const dispatch = useDispatch();
	const { selectedLocation } = useSelector(state => state.app);
	const [showAlert] = useIonToast();

	const removeHandler = (cityId) => {
		if (selectedLocation.place_id === cityId) {
			showAlert({ message: 'Non puoi rimuovere la località attiva in questo momento', duration: 1500 });
			return;
		}

		dispatch(removeLocation(cityId))
		dispatch(removeLocationForecastData(cityId))
	}
	const displayCity = (city) => {
		const label = city.split(',')[0]
		return (
			<IonLabel>{label}</IonLabel>
		)
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
					onClick={(e) => {
						e.stopPropagation();
						removeHandler(city.place_id);
					}}
				/>
				{displayCity(city.display_name)}
			</IonItem>
		))
	)
}

export default MenuLocations;