import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IonButton, IonButtons, IonHeader, IonIcon, IonMenuButton, IonPage, IonTitle, IonToolbar } from "@ionic/react";

import Layout from "../components/layout";
import Today from "../components/cards/today";
import Daily from "../components/cards/daily";
import Search from "../components/search/search";
import Container from '../components/UI/container';

import { saveLocation, saveLocationForecastData } from "../store/actions";
import { fetchWeather, getLocation, searchCity } from "../rest/rest";

import Slider from "react-slick";
import { search } from "ionicons/icons";
import { addCoordinates } from "utils/utils";

const Home = () => {
	const dispatch = useDispatch();
	const { forecast } = useSelector(state => state);
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

	// console.log('forecast :>> ', forecast)

	useEffect(() => {
		if (searchText === '') return;

		searchCity(searchText).then(response => setSearchResults(response))
	}, [searchText])

	useEffect(() => {
		if (!currentLocation) return;
		console.log(`currentLocation1`, currentLocation)
		seCurrentLocation(currentLocation);
		console.log(`currentLocation2`, currentLocation)
		getLocation(currentLocation).then(response => {
			console.log(`currentLocation3`, response)
			setLocation(response)
		});
	}, [currentLocation])

	useEffect(() => {
		if (!location) return;
		if (forecast[location.place_id]) return;

		console.log('location to FetchWeather :>> ', location);
		let coordinates = addCoordinates(location);
		console.log('coordinates :>> ', coordinates);

		fetchWeather(location).then((response) => {
			console.log('response :>> ', response);
			dispatch(saveLocation({ 'id': location.place_id, 'name': location.display_name }))
			dispatch(saveLocationForecastData({ location: location.place_id, forecast: response }))
		})
	}, [location])

	useEffect(() => {
		navigator.geolocation.getCurrentPosition(
			(pos) => {
				let coordinates = pos.coords;
				console.log(`coordinates`, coordinates)
				seCurrentLocation(coordinates);
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

	const renderToday = () => {
		if (!location) return;
		if (!forecast[location.place_id]) return;

		return <Today location={location} data={forecast[location.place_id].daily.data[0]} />;
	};
	const renderNow = () => {
		if (!location) return;
		if (!forecast[location.place_id]) return;

		return <Today
			location={location}
			data={forecast[location.place_id].currently}
			summary={{
				text: forecast[location.place_id].daily.summary,
				icon: forecast[location.place_id].daily.icon
			}}
		/>;
	};

	const renderWeekdays = () => {
		if (!location) return;
		if (!forecast[location.place_id]) return;

		return (
			forecast[location.place_id].daily.data.map((day, i) => {
				if (i >= 1)
					return <Daily key={i} data={day} />;
			})
		)
	}

	const setLocationFromSearch = (locationCoordinates) => {
		let coordinates = addCoordinates(locationCoordinates);
		setLocation(coordinates)
	}
	const renderCityName = () => {
		if (!location) return;

		if (location?.address)
			return <span>{location?.address?.city}</span>

		return <div><p>{location.display_name.split(',')[0]}</p><p className="text-xs font-thin">({location.display_name.split(',')[1]})</p></div>
	}
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonButtons slot="start">
						<IonMenuButton />
					</IonButtons>
					<IonTitle>{renderCityName()}</IonTitle>
					<IonButtons slot="primary">
						<IonButton
							onClick={() => setShowModal(true)}
						>
							<IonIcon slot="icon-only" icon={search} />
						</IonButton>
					</IonButtons>
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
					setCurrentLocation={setLocationFromSearch}
				/>
			</Layout>
		</IonPage>
	);
};

export default Home;
