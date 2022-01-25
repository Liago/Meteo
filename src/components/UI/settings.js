import { IonModal } from "@ionic/react";

const Settings = ({ dismiss, passedText }) => {
	return (
		<IonModal
			// isOpen={showModal}
			cssClass='my-custom-class'
			swipeToClose={true}
			// presentingElement={router || undefined}
			onDidDismiss={dismiss}>
			<p>{passedText}</p>
		</IonModal>
	)
}
export default Settings;