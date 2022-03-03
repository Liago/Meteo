import { useSelector } from 'react-redux';
import { IonButtons, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';


import Layout from '../components/layout';
import Charts from '../components/charts/charts';

import { getChartData } from '../utils/utils';

const Graph = ({ name, data }) => {
	const { forecast } = useSelector(state => state);
	const { selectedLocation } = useSelector(state => state.app);
	
	const chartData = getChartData(forecast[selectedLocation?.place_id]?.hourly?.data);

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
				<div className="container mx-auto px-4">
					<Charts data={chartData.dataset} />
				</div>
			</Layout>
		</IonPage>
	)
}
export default Graph;