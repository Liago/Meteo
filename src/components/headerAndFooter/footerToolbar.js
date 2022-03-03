import { IonFooter, IonToolbar } from "@ionic/react";
import { getTemp } from "utils/utils";

const FooterToolbar = ({ data, summary }) => {
	const renderTodaySituation = () => {
		return (
			<div className="flex justify-between">
				<div className="text-gray-700 font-light">
					<p className="text-sm">{summary}</p>
				</div>
				<div className="flex justify-between p-2 bg-blue-200 border border-sm border-blue-500 shadow-md rounded-md">
					<p className="text-sm font-medium text-blue-900">{getTemp(data.temperatureHigh)}</p>
					<p className="text-sm font-medium text-blue-900">{getTemp(data.temperatureLow)}</p>
				</div>

			</div>
		)
	}

	return (
		<IonFooter collapse="fade">
			<IonToolbar className="footer-toolbar font-lato " color="light">
				{renderTodaySituation()}
			</IonToolbar>
		</IonFooter>
	)
}
export default FooterToolbar;