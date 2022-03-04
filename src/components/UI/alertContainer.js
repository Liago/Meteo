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
					<CardContainer key={i} className="px-3">
						<div className="p-2">
							<div className="py-3 border-b border-gray-300">
								<h3 className="text-amber-500 font-medium">Allerta #{i + 1}</h3>
								<p>Emessa il {getDataFormatted(alert.time, 'DD/MM/YYYY HH:mm')}</p>
							</div>
							<p className="text-xl font-medium text-gray-600 py-1 border-b-2 border-gray-500">{alert.title}</p>
							<p className="text-md font-light text-gray-800 pt-3 text-justify">{alert.description}</p>
							<div className="py-2">
								<p className="text-md font-medium text-gray-800">Zone interessate</p>
								{alert.regions.map((region, i) => {
									return (
										<p
											key={i}
											className="text-md font-light text-gray-800">
											{region}
										</p>
									)
								})}
							</div>
						</div>
						<div className="py-3 border-t border-gray-300 text-gray-600">
							<p>Scade il {getDataFormatted(alert.expires, 'DD/MM/YYYY HH:mm')}</p>
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