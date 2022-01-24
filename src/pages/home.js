import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IonPage } from "@ionic/react";

import Layout from "../components/layout";
import Today from "../components/cards/today";
import Daily from "../components/cards/daily";
import Search from "../components/search/search";
import Container from '../components/UI/container';
import Spinner from "components/UI/spinner";

import { addCoordinates, itsTimeToRefresh } from "utils/utils";
import { saveLocation, saveLocationForecastData, setCurrentLocation } from "../store/actions";
import { fetchWeather, getLocation, searchCity } from "../rest/rest";

import Slider from "react-slick";
import HeaderToolbar from "components/header/headerToolbar";
import { Geolocation } from '@ionic-native/geolocation';


const Home = () => {
	const dispatch = useDispatch();
	const { forecast } = useSelector(state => state);
	const { selectedLocation } = useSelector(state => state.app);
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
		getCurrentLocation();
		checkForecastDifference();
	}, []);

	useEffect(() => {
		if (searchText === '') return;

		searchCity(searchText).then(searchResult => setSearchResults(searchResult))
	}, [searchText])

	useEffect(() => {
		checkForecastDifference();
		if (!selectedLocation) return;
		if (forecast[selectedLocation?.place_id]) return;

		fetchForecast(selectedLocation, false);
	}, [selectedLocation])

	const checkForecastDifference = () => {
		if (!forecast[selectedLocation?.place_id]) return;

		itsTimeToRefresh(forecast, selectedLocation) && fetchForecast(selectedLocation, true)
	}

	const getLocationFromCoordinatesAndSetCurrentLocation = (locality) => {
		getLocation(locality).then(response => {
			searchCity(response.address.city).then(response => {
				setLocationAsCurrent(response[0])
			})
		})
	}

	const fetchForecast = (thisLocation, refresh) => {
		fetchWeather(thisLocation).then((response) => {
			dispatch(saveLocationForecastData({
				location: thisLocation.place_id,
				forecast: response
			}))
			!refresh && dispatch(saveLocation(thisLocation))
		})
	}

	const getCurrentLocation = async () => {
		try {
			const position = await Geolocation.getCurrentPosition();
			const { coords: coordinates } = position;
			getLocationFromCoordinatesAndSetCurrentLocation(coordinates)
		} catch (e) {
			console.log('error :>> ', e);
		}
	}

	const setLocationFromSearch = (locationCoordinates) => {
		dispatch(setCurrentLocation(null))
		setLocationAsCurrent(locationCoordinates);
	}
	const refreshForecast = () => {
		fetchForecast(selectedLocation, true);
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

		return <Today data={forecast[selectedLocation.place_id].daily.data[0]} />;
	};
	const renderNow = () => {
		if (!selectedLocation) return;
		if (!forecast[selectedLocation.place_id]) return;

		return <Today
			data={forecast[selectedLocation.place_id].currently}
			summary={{
				text: forecast[selectedLocation.place_id].daily.summary,
				icon: forecast[selectedLocation.place_id].daily.icon
			}}
		/>;
	};
	const renderWeekdays = () => {
		if (!selectedLocation) return;
		if (!forecast[selectedLocation.place_id]) return;

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
		if (!selectedLocation || !forecast[selectedLocation.place_id]) return <Spinner />;


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
			<HeaderToolbar
				renderCityName={renderCityName}
				refreshForecast={refreshForecast}
				setShowModal={setShowModal}
				showModal={showModal}
			/>
			<Layout>
				<Container paddingX={4} marginX="auto">
					<div>
						{renderMainContent()}
					</div>
					<Search
						showModal={showModal}
						setShowModal={setShowModal}
						searchText={searchText}
						setSearchText={setSearchText}
						searchResults={searchResults}
						setCurrentLocation={setLocationFromSearch}
					/>
				</Container>
			</Layout>
		</IonPage>
	);
};

export default Home;
