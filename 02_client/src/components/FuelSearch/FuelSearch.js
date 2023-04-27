import * as React from 'react';
import axios from 'axios';
import SearchField from '../SearchField/SearchField';
import StandardButton from '../StandardButton/StandardButton';
import Icon from '@mui/icons-material/LocationOn';
import Grid from '@mui/material/Grid';
import useGeoLocation from './useGeoLocation';
import Geocode from "react-geocode";

const FuelSearch = (props) => {

    const [currentAddress, setCurrentAddress] = React.useState("");
    const [gasStations, setGasStations] = React.useState([]);
    const [lat, setLat] = React.useState("");
    const [lng, setLng] = React.useState("");
    const geoLoc = useGeoLocation();
    const apiKey = 'be6630ee-79b4-3deb-aa2b-8d4e66b1924f';
    
    Geocode.setApiKey("AIzaSyCAAkDnHxm3Cg_n2Wsh31E0i49RsXTvI9s");
    Geocode.setLanguage("de");
    Geocode.setRegion("de");
    Geocode.setLocationType("ROOFTOP"); // get the exact position, not many possible ones

    // get textual address from lat + lng
    function setAddressFromLatLng(lat, lng) {
        Geocode.fromLatLng(lat, lng)
        .then((response) => {
            setCurrentAddress(response.results[0].formatted_address);
        }, (error) => {
            console.error("Error trying to get address from lat + lng: " + error);
        });
    }

    // get lat + lng from textual address
    function setLatLngFromAddress(address) {
        Geocode.fromAddress(address)
        .then((response) => {
            if (response.results.length > 0) {
                setLat(response.results[0].geometry.location.lat);
                setLng(response.results[0].geometry.location.lng);
            }
        }, (error) => {
           //console.error("Error trying to get lat + lng from textual address: " + error);
        });
    }

    // onClick search button
    const onClickSearch = () => {
        if (lat === "" || lng === "") { 
            alert("Bitte geben Sie eine gültige Adresse an.");
            return;
        }

        const fuelType = (props.searchParams.fuelType !== "") ? props.searchParams.fuelType : "Alle";
        const radius = (props.searchParams.radius !== "") ? props.searchParams.radius : "10";
        const apiUrl = `https://creativecommons.tankerkoenig.de/json/list.php?lat=${lat}&lng=${lng}&rad=${radius}&sort=dist&type=all&apikey=${apiKey}`;
        const mappedFuelType = mapFuelType(fuelType);

        axios.get(apiUrl)
        .then(res => {
            switch(mappedFuelType) {
                case 'diesel':
                    for (let i = 0; i < res.data.stations.length; i++) {
                        res.data.stations[i].e5 = "";
                        res.data.stations[i].e10 = "";
                    }
                    break;
                case 'e5':
                    for (let i = 0; i < res.data.stations.length; i++) {
                        res.data.stations[i].diesel = "";
                        res.data.stations[i].e10 = "";
                    }
                    break;
                case 'e10':
                    for (let i = 0; i < res.data.stations.length; i++) {
                        res.data.stations[i].diesel = "";
                        res.data.stations[i].e5 = "";
                    }
                    break;
                default:
                    break;
            }
            setGasStations(res.data.stations);
            props.searchParams.callBack(res.data.stations);
        })
        .catch(error => {
            console.log("Error while getting gas station information: " + error);
        });
    }

    // onClick current address button
    const GeoSet = () => {
        if (geoLoc.loaded) {
            setLat(geoLoc.coordinates.lat);
            setLng(geoLoc.coordinates.lng);
            setAddressFromLatLng(geoLoc.coordinates.lat, geoLoc.coordinates.lng);
        }
    }

    function mapFuelType(fuelType) {
        switch(fuelType.trim().toLowerCase()) {
            case 'alle':
                return 'all';
            case 'super e5':
                return 'e5';
            case 'super e10':
                return 'e10';
            default:
                return fuelType.trim().toLowerCase();
        }
    }

    return (
        <Grid container spacing={2}>
            <Grid item sm>
                <SearchField
                    label='Adresse eingeben (oder ermitteln lassen)'
                    value={currentAddress}
                    onChange={(eventValue) => {
                        setCurrentAddress(eventValue);
                        setLatLngFromAddress(eventValue);
                    }} />
            </Grid>
            <Grid item>
                <StandardButton 
                    buttonName={<Icon style={{ color: 'black' }} />}
                    onClick={() => (GeoSet())} />
                {!geoLoc.loaded ? <div></div> : <h1></h1>}
            </Grid>
            <Grid item>
                <StandardButton 
                    buttonName={'Suchen'} 
                    style={{ color: 'black' }}
                    onClick={() => (onClickSearch())} />
            </Grid>
        </Grid>
    )
}

export default FuelSearch;