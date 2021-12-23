import { Chart } from './charts';

export default {
	/* 👇 The title prop is optional.
	* See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
	* to learn how to generate automatic titles
	*/
	title: 'Charts',
	component: Chart,
};

export const Charts = () => {
	const data = [
		['City', '2010 Population', '2000 Population'],
		['New York City, NY', 8175000, 8008000],
		['Los Angeles, CA', 3792000, 3694000],
		['Chicago, IL', 2695000, 2896000],
		['Houston, TX', 2099000, 1953000],
		['Philadelphia, PA', 1526000, 1517000],
	]
return <Chart data={data} />	
};