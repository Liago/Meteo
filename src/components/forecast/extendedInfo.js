import { IonIcon } from "@ionic/react"
import { informationCircleOutline } from "ionicons/icons"

const ExtendedForecastInfo = ({summary}) => {
	return (
		<>
			<div className="text-gray-700 font-light">
				<h6 className="uppercase text-center font-bold text-md">previsioni estese</h6>
			</div>
			<div className="flex">
				<div className="shrink-0">
					<IonIcon icon={informationCircleOutline} />
				</div>
				<div className="grow ml-3">
					<p className="text-sm">{summary}</p>
				</div>
			</div>
		</>
	)
}
export default ExtendedForecastInfo;