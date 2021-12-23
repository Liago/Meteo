const Container = ({ children, paddingX, marginX }) => {
	return <div className={`container mx-${marginX} px-${paddingX}`}>{children}</div>
}
export default Container;