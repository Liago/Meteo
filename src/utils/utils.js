import 'moment/locale/it'
import moment from "moment";

export const getDataFormatted = (unixDate, dateFormat) => {
	return moment.unix(unixDate).format(dateFormat)
}