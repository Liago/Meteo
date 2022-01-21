export const CardContainer = ({ children }) => {
	return <div className="shadow-md bg-white rounded-xl border w-full mx-auto my-3 p-3">{children}</div>
}

export const MiniCardContainer = ({ children }) => {
	return <div className="p-2 rounded-lg shadow-md border">{children}</div>
}