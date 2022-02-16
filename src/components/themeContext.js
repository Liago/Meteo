import { useState, createContext } from "react";
// Context has been created
const ThemeContext = createContext(false);

// Provider
const ThemeProvider = ({ children }) => {
	const [toggle, setToggle] = useState(false);
	const [height, setHeight] = useState(null)
	const toggleFunction = () => {
		setToggle(!toggle);
	};
	return (
		<ThemeContext.Provider value={{ toggle, toggleFunction, height, setHeight }} >
			{children}
		</ThemeContext.Provider>
	);
};
export { ThemeContext, ThemeProvider };