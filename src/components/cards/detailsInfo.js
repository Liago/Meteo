import { getPercent, getTemp, getDataFormatted } from "utils/utils";
import { round } from 'lodash';
import WeatherIcon from "components/UI/weatherIcon";
import SunriseContainer from "components/forecast/sunrise";
import { CardContainer } from "components/UI/cardContainer";
import MiniCardInfo from "components/cards/miniCard";

const DetailsInfo = ({ data }) => {
	return (
		<CardContainer>
			<div className="pt-6 pb-2">
				<div className="text-center">
					<WeatherIcon className='text-7xl' icon={data.icon} />
					<div className="flex justify-center text-xs font-medium pt-8">
						<SunriseContainer data={data} />
					</div>
				</div>
			</div>
			<div className="grid grid-cols-3 gap-3 text-xs font-medium">
				<MiniCardInfo icon='thermometer' label='Max temp.' value={getTemp(data.temperatureHigh)} />
				<MiniCardInfo icon='thermometer' label='Percepita' value={getTemp(data.apparentTemperatureHigh)} />
				<MiniCardInfo icon='thermometer' label='Alle ore' value={getDataFormatted(data.apparentTemperatureHighTime, 'HH:mm')} />
				<MiniCardInfo icon='thermometer-exterior' label='Min temp.' value={getTemp(data.temperatureMin)} />
				<MiniCardInfo icon='thermometer-exterior' label='Percepita' value={getTemp(data.apparentTemperatureMin)} />
				<MiniCardInfo icon='thermometer-exterior' label='Alle ore' value={getDataFormatted(data.apparentTemperatureMinTime, 'HH:mm')} />
			</div>
			<div className="border border-t-1 my-2" />
			<div className='grid grid-cols-3 gap-3 text-xs font-medium'>
				<MiniCardInfo icon='humidity' label='Umidità' value={getPercent(data.humidity)} />
				<MiniCardInfo icon='humidity' label='Visibilità' value={round(data.visibility)} unit='Km' />
				<MiniCardInfo icon='raindrop' label='Rugiada' value={getTemp(data.dewPoint)} />
				<MiniCardInfo icon='day-sunny' label='UV' value={data.uvIndex} unit='UV' />
				<MiniCardInfo icon='day-sunny' label='Time' value={getDataFormatted(data.uvIndexTime, 'HH:mm')} />
			</div>		
		</CardContainer>
	)
}
export default DetailsInfo;