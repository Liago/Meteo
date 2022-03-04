import SunPhaseComponent from "components/sun/sunPhase";
import ExtendedForecastInfo from "components/forecast/extendedInfo";
import HourlyForecast from "components/forecast/hourly";
import TodayShortForecast from "components/forecast/todayShortForecast";

const TodayContainer = ({ today, hourly, summary, areThereAlerts, showAlert }) => {

	return (
		<div className="bg-white dark:bg-black w-full pt-3 text-black">
			<div className="flex flex-col justify-between p-5 h-90">
				<div className="flex flex-col">
					<div className="py-5 px-3 border-b-2 border-slate-800 text-lato">
						<TodayShortForecast hourly={hourly} />
					</div>
					<div className="py-5 px-3 border-b-2 border-slate-800 text-lato">
						<ExtendedForecastInfo
							summary={summary}
							areThereAlerts={areThereAlerts}
							showAlert={showAlert}
						/>
					</div>
					<div className="py-3">
						<h5 className="text-md font-light capitalize">andamento orario</h5>
						<HourlyForecast hourly={hourly} />
					</div>
					<div className="border-b-2 border-slate-800">
						<SunPhaseComponent
							sunsetTime={today.sunsetTime}
							sunriseTime={today.sunriseTime}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};
export default TodayContainer;
