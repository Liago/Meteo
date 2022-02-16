import { IonContent } from "@ionic/react";

const Layout = ({ children }) => {
	return (
		<IonContent
			className="font-lato"
			fullscreen
		>
			<div>{children}</div>
		</IonContent>
	);
};
export default Layout;
