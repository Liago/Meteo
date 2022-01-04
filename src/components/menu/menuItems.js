import { useLocation } from "react-router";
import { IonIcon, IonItem, IonLabel, IonMenuToggle } from "@ionic/react";


export const MenuItems = ({ items }) => {
	const location = useLocation();
	return (
		items.map((appPage, index) => {
			return (
				<IonMenuToggle key={index} autoHide={false}>
					<IonItem
						className={location.pathname === appPage.url ? "selected" : ""}
						routerLink={appPage.url}
						routerDirection="none"
						lines="none"
						detail={false}
					>
						<IonIcon
							slot="start"
							ios={appPage.iosIcon}
							md={appPage.mdIcon}
						/>
						<IonLabel>{appPage.title}</IonLabel>
					</IonItem>
				</IonMenuToggle>
			);
		})
	)
}