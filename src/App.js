import { IonApp, IonRouterOutlet, IonSplitPane, isPlatform, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Route } from "react-router-dom";
import { Provider } from "react-redux";
import { useContext } from "react";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./store/store";
import { ThemeContext } from './components/themeContext'

import Menu from "./components/Menu";
import Home from "./pages/home";
import Graph from "./pages/graph";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import "./css/main.css";


const App = () => {
	let mode = isPlatform('android') ? 'md' : 'ios';
	setupIonicReact({ mode: mode })
	const { toggle } = useContext(ThemeContext);
	document.body.setAttribute('class', toggle ? 'dark' : 'light');

	return (
		<IonApp >
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<IonReactRouter>
						<IonSplitPane contentId="main">
							<Menu />
							<IonRouterOutlet id="main">
								<Route path="/" exact={true} component={Home} />
								<Route path="/graph" exact={true} component={Graph} />
							</IonRouterOutlet>
						</IonSplitPane>
					</IonReactRouter>
				</PersistGate>
			</Provider>
		</IonApp>
	);
};

export default App;
