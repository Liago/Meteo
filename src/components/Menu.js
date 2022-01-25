import { useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IonButton, IonContent, IonItem, IonLabel, IonList, IonListHeader, IonMenu, IonToggle } from "@ionic/react";
import { cogOutline, cogSharp } from "ionicons/icons";

import { ThemeContext } from "./themeContext";

import MenuLocations from "./menu/menuLocations";
import { MenuItems } from "./menu/menuItems";
import Container from "./UI/container";

import { resetStore, setCurrentLocation } from "store/actions";

import { appPages } from "utils/config";
import "./Menu.css";


const Menu = () => {
	const { locations } = useSelector(state => state.app);
	const { toggle, toggleFunction } = useContext(ThemeContext);
	const dispatch = useDispatch();

	const renderLocationsSaved = () => {
		if (!locations) return;

		return <MenuLocations locations={locations} selectCity={cityHandler} />
	}

	const renderMenu = () => {
		return <MenuItems items={appPages} />
	}

	const cityHandler = (location) => dispatch(setCurrentLocation(location))

	const resetHandler = () => dispatch(resetStore())

	return (
		<IonMenu contentId="main" type="overlay">
			<IonContent>
				<IonList id="inbox-list">
					<IonListHeader>My Meteo</IonListHeader>
					<IonItem lines="none">
						<IonLabel>DarkMode</IonLabel>
						<IonToggle checked={toggle} onIonChange={toggleFunction} />
					</IonItem>
					<IonItem lines="none">
						<IonLabel>Reset Store</IonLabel>
						<IonButton
							shape="round"
							fill="outline"
							onClick={() => resetHandler()}
						>
							Reset
						</IonButton>
					</IonItem>
					<IonItem
						lines="none"
						onClick={showSettings}
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
