import { IonButton, IonButtons, IonHeader, IonIcon, IonMenuButton, IonTitle, IonToolbar } from "@ionic/react";
import { reload, search } from "ionicons/icons";

const HeaderToolbar = ({ renderCityName, setShowModal, showModal, refreshForecast }) => {
	return (
		<IonHeader>
			<IonToolbar>
				<IonButtons slot="start">
					<IonMenuButton color="dark" />
				</IonButtons>
				<IonTitle className="text-left">{renderCityName()}</IonTitle>
				<IonButtons slot="primary">
					<IonButton
						color="dark"
						onClick={() => refreshForecast()}
						>
						<IonIcon slot='icon-only' icon={reload} />
					</IonButton>
					<IonButton
						color="dark"
						onClick={() => setShowModal(!showModal)}
					>
						<IonIcon slot="icon-only" icon={search} />
					</IonButton>
				</IonButtons>
			</IonToolbar>
		</IonHeader>
	)
}
export default HeaderToolbar;