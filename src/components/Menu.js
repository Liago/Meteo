import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IonContent, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonMenu, useIonActionSheet, useIonModal, useIonToast } from "@ionic/react";
import { cogOutline, cogSharp } from "ionicons/icons";

import MenuLocations from "./menu/menuLocations";
import { MenuItems } from "./menu/menuItems";
import Container from "./UI/container";

import { automaticUpdates, resetStore, setCurrentLocation } from "store/actions";

import { appPages } from "utils/config";
import "./Menu.css";
import Settings from "./UI/settings";

const Menu = () => {
	const dispatch = useDispatch();
	const [showAlert] = useIonToast();
	const { locations, autoUpdates } = useSelector(state => state.app);
	const menuRef = useRef();

	useEffect(() => {
		showAlert({ message: `Aggiornamento previsioni località ${autoUpdates ? 'attivato' : 'disattivato'}`, duration: 1500 });
	}, [autoUpdates])


	const handleDismiss = () => dismiss()
	const resetHandler = () => {
		resetConfirm({
			buttons: [{
				text: 'Cancella',
				role: 'destructive',
				data: {
					type: 'delete'
				},
				handler: () => dispatch(resetStore())
			}, {
				text: 'Annulla',
				role: 'cancel',
				handler: () => {
					console.log('Cancel clicked');
				}
			}],
			header: 'Conferma cancellazione',
			subHeader: 'Il reset comporterà la cancellazione di tutte le località salvate. Vuoi procedere comunque?',
			cssClass: 'action-sheet-custom',
		})
	}

	const setAutoUpdates = () => dispatch(automaticUpdates(!autoUpdates))

	const [present, dismiss] = useIonModal(Settings, {
		onDismiss: handleDismiss,
		onReset: resetHandler,
		presentingElement: menuRef,
		autoUpdates: autoUpdates,
		setAutoUpdates: setAutoUpdates
	});
	const [resetConfirm] = useIonActionSheet();


	const renderLocationsSaved = () => {
		if (!locations) return;

		return <MenuLocations locations={locations} selectCity={cityHandler} />
	}

	const renderMenu = () => {
		return <MenuItems items={appPages} />
	}

	const cityHandler = (location) => dispatch(setCurrentLocation(location))


	return (
		<IonMenu contentId="main" type="overlay" ref={menuRef}>
			<IonContent>
				<IonList id="inbox-list">
					<IonListHeader>My Meteo</IonListHeader>
					<IonItem
						lines="none"
						onClick={() => present()}
					>
						<IonIcon
							slot="start"
							ios={cogOutline}
							md={cogSharp}
						/>
						<IonLabel>Impostazioni</IonLabel>
					</IonItem>
					{renderMenu()}
				</IonList>
				<IonList id="labels-list">
					<IonListHeader>Città</IonListHeader>
					<Container paddingX={0} marginX={0}>
						{renderLocationsSaved()}
					</Container>
				</IonList>

			</IonContent>
		</IonMenu>
	);
};

export default Menu;
