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
	const { locations, selectedLocation } = useSelector(state => state.app);
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

	useEffect(() => getCurrentLocation(), []);

	// useEffect(() => {
	// 	if (!selectedLocation) return;

	// 	console.log('[HOME] - useEffect- selectedLocation', selectedLocation)
	// 	dispatch(setCurrentLocation(selectedLocation));
	// 	// 	setLocation(selectedLocation);

	// }, [selectedLocation])

	useEffect(() => {
		if (searchText === '') return;

		searchCity(searchText).then(searchResult => setSearchResults(searchResult))
	}, [searchText])

	// useEffect(() => {
	// 	if (!currentGeoLocation) return;
	// 	if (!selectedLocation) return;

	// 	// console.log(`currentGeoLocation`, currentGeoLocation.latitude)
	// 	// console.log(`selectedLocation`, selectedLocation.latitude)

	// 	let findSavedLocation = find(locations, ['place_id', selectedLocation.place_id])
	// 	console.log(`findSavedLocation`, findSavedLocation)
	// 	!findSavedLocation
	// 		? getLocationFromCoordinatesAndSetCurrentLocation(currentGeoLocation)
	// 		: dispatch(setCurrentLocation(findSavedLocation))

	// }, [currentGeoLocation])

	useEffect(() => {
		if (!selectedLocation) return;
		if (forecast[selectedLocation?.place_id]) return;

		console.log(`selectedLocation`, selectedLocation)
		fetchWeather(selectedLocation).then((response) => {
			dispatch(saveLocationForecastData({
				location: selectedLocation.place_id,
				forecast: response
			}))
			dispatch(saveLocation(selectedLocation))
		})
	}, [selectedLocation])

	const getLocationFromCoordinatesAndSetCurrentLocation = (locality) => {
		getLocation(locality).then(response => {
			searchCity(response.address.city).then(response => {
				setLocationAsCurrent(response[0])
			})
		})
	}

	const getCurrentLocation = () => {
		navigator.geolocation.getCurrentPosition(
			(pos) => {
				let coordinates = pos.coords;
				getLocationFromCoordinatesAndSetCurrentLocation(coordinates)
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

	const setLocationFromSearch = (locationCoordinates) => {
		setLocationAsCurrent(locationCoordinates);
	}

	const setLocationAsCurrent = (locationProps) => {
		const { place_id } = locationProps;
		if (place_id === selectedLocation?.place_id)
			return;

		addCoordinates(locationProps)
		dispatch(setCurrentLocation(locationProps))
	}


	const renderToday = () => {
		if (!selectedLocation) return;
		if (!forecast[selectedLocation.place_id]) return;

		return <Today location={selectedLocation} data={forecast[selectedLocation.place_id].daily.data[0]} />;
	};
	const renderNow = () => {
		if (!selectedLocation) return;
		if (!forecast[selectedLocation.place_id]) return;

		return <Today
			location={selectedLocation}
			data={forecast[selectedLocation.place_id].currently}
			summary={{
				text: forecast[selectedLocation.place_id].daily.summary,
				icon: forecast[selectedLocation.place_id].daily.icon
			}}
		/>;
	};
	const renderWeekdays = () => {
		if (!selectedLocation) return <Spinner />;
		if (!forecast[selectedLocation.place_id]) return <Spinner />;

		return (
			forecast[selectedLocation.place_id].daily.data.map((day, i) => {
				if (i >= 1)
					return <Daily key={i} data={day} />;
			})
		)
	};
	const renderCityName = () => {
		if (!selectedLocation) return;

		if (selectedLocation?.address)
			return <span>{selectedLocation?.address?.city}</span>

		return <div><p>{selectedLocation.display_name.split(',')[0]}</p><p className="text-xs font-thin">({selectedLocation.display_name.split(',')[1]})</p></div>
	};
	const renderMainContent = () => {
		if (!selectedLocation) return <Spinner />;

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

	const renderSearchModal = () => {
		if (showModal)
			return (
				<Search
					showModal={showModal}
					setShowModal={setShowModal}
					searchText={searchText}
					setSearchText={setSearchText}
					searchResults={searchResults}
					setCurrentLocation={setLocationFromSearch}
				/>
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
				{renderSearchModal()}
			</Layout>
		</IonPage>
	);
};

export default Home;
