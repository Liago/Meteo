import { IonContent } from "@ionic/react";
import { useContext, useEffect, useRef } from "react";

import { ThemeContext } from "./themeContext";

const Layout = ({ children }) => {
	const { height, setHeight } = useContext(ThemeContext);
	const ref = useRef(null)

	useEffect(() =>{
		setHeight(ref.current.clientHeight)
	},[])


	return (
		<IonContent
			ref={ref}
			className="font-lato"
			fullscreen
		>
			<div>{children}</div>
		</IonContent>
	);
};
export default Layout;
