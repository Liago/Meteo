import MiniCardInfo from './cards/miniCard';

import { getPercent } from 'utils/utils';


const SunPhase = ({ windSpeed, pressure, cloudCover, ozone, windGust, moonPhase }) => {
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
		</>
	)
}
export default SunPhase;