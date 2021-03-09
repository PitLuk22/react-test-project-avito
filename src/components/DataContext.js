import React, { createContext, useContext } from 'react'
import ImgService from '../services/services';

const DataContext = createContext();
const DataProvider = ({ children }) => {
	const Service = new ImgService()
	return (
		<DataContext.Provider value={Service}>{children}</DataContext.Provider>
	)
}

export default DataProvider;

export const useData = () => useContext(DataContext);