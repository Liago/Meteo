import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { IonButtons, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';


import Layout from '../components/layout';
import Charts from '../components/charts/charts';

import { getDataFormatted } from '../utils/utils';
import { round, reduce } from 'lodash'

const Graph = ({ name, data }) => {
	const { forecast } = useSelector(state => state.app);
	const chartData = reduce(forecast?.hourly?.data, function (result, value) {
		console.log('getDataFormatted(value.time, "DD MM") :>> ', getDataFormatted(value.time, "DD MM"));
		result.dataset = (result.dataset || []).concat([[getDataFormatted(value.time, 'ddd HH:mm'), value.temperature]]);
		return result;
	}, {});


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