import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IonButton, IonButtons, IonHeader, IonIcon, IonMenuButton, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { search } from "ionicons/icons";

import Layout from "../components/layout";
import Today from "../components/cards/today";
import Daily from "../components/cards/daily";
import Search from "../components/search/search";
import Container from '../components/UI/container';
import Spinner from "components/UI/spinner";

import { addCoordinates } from "utils/utils";
import { saveLocation, saveLocationForecastData, setCurrentLocation } from "../store/actions";
import { fetchWeather, getLocation, searchCity } from "../rest/rest";

import Slider from "react-slick";

import { find } from 'lodash';

const Home = () => {
	const dispatch = useDispatch();
	const { forecast } = useSelector(state => state);
	const { locations, selectedLocationId } = useSelector(state => state.app);
	const [currentLocation, seCurrentLocation] = useState();
	const [location, setLocation] = useState(null);
	const [showModal, setShowModal] = useState(false);
	const [searchText, setSearchText] = useState('');
	const [searchResults, setSearchResults] = useState(null);
	const slideOptions = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1
	};

	useEffect(() => {
		getCurrentLocation()
	}, []);



	useEffect(() => {
		if (!selectedLocationId) return;

		seCurrentLocation(selectedLocationId);

	}, [selectedLocationId])

	useEffect(() => {
		if (searchText === '') return;

		searchCity(searchText).then(response => setSearchResults(response))
	}, [searchText])

	useEffect(() => {
		if (!currentLocation) return;
		console.log(`currentLocation`, currentLocation)
		console.log(`currentLocation.place_id`, currentLocation.place_id)

		let findSavedLocation = find(locations, ['place_id', currentLocation.place_id])
		!findSavedLocation
			? getLocation(currentLocation).then(response => {
				console.log('response :>> ', response.address.city);
				searchCity(response.address.city).then(response => {
					setLocationFromSearch(response[0]);
					dispatch(setCurrentLocation(response[0]))
				})
			})
			: setLocation(findSavedLocation);

	}, [currentLocation])

	useEffect(() => {
		if (!location) return;
		if (forecast[location.place_id]) return;

		// console.log('location :>> ', location);
		// addCoordinates(location);
		console.log('location :>> ', location);

		fetchWeather(location).then((response) => {
			dispatch(saveLocation(location))
			dispatch(saveLocationForecastData({
				location: location.place_id,
				forecast: response
			}))
		})
	}, [location])

	const getCurrentLocation = () => {
		navigator.geolocation.getCurrentPosition(
			(pos) => {
				let coordinates = pos.coords;
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
	}

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
		if (!location) return <Spinner />;
		if (!forecast[location.place_id]) return <Spinner />;

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
	const renderMainContent = () => {
		if (!location) return <Spinner />;

		return (
			<>
				<Slider
					className="p-4"
					{...slideOptions}
				>
					{renderNow()}
					{renderToday()}
				</Slider>
				{renderWeekdays()}
			</>
		)
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
					{renderMainContent()}
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
