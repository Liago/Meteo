import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IonPage, useIonModal } from "@ionic/react";
import { Geolocation } from '@ionic-native/geolocation';

import Layout from "../components/layout";
import Search from "../components/search/search";
import Container from '../components/UI/container';
import Spinner from "components/UI/spinner";

import { addCoordinates, itsTimeToRefresh } from "utils/utils";
import { saveLocation, saveLocationForecastData, setCurrentLocation } from "../store/actions";
import { fetchWeather, getLocation, searchCity } from "../rest/rest";

import HeaderToolbar from "components/headerAndFooter/headerToolbar";
import AlertContainer from "components/UI/alertContainer";
import MainModal from "components/UI/mainModal";
import TodayHeader from "components/todayHeader";
import ForecastContainer from "components/tabs/forecast/forecastContainer";
import TodayContainer from "components/tabs/today/todayContainer";
import PrecipitationContainer from "components/tabs/precipitation/precipitationContainer";



const Home = () => {
	const dispatch = useDispatch();
	const { forecast } = useSelector(state => state);
	const { selectedLocation, autoUpdates } = useSelector(state => state.app);
	const [showModal, setShowModal] = useState(false);
	const [searchText, setSearchText] = useState('');
	const [searchResults, setSearchResults] = useState(null);
	const [showMainModal, setShowMainModal] = useState(false);
	const [tab, setTab] = useState("today");
	const pageRef = useRef()


	const handleDismiss = () => dismissAlert();
	const [showAlert, dismissAlert] = useIonModal(AlertContainer, {
		alerts: forecast[selectedLocation?.place_id]?.alerts || null,
		onDismiss: handleDismiss
	});

	useEffect(() => {
		getCurrentLocation();
		checkForecastDifference();
	}, []);

	useEffect(() => {
		if (searchText === '') {
			setSearchResults(null);
			return;
		}

		searchCity(searchText).then(searchResult => setSearchResults(searchResult))
	}, [searchText])

	useEffect(() => {
		autoUpdates && checkForecastDifference();

		if (!selectedLocation) return;
		if (forecast[selectedLocation?.place_id]) {
			setShowMainModal(true);
			return;
		}

		fetchForecast(selectedLocation, false);
	}, [selectedLocation])


	const showAlertHandler = (content) => {
		showAlert()
	}

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
			!refresh && dispatch(saveLocation(thisLocation));
			setTimeout(() => {
				setShowMainModal(true);
			}, 500);
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

		return <TodayHeader
			data={forecast[selectedLocation.place_id].currently}
			today={forecast[selectedLocation.place_id].daily.data[0]}
		/>;
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

	const renderInfoContent = () => {
		if (!selectedLocation) return;
		if (!forecast[selectedLocation.place_id]) return;

		switch (tab) {
			case "today":
				return (
					<TodayContainer
						data={forecast[selectedLocation.place_id].currently}
						hourly={forecast[selectedLocation.place_id].hourly.data}
						today={forecast[selectedLocation.place_id].daily.data[0]}
						summary={forecast[selectedLocation.place_id].daily.summary}
					/>
				)
			case "forecast":
				return (
					<ForecastContainer
						data={forecast[selectedLocation.place_id].daily.data}
						pageRef={pageRef}
					/>
				)
			case "precipitation":
				return (
					<PrecipitationContainer />
				)
			default:
				return null;
		}
	}

	return (
		<IonPage ref={pageRef}>
			<HeaderToolbar
				renderCityName={renderCityName}
				refreshForecast={refreshForecast}
				setShowModal={setShowModal}
				showModal={showModal}
				showAlert={showAlertHandler}
				areThereAlerts={(forecast[selectedLocation?.place_id]?.alerts || null) ? true : false}
				setShowMainModal={setShowMainModal}
			/>
			<Layout>
				<Container paddingX={4} marginX="auto">
					<div className="flex flex-col">
						{renderMainContent()}
						<MainModal
							showModal={showMainModal}
							setShowModal={setShowMainModal}
							tab={tab}
							setTab={setTab}
						>
							{renderInfoContent()}
						</MainModal>
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
