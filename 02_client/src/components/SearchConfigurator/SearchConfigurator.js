import { useState } from 'react';
import '../../styles/SearchConfigurator.css'
import Paper from '@mui/material/Paper';
import FuelSearch from '../FuelSearch/FuelSearch';
import FilterConfigurator from '../FilterConfigurator/FilterConfigurator';

const SearchConfigurator = (props) => {

    const [fuelType, setFuelType] = useState("");
    const [radius, setRadius] = useState("");
    const [searchData, setSearchData]= useState([]);

    const setFilterCallback = (fuelTypeValue, radiusValue) => {
        setFuelType(fuelTypeValue);
        setRadius(radiusValue);
    };

    const setData = (data) => {
        setSearchData(data);
        props.callBack(data);
    }
    
    return (
        <Paper sx={{ p: 2, margin: 'auto', maxWidth: 600, flexGrow: 1 }} className="container-search-configurator">
            <FuelSearch searchParams={{fuelType:fuelType, radius:radius, callBack:setData}}></FuelSearch>
            <FilterConfigurator callBack={setFilterCallback}></FilterConfigurator>
        </Paper>
    );
}

export default SearchConfigurator;