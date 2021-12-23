import { IonContent, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonMenu, IonMenuToggle, IonNote, IonToggle } from "@ionic/react";

import { useLocation } from "react-router-dom";
import { ThemeContext } from "./themeContext";
import {
	archiveOutline,
	archiveSharp,
	bookmarkOutline,
	heartOutline,
	heartSharp,
	mailOutline,
	mailSharp,
	paperPlaneOutline,
	paperPlaneSharp,
	trashOutline,
	trashSharp,
	warningOutline,
	warningSharp,
} from "ionicons/icons";
import "./Menu.css";
import { useContext } from "react";

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
	// {
	// 	title: "Favorites",
	// 	url: "/page/Favorites",
	// 	iosIcon: heartOutline,
	// 	mdIcon: heartSharp,
	// },
	// {
	// 	title: "Archived",
	// 	url: "/page/Archived",
	// 	iosIcon: archiveOutline,
	// 	mdIcon: archiveSharp,
	// },
	// {
	// 	title: "Trash",
	// 	url: "/page/Trash",
	// 	iosIcon: trashOutline,
	// 	mdIcon: trashSharp,
	// },
	// {
	// 	title: "Spam",
	// 	url: "/page/Spam",
	// 	iosIcon: warningOutline,
	// 	mdIcon: warningSharp,
	// },
];

const labels = ["Family", "Friends", "Notes", "Work", "Travel", "Reminders"];

const Menu = () => {
	const location = useLocation();

	const { toggle, toggleFunction } = useContext(ThemeContext);

	return (
		<IonMenu contentId="main" type="overlay">
			<IonContent>
				<IonList id="inbox-list">
					<IonListHeader>My Meteo</IonListHeader>
					<IonItem lines="none">
						<IonToggle checked={toggle} onIonChange={toggleFunction} />
					</IonItem>
					{appPages.map((appPage, index) => {
						return (
							<IonMenuToggle key={index} autoHide={false}>
								<IonItem
									className={location.pathname === appPage.url ? "selected" : ""}
									routerLink={appPage.url}
									routerDirection="none"
									lines="none"
									detail={false}
								>
									<IonIcon slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
									<IonLabel>{appPage.title}</IonLabel>
								</IonItem>
							</IonMenuToggle>
						);
					})}
				</IonList>
{/* 
				<IonList id="labels-list">
					<IonListHeader>Labels</IonListHeader>
					{labels.map((label, index) => (
						<IonItem lines="none" key={index}>
							<IonIcon slot="start" icon={bookmarkOutline} />
							<IonLabel>{label}</IonLabel>
						</IonItem>
					))}
				</IonList> */}
			</IonContent>
		</IonMenu>
	);
};

export default Menu;
