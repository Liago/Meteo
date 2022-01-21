import { IonAccordion, IonAccordionGroup, IonItem, IonLabel, IonList } from "@ionic/react";
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/outline'

import WeatherIcon from "components/UI/weatherIcon";
import DetailsInfo from "./detailsInfo";

import { getDataFormatted, getPercent, getTemp } from "../../utils/utils";
import { CardContainer } from "components/UI/cardContainer";
import SunAndWind from "components/sunWind";

const Daily = ({ data }) => {

	const renderRainChance = () => {
		if (data.icon === 'clear-day' || data.precipProbability === 0)
			return;

		return <div className="font-light">{getPercent(data.precipProbability)}</div>
	}

	return (
		<CardContainer>
			<div className="grid grid-cols-7 gap-4">
				<div className="text-center">
					<p className="font-light text-sm">{getDataFormatted(data.time, 'ddd')}</p>
					<p className="font-normal">{getDataFormatted(data.time, 'DD')}</p>
				</div>
				<div className="col-span-5 text-base font-light">
					<p>{data.summary}</p>
					<div className="font-normal flex">
						<div className="text-red-500 pr-2 flex items-center">
							{getTemp(data.temperatureHigh)}
							<ArrowUpIcon className="h-3 w-3 text-red-500" />
						</div>
						<div className="text-blue-500 flex items-center">
							{getTemp(data.temperatureLow)}
							<ArrowDownIcon className="h-3 w-3 text-blue-500" />
						</div>
					</div>
				</div>
				<div className="text-center text-sm">
					<WeatherIcon icon={data.icon} />
					{renderRainChance()}
				</div>
			</div>
			<IonAccordionGroup>
				<IonAccordion value="forecast">
					<IonItem slot="header"></IonItem>
					<IonList slot="content">
						<IonItem>
							<DetailsInfo data={data} />
						</IonItem>
						<IonItem>
							<SunAndWind data={data} />
						</IonItem>
					</IonList>
				</IonAccordion>
			</IonAccordionGroup>
		</CardContainer>

	);
};
export default Daily;
