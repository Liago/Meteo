import { useState } from 'react';
import { IonIcon, IonItem, IonRange } from '@ionic/react';

import moment from 'moment';
import { getDataFormatted, getPercent } from 'utils/utils';
import { moon, sunny } from 'ionicons/icons';
import WeatherIcon from './UI/weatherIcon';
import { MiniCardContainer } from './UI/cardContainer';
import MiniCardInfo from './UI/miniCard';


const SunPhase = ({ sunriseTime, sunsetTime, windSpeed, pressure, cloudCover, ozone, windGust, moonPhase }) => {
	const [rangeValue] = useState({ sunriseTime, sunsetTime });

	let now = moment().unix()

	return (
		<>
			<div className="pt-2 pb-4 font-regular grid grid-cols-3 gap-3">
				<MiniCardInfo icon='windy' label='Vento' value={windSpeed} unit='m/s' />
				<MiniCardInfo icon='strong-wind' label='Raffiche' value={windGust} unit='m/s' />
				<MiniCardInfo icon='barometer' label='Pressione' value={pressure} unit='hPa' />
				<MiniCardInfo icon='cloud' label='Cop. Nuv.' value={getPercent(cloudCover)} />
				<MiniCardInfo icon='sandstorm' label='Ozono' value={ozone} unit='ppb' />
				<MiniCardInfo icon='night-clear' label='Luna' value={getPercent(moonPhase)} />
			</div>
			<IonItem>
				<IonRange
					className="p-2"
					min={sunriseTime}
					max={sunsetTime}
					value={now}
				/>
				<IonIcon size='small' slot="start" icon={sunny} className="m-0 text-rose-600 " />
				<IonIcon size='small' slot="end" icon={moon} className="m-0" />
			</IonItem>
			<div className="flex justify-between font-light text-xs">
				<span>Alba: {getDataFormatted(rangeValue.sunriseTime, 'HH:mm')}</span>
				<span>Tramonto: {getDataFormatted(rangeValue.sunsetTime, 'HH:mm')}</span>
			</div>
		</>
	)
}
export default SunPhase;