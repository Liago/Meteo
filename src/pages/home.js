import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IonButton, IonButtons, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from "@ionic/react";

import Layout from "../components/layout";
import Today from "../components/cards/today";
import Daily from "../components/cards/daily";
import Search from "../components/search/search";
import Container from '../components/UI/container';

import { saveForecastData } from "../store/actions";
import { fetchWeather, getLocation, searchCity } from "../rest/rest";

import Slider from "react-slick";
import { isNil } from "lodash";

const Home = () => {
	const dispatch = useDispatch();
	const { forecast } = useSelector(state => state.app);
	const [currentLocation, seCurrentLocation] = useState();
	const [location, setLocation] = useState(null);
	const [showModal, setShowModal] = useState(false);
	const [searchText, setSearchText] = useState('');
	const [searchResults, setSearchResults] = useState(null);
	const [slideOptions, setSlideOptions] = useState({
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1
	});

	console.log('forecast :>> ', forecast)

	useEffect(() => {
		if (searchText === '') return;

		searchCity(searchText).then(response =>{
			console.log(`search City`, response)
			setSearchResults(response);
		})
	}, [searchText])

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
		})

	}, [currentLocation]);

	const renderToday = () => {
		if (!location) return;
		if (!forecast) return;

		return <Today location={location} data={forecast.daily.data[0]} />;
	};
	const renderNow = () => {
		if (!location) return;
		if (!forecast) return;

		return <Today
			location={location}
			data={forecast.currently}
			summary={{
				text: forecast.daily.summary,
				icon: forecast.daily.icon
			}}
		/>;
	};

	const renderWeekdays = () => {
		if (!location) return;
		if (!forecast) return;

		return (
			forecast.daily.data.map((day, i) => {
				if (i >= 1)
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
					<IonTitle>{location?.city}</IonTitle>
					<IonButton onClick={() => setShowModal(true)}>click</IonButton>
				</IonToolbar>
			</IonHeader>
			<Layout>
				<Container paddingX={4} marginX="auto">
					<Slider
						className="p-4"
						{...slideOptions}
					>
						{renderNow()}
						{renderToday()}
					</Slider>
					{renderWeekdays()}
				</Container>
				<Search
					searchText={searchText}
					setSearchText={setSearchText}
					showModal={showModal}
					setShowModal={setShowModal}
					searchResults={searchResults}
				/>
			</Layout>
		</IonPage>
	);
};

export default Home;
