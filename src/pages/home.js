import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IonFooter, IonPage, IonToolbar } from "@ionic/react";
import { Geolocation } from '@ionic-native/geolocation';

import Layout from "../components/layout";
import Today from "../components/cards/today";
import Daily from "../components/cards/daily";
import Search from "../components/search/search";
import Container from '../components/UI/container';
import Spinner from "components/UI/spinner";

import { addCoordinates, getTemp, itsTimeToRefresh } from "utils/utils";
import { saveLocation, saveLocationForecastData, setCurrentLocation } from "../store/actions";
import { fetchWeather, getLocation, searchCity } from "../rest/rest";

import HeaderToolbar from "components/header/headerToolbar";



const Home = () => {
	const dispatch = useDispatch();
	const { forecast } = useSelector(state => state);
	const { selectedLocation, autoUpdates } = useSelector(state => state.app);
	const [showModal, setShowModal] = useState(false);
	const [searchText, setSearchText] = useState('');
	const [searchResults, setSearchResults] = useState(null);

	useEffect(() => {
		getCurrentLocation();
		checkForecastDifference();
	}, []);

	useEffect(() => {
		if (searchText === '') return;

		searchCity(searchText).then(searchResult => setSearchResults(searchResult))
	}, [searchText])

	useEffect(() => {
		autoUpdates && checkForecastDifference();
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
		setShowModal(false);
		dispatch(setCurrentLocation(null));
		setLocationAsCurrent(locationCoordinates);
	}
	const refreshForecast = () => {
		!selectedLocation
			? getCurrentLocation()
			: fetchForecast(selectedLocation, true);
	}
	const setLocationAsCurrent = (locationProps) => {
		const { place_id } = locationProps;
		if (place_id === selectedLocation?.place_id)
			return;

		addCoordinates(locationProps)
		dispatch(setCurrentLocation(locationProps))
	}

	const renderNow = () => {
		if (!selectedLocation) return;
		if (!forecast[selectedLocation.place_id]) return;

		return <Today
			data={forecast[selectedLocation.place_id].currently}
			hourly={forecast[selectedLocation.place_id].hourly.data}
			today={forecast[selectedLocation.place_id].daily.data[0]}
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
				{renderNow()}
			</>
		)
	}
	const renderTodaySituation = () => {
		if (!selectedLocation) return;
		if (!forecast[selectedLocation.place_id]) return;

		return (
			<div className="flex justify-between">
				<p className="text-xs text-gray-700 font-light">{forecast[selectedLocation.place_id].daily.summary}</p>
				<div className="flex justify-between p-2 bg-blue-200 border border-sm border-blue-500 shadow-md rounded-md">
					<p className="text-sm font-medium text-blue-900">{getTemp(forecast[selectedLocation.place_id].daily.data[0].temperatureHigh)}</p>
					<p className="text-sm font-medium text-blue-900">{getTemp(forecast[selectedLocation.place_id].daily.data[0].temperatureLow)}</p>
				</div>

			</div>
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
					<div className="flex flex-col h-screen">
						{renderMainContent()}
					</div>
					{renderWeekdays()}
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
			<IonFooter collapse="fade">
				<IonToolbar className="footer-toolbar " color="light">
					{renderTodaySituation()}
				</IonToolbar>
			</IonFooter>
		</IonPage>
	);
};

export default Home;
