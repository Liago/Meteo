import { IonItem, IonLabel, IonModal, IonSearchbar } from "@ionic/react";
import './search.css'

const Search = ({ showModal, setShowModal, searchText, setSearchText, searchResults, setCurrentLocation }) => {

	const renderResults = () => {
		if (!searchResults) return;

		return (
			(searchResults || []).map(city => {
				return (
					<IonItem
						key={city.place_id}
						detail
						button
						onClick={() => setCurrentLocation(city)}
					>
						<IonLabel>{city.display_name}</IonLabel>
					</IonItem>
				)
			})
		)
	}

	return (
		<IonModal
			isOpen={showModal}
			initialBreakpoint={0.5}
			breakpoints={[0, 0.5, 1]}
			onDidDismiss={() => setShowModal(false)}
		>
			<div className="text-gray-700 px-4" >
				<IonSearchbar
					animated
					value={searchText}
					placeholder="Cerca una città"
					debounce={1000}
					onIonChange={(e) => setSearchText(e.detail.value)}
				>
				</IonSearchbar>
				<div className="border border-t-1 my-2" />
				<div className="text-gray-700 p-2">{renderResults()}</div>
			</div>
		</IonModal>
	)
}
export default Search;