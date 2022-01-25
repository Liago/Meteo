import { IonActionSheet } from "@ionic/react";
import { caretForwardCircle, close, heart, share, trash } from "ionicons/icons";

const Action = ({ showActionSheet, setShowActionSheet }) => {
	return (
		<IonActionSheet
			isOpen={showActionSheet}
			onDidDismiss={() => setShowActionSheet(false)}
			cssClass='my-custom-class'
			buttons={[{
				text: 'Delete',
				role: 'destructive',
				icon: trash,
				id: 'delete-button',
				data: {
					type: 'delete'
				},
				handler: () => {
					console.log('Delete clicked');
				}
			}, {
				text: 'Share',
				icon: share,
				data: 10,
				handler: () => {
					console.log('Share clicked');
				}
			}, {
				text: 'Play (open modal)',
				icon: caretForwardCircle,
				data: 'Data value',
				handler: () => {
					console.log('Play clicked');
				}
			}, {
				text: 'Favorite',
				icon: heart,
				handler: () => {
					console.log('Favorite clicked');
				}
			}, {
				text: 'Cancel',
				icon: close,
				role: 'cancel',
				handler: () => {
					console.log('Cancel clicked');
				}
			}]}
		>
		</IonActionSheet>
	)
}
export default Action;