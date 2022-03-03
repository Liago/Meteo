import { IonButton, IonButtons, IonHeader, IonIcon, IonMenuButton, IonTitle, IonToolbar } from "@ionic/react";
import { reload, search, warningOutline } from "ionicons/icons";

const HeaderToolbar = ({ renderCityName, setShowModal, showModal, refreshForecast, showAlert, areThereAlerts }) => {
	const renderAlertsButton = () => {
		if (!areThereAlerts) return;

		return (
			<IonButton
				color="warning"
				onClick={() => showAlert()}
			>
				<IonIcon slot='icon-only' icon={warningOutline} />
			</IonButton>
		)
	}

	return (
		<IonHeader>
			<IonToolbar className="font-lato">
				<IonButtons slot="start">
					<IonMenuButton color="dark" />
				</IonButtons>
				<IonTitle className="text-left">{renderCityName()}</IonTitle>
				<IonButtons slot="primary">
					{renderAlertsButton()}
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