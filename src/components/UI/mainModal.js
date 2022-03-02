import { IonLabel, IonModal, IonSegment, IonSegmentButton, IonToolbar } from "@ionic/react";

const MainModal = ({ showModal, setShowModal, children, tab, setTab }) => {
	return (
		<IonModal
			isOpen={showModal}
			initialBreakpoint={0.65}
			breakpoints={[0.4, 0.65, 1]}
			onDidDismiss={() => setShowModal(false)}
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
			{children}
		</IonModal>
	)
}
export default MainModal;
