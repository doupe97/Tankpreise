import { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import GasStationsOverview from '../../components/GasStationsOverview/GasStationsOverview';
import SearchConfigurator from '../../components/SearchConfigurator/SearchConfigurator';
import '../../styles/Homepage.css';
import '../../styles/Message.css';

// Search Page
const Search = () => {

  const _sessionKey = sessionStorage.getItem("SessionKey");
  const [gasStations, setGasStations] = useState([]);
  var [isValid, setIsValid] = useState(false);

  var validateSessionKey = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/checksessionkey?sessionKey=${_sessionKey}`);
      setIsValid(response.data);
    } catch (error) {
      console.log(`Error while validating the session key. Error: ${error}`);
    }
  }

  useEffect(() => {
    validateSessionKey();
  }, []);

  const setGasStationsData = (data) => {
    setGasStations(data);
  }

  if (_sessionKey == null || !isValid) {
    return (
      <div>
        <p className="loginMessage">Sie sind nicht angemeldet.<br />
          Bitte melden Sie sich zuerst an.<br />
          <a href='/signIn'>Zur Anmeldung</a>
        </p>
      </div>
    );
  } else {
    return (
      <Box sx={{ width: '100%' }}>
        <Grid container rowSpacing={1}>
          <Grid item xs={6}>
            <div className='container-gasstations'>
              <h1>Verfügbare Tankstellen</h1>
              <GasStationsOverview data={gasStations}></GasStationsOverview>
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className='container-search'>
              <h1 className="headline">Tankstellensuche</h1>
              <SearchConfigurator callBack={setGasStationsData}></SearchConfigurator>
            </div>
          </Grid>
        </Grid>
      </Box>
    );
  }
}

export default Search;