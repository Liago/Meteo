const Spinner = () => {
	return (
		<div className="flex justify-center items-center h-screen">
			<div style={{ borderTopColor: 'transparent' }}
				className="mx-auto w-16 h-16 border-4 border-blue-400 border-solid rounded-full animate-spin">
			</div>
		</div >
	)
}
export default Spinner