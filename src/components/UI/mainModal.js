import { IonContent, IonLabel, IonModal, IonSegment, IonSegmentButton, IonToolbar } from "@ionic/react";

import Spinner from 'components/UI/spinner';

const MainModal = ({ showModal, setShowModal, children, tab, setTab }) => {

	const renderInfoContent = () => {
		if (!children) return <Spinner />;
		
		return (children)
	}


	return (
		<IonModal
			isOpen={showModal}
			initialBreakpoint={0.65}
			breakpoints={[0.4, 0.65, 1]}
			onDidDismiss={() => setShowModal(false)}
			className="main-modal"
		>
			<IonToolbar className="pt-5 pb-2">
				<IonSegment onIonChange={e => setTab(e.detail.value)} value={tab}>
					<IonSegmentButton value="today">
						<IonLabel>Oggi</IonLabel>
					</IonSegmentButton>
					<IonSegmentButton value="forecast">
						<IonLabel>Previsioni</IonLabel>
					</IonSegmentButton>
					<IonSegmentButton value="precipitation">
						<IonLabel>Precipitazioni</IonLabel>
					</IonSegmentButton>
				</IonSegment>
			</IonToolbar>
			<IonContent fullscreen>
				{renderInfoContent()}
			</IonContent>
		</IonModal>
	)
}
export default MainModal;
