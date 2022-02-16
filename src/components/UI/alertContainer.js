import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { close } from "ionicons/icons";
import { getDataFormatted } from "utils/utils";
import { CardContainer } from "./cardContainer";

const AlertContainer = ({ alerts, onDismiss }) => {
	const renderContent = () => {
		if (!alerts) return;

		return (
			alerts.map((alert, i) => {
				return (
					<CardContainer key={alert.time} className="px-3">
						<div className="p-2">
							<h3 className="text-amber-500 font-medium">Alert #{i + 1}</h3>
							<div className="py-4 flex flex-col text-sm font-medium text-gray-500">
								<p>Emitted: {getDataFormatted(alert.time, 'DD/MM/YYYY HH:mm')}</p>
								<p>Expires: {getDataFormatted(alert.expires, 'DD/MM/YYYY HH:mm')}</p>
							</div>
							<p className="text-xl font-medium text-gray-600 py-1 border-b-2 border-gray-500">{alert.title}</p>
							<p className="text-md font-light text-gray-800 pt-3">{alert.description}</p>
							<div className="py-2 ">
								<p className="text-md font-medium text-gray-800">Validity</p>
								{alert.regions.map(region => {
									return (
										<p className="text-md font-light text-gray-800">{region}</p>
									)
								})}
							</div>
						</div>
					</CardContainer>
				)
			})
		)
	}

	return (
		<IonContent>
			<IonPage>
				<IonHeader>
					<IonToolbar>
						<IonTitle>Alerts</IonTitle>
						<IonButtons slot="end">
							<IonButton onClick={() => onDismiss()}>
								<IonIcon slot="icon-only" icon={close} />
							</IonButton>
						</IonButtons>
					</IonToolbar>
				</IonHeader>
				<IonContent fullscreen>
					<div className="px-5">
						{renderContent()}
					</div>
				</IonContent>
			</IonPage>
		</IonContent>
	)
}
export default AlertContainer;