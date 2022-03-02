
import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonModal, IonPage, IonTitle, IonToolbar } from "@ionic/react"
import { close } from "ionicons/icons"

import DetailsInfo from "components/cards/detailsInfo"
import SunAndWind from "components/sunWind"
import Container from "components/UI/container"

const ModalDailyInfo = ({ data, showModal, setShowModal }) => {

	return (
		<IonModal
			isOpen={showModal}
			initialBreakpoint={0.5}
			breakpoints={[0, 0.5, 1]}
			onDidDismiss={() => setShowModal(false)}
		>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Dettagli</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				<Container paddingX="4">
					<DetailsInfo data={data} />
					<SunAndWind data={data} />
				</Container>
			</IonContent>
		</IonModal>
	)
}
export default ModalDailyInfo;