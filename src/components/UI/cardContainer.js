export const CardContainer = ({ children }) => {
	return <div className="shadow-md bg-white rounded-xl border w-full mx-auto my-3 p-3">{children}</div>
}

export const FlatContainer = ({ children, css }) => {
	return <div className={`bg-white rounded-md w-full mx-auto my-3 p-3 ${css}`}>{children}</div>
}

export const MiniCardContainer = ({ children, additionalClass }) => {
	return <div className={`mx-1 p-2 rounded-lg shadow-md border ${additionalClass}`}>{children}</div>
}