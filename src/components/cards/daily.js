import { getDataFormatted } from "../../utils/utils";
import { round } from 'lodash'

const Daily = ({ data }) => {
	return (
		<div className="bg-white shadow-md rounded-lg w-80 mx-auto my-3 pt-3">
			<div className="px-4 py-5 sm:px-6">
				<div className="flex justify-between">
					<div className="text-normal">{getDataFormatted(data.time, 'DD')}</div>
					<div className="text-xs font-light">{data.summary}</div>
					<div><i className={`wi wi-${data.icon}`} /></div>
					<div className="text-xs font-light">{round(data.precipProbability*100)}%</div>
				</div>
			</div>
		</div>
	);
};
export default Daily;
