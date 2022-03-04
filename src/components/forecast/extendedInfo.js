import { IonIcon } from "@ionic/react"
import { informationCircleOutline } from "ionicons/icons"

const ExtendedForecastInfo = ({ summary, areThereAlerts, showAlert }) => {
	const renderAlertsButton = () => {
		return (
			<div className="relative">
				<div
					onClick={() => showAlert()}
					className="items-center px-4 py-2 font-semibold text-sm shadow rounded-md text-gray-700 transition ease-in-out duration-150"
				>
					<p className="uppercase pb-2">previsioni estese</p>
					<div className="flex">
						<div className="shrink-0">
							<IonIcon icon={informationCircleOutline} />
						</div>
						<div className="grow ml-3">
							<p className="text-sm font-light">{summary}</p>
						</div>
					</div>
				</div>
				{areThereAlerts &&
					<span className="flex absolute h-3 w-3 top-0 right-0 -mt-1 -mr-1">
						<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-800 opacity-75"></span>
						<span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-500"></span>
					</span>
				}
			</div>
		)
	}

	return (
		<>
			<div className="text-gray-700 font-light text-center">
				{renderAlertsButton()}
			</div>
		</>
	)
}
export default ExtendedForecastInfo;