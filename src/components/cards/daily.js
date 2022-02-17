import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/outline'

import WeatherIcon from "components/UI/weatherIcon";
import { CardContainer } from "components/UI/cardContainer";
import ModalDailyInfo from "components/modals/modalDailyInfo";

import { getDataFormatted, getPercent, getTemp } from "../../utils/utils";
import { useState } from 'react';

const Daily = ({ data }) => {
	const [showModal, setShowModal] = useState(false);

	const renderRainChance = () => {
		if (data.icon === 'clear-day' || data.precipProbability === 0)
			return;

		return <div className="font-light">{getPercent(data.precipProbability)}</div>
	}
	const renderModalInfo = () => {
		const options = { showModal, setShowModal, data };

		return <ModalDailyInfo {...options} />
	}

	return (
		<div onClick={() => setShowModal(true)}>
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
			</CardContainer>
			{renderModalInfo()}
		</div>

	);
};
export default Daily;
