import { IonButton, IonButtons, IonHeader, IonIcon, IonMenuButton, IonTitle, IonToolbar } from "@ionic/react";
import { addCircleOutline, reload, warningOutline } from "ionicons/icons";

const HeaderToolbar = ({ renderCityName, setShowModal, showModal, refreshForecast, showAlert, areThereAlerts, setShowMainModal }) => {
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
				<IonTitle
					className="text-left"
					onClick={() => setShowMainModal(true)}
				>
					{renderCityName()}
				</IonTitle>
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
						<IonIcon slot="icon-only" icon={addCircleOutline} />
					</IonButton>
				</IonButtons>
			</IonToolbar>
		</IonHeader>
	)
}
export default HeaderToolbar;