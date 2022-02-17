import { useSelector } from "react-redux"
import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonModal, IonPage, IonTitle, IonToolbar } from "@ionic/react"
import { close } from "ionicons/icons"

import DetailsInfo from "components/cards/detailsInfo"
import SunAndWind from "components/sunWind"
import Container from "components/UI/container"

const ModalDailyInfo = ({ data, showModal, closeModal, pageRef }) => {
	const { showInfo } = useSelector(state => state.app)

	return (
		<IonModal
			isOpen={showInfo}
			swipeToClose={true}
			presentingElement={pageRef.current || undefined}
		>
			<IonContent>
				<IonPage>
					<IonHeader>
						<IonToolbar>
							<IonTitle>Dettagli</IonTitle>
							<IonButtons slot="end">
								<IonButton onClick={() => closeModal()}>
									<IonIcon slot="icon-only" icon={close} />
								</IonButton>
							</IonButtons>
						</IonToolbar>
					</IonHeader>
					<IonContent fullscreen>
						<Container paddingX="4">
							<DetailsInfo data={data} />
							<SunAndWind data={data} />
						</Container>
					</IonContent>
				</IonPage>
			</IonContent>
		</IonModal>
	)
}
export default ModalDailyInfo;