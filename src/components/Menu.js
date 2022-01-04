import { IonContent, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonMenu, IonMenuToggle, IonToggle } from "@ionic/react";

import { useLocation } from "react-router-dom";
import { ThemeContext } from "./themeContext";
import {
	bookmarkOutline,
	mailOutline,
	mailSharp,
	paperPlaneOutline,
	paperPlaneSharp,
} from "ionicons/icons";
import "./Menu.css";
import { useContext } from "react";
import { useSelector } from "react-redux";
import MenuLocations from "./menu/menuLocations";
import { MenuItems } from "./menu/menuItems";


const appPages = [
	{
		title: "Today",
		url: "/",
		iosIcon: mailOutline,
		mdIcon: mailSharp,
	},
	{
		title: "Graph",
		url: "/graph",
		iosIcon: paperPlaneOutline,
		mdIcon: paperPlaneSharp,
	},
];

const Menu = () => {
	
	const { locations } = useSelector(state => state.app);
	const { toggle, toggleFunction } = useContext(ThemeContext);

	const renderLocationsSaved = () => {
		if (!locations) return;

		return <MenuLocations locations={locations} />
	}

	const renderMenu = () => {
		return <MenuItems items={appPages}/>
	}

	return (
		<IonMenu contentId="main" type="overlay">
			<IonContent>
				<IonList id="inbox-list">
					<IonListHeader>My Meteo</IonListHeader>
					<IonItem lines="none">
						<IonToggle checked={toggle} onIonChange={toggleFunction} />
					</IonItem>
					{renderMenu()}
				</IonList>
				<IonList id="labels-list">
					<IonListHeader>Città</IonListHeader>
					{renderLocationsSaved()}
				</IonList>
			</IonContent>
		</IonMenu>
	);
};

export default Menu;
