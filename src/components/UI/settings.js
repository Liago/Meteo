import { useContext } from "react";
import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonPage, IonTitle, IonToggle, IonToolbar } from "@ionic/react";
import { close } from "ionicons/icons";

import { ThemeContext } from "components/themeContext";



const Settings = ({ onDismiss, onReset, autoUpdates, setAutoUpdates }) => {
	const { toggle, toggleFunction } = useContext(ThemeContext);
	
	return (

		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Impostazioni</IonTitle>
					<IonButtons slot="end">
						<IonButton onClick={onDismiss}>
							<IonIcon slot="icon-only" icon={close} />
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				<IonList id="inbox-list">
					<IonListHeader></IonListHeader>
					<IonItem lines="none">
						<IonLabel>Dark mode</IonLabel>
						<IonToggle checked={toggle} onIonChange={toggleFunction} />
					</IonItem>
					<IonItem lines="none">
						<IonLabel>Aggiornamento giornaliero previsioni</IonLabel>
						<IonToggle checked={autoUpdates} onIonChange={setAutoUpdates} />
					</IonItem>
					<IonItem lines="none">
						<IonLabel>Reset località</IonLabel>
						<IonButton
							shape="round"
							fill="outline"
							onClick={onReset}
						>
							Reset
						</IonButton>
					</IonItem>
				</IonList>
			</IonContent>
		</IonPage>
	)
}
export default Settings;