import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { IonButtons, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { fetchWeather, getLocation } from "../rest/rest";

import Layout from "../components/layout";
import Today from "../components/cards/today";
import { saveForecastData } from "../store/actions";
import { isNil } from "lodash";
import { save } from "ionicons/icons";
import Daily from "../components/cards/daily";

const Page = () => {
	const dispatch = useDispatch();
	const { name } = useParams();
	const { forecast } = useSelector(state => state.app);
	const [currentLocation, seCurrentLocation] = useState();
	const [location, setLocation] = useState(null);
	const [currentDay, setCurrentDay] = useState(null);
	const [daily, setDaily] = useState(null);

	// console.log('forecast :>> ', forecast);

	useEffect(() => {
		navigator.geolocation.getCurrentPosition(
			(pos) => {
				let coordinates = pos.coords;
				seCurrentLocation(coordinates);
				getLocation(coordinates).then(response => {
					console.log('geolocation :>> ', response);
					setLocation(response.address)
				});
			},
			(err) => {
				console.warn(`Error ${err.code}: ${err.message}`);
			},
			{
				enableHighAccuracy: true,
				timeout: 5000,
				maximumAge: 0,
			}
		);
	}, []);

	useEffect(() => {
		if (!currentLocation) return;
		if (!isNil(forecast)) return;

		fetchWeather(currentLocation).then((response) => {
			console.log('response :>> ', response);
			dispatch(saveForecastData(response))
			// setCurrentDay(response.daily.data[0])
			// setDaily(response.daily.data)
		})

	}, [currentLocation]);

	const renderToday = () => {
		if (!location) return;
		if (!forecast) return;

		return <Today location={location} data={forecast.daily.data[0]} />;
	};

	const renderWeekdays = () => {
		if (!location) return;
		if (!forecast) return;

		return (
			forecast.daily.data.map((day, i) => {
				return <Daily key={i} data={day} />;
			})
		)

	}

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonButtons slot="start">
						<IonMenuButton />
					</IonButtons>
					<IonTitle>{name}</IonTitle>
				</IonToolbar>
			</IonHeader>
			<Layout>
				<IonHeader collapse="condense">
					<IonToolbar>
						<IonTitle size="large">{name}</IonTitle>
					</IonToolbar>
				</IonHeader>
				{renderToday()}
				{renderWeekdays()}
			</Layout>
		</IonPage>
	);
};

export default Page;
