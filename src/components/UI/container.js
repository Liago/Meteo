const Container = ({ children, paddingX, marginX, className }) => {
	return <div className={`container mx-${marginX} px-${paddingX} ${className}`}>{children}</div>
}
export default Container;