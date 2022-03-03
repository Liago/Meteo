import HourlyCard from "components/cards/hourlyCard";

const HourlyForecast = ({ hourly }) => {
	const renderCards = () => {
		return (
			hourly.map(item => {
				return (
					<HourlyCard
						key={item.time}
						item={item}
					/>
				)
			})
		)
	}
	return (
		<div className="flex flex-row overflow-scroll py-5">
			{renderCards()}
		</div>
	)
}
export default HourlyForecast;