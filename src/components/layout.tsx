import { IonContent } from "@ionic/react";
import React from "react";

interface LayoutProps {
	children: any;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {

	return (
		<IonContent fullscreen>
			<div>{children}</div>
		</IonContent>
	);
};
export default Layout;
