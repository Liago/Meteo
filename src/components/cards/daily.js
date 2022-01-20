import { getDataFormatted, getWeatherIcon } from "../../utils/utils";
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/outline'
import { round } from 'lodash'
import { IonAccordion, IonAccordionGroup, IonItem, IonLabel, IonList } from "@ionic/react";
import { arrowDownCircle, informationCircleOutline } from "ionicons/icons";
import { useRef } from "react";

const Daily = ({ data }) => {
	const accordionGroupRef = useRef(null);

	const renderRainChance = () => {
		if (data.icon === 'clear-day' || data.precipProbability === 0)
			return;

		return <div className="font-light">{round(data.precipProbability * 100)}%</div>
	}

	return (
		<div className="bg-white shadow-md rounded-lg w-full mx-auto my-3 pt-3">
			<div className="px-4 py-5">
				<div className="grid grid-cols-7 gap-4">
					<div className="text-center">
						<p className="font-light text-sm">{getDataFormatted(data.time, 'ddd')}</p>
						<p className="font-normal">{getDataFormatted(data.time, 'DD')}</p>
					</div>
					<div className="col-span-5 text-base font-light">
						<p>{data.summary}</p>
						<div className="font-normal flex">
							<div className="text-red-500 pr-2 flex items-center">{round(data.temperatureHigh)}° <ArrowUpIcon className="h-3 w-3 text-red-500" /></div>
							<div className="text-blue-500 flex items-center">{round(data.temperatureLow)}° <ArrowDownIcon className="h-3 w-3 text-blue-500" /></div>
						</div>
					</div>
					<div className="text-center text-sm">
						<i className={`wi wi-${getWeatherIcon(data.icon)}`} />
						{renderRainChance()}
					</div>
				</div>
				<IonAccordionGroup>
					<IonAccordion value="forecast">
						<IonItem slot="header"></IonItem>
						<IonList slot="content">
							<IonItem>
								<IonLabel>Red</IonLabel>
							</IonItem>
							<IonItem>
								<IonLabel>Green</IonLabel>
							</IonItem>
							<IonItem>
								<IonLabel>Blue</IonLabel>
							</IonItem>
						</IonList>
					</IonAccordion>
				</IonAccordionGroup>
			</div>
		</div>
	);
};
export default Daily;
