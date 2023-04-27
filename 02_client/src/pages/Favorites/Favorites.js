import { Component } from "react";
import axios from "axios";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import GasStationsOverview from '../../components/GasStationsOverview/GasStationsOverview';
import '../../styles/Message.css';

// Favorites Page
class Favorites extends Component {

    state = {
        isValid: false,
        bookmarkedGasStations: []
    };

    componentDidMount() {
        this.validateSessionKey();
        this.getBookmarkedGasStations();
    }

    componentWillUnmount() { }

    validateSessionKey = async () => {
        try {
            const _sessionKey = sessionStorage.getItem("SessionKey");
            const response = await axios.get(`http://localhost:3001/api/checksessionkey?sessionKey=${_sessionKey}`);
            this.setState({ isValid: response.data });
        } catch (error) {
            alert(`Error while validation of session key: ${error}`);
        }
    }

    getBookmarkedGasStations = async () => {
        const _sessionKey = sessionStorage.getItem("SessionKey");
        const response = await axios.get(`http://localhost:3001/api/bookmark?sessionKey=${_sessionKey}`);

        response.data.forEach(item => {
            const apiUrl = `https://creativecommons.tankerkoenig.de/json/detail.php?id=${item.fav_gs_id}&apikey=be6630ee-79b4-3deb-aa2b-8d4e66b1924f`;

            axios.get(apiUrl)
                .then(res => {
                    this.setState(state => ({
                        bookmarkedGasStations: [...state.bookmarkedGasStations, res.data.station]
                    }));
                })
                .catch(error => {
                    console.log(`Error while getting bookmarked user favorites. Error: ${error}`);
                });
        });
    }

    render() {
        if (this.state.isValid) {
            return (
                <Box sx={{ width: '100%' }}>
                    <Grid item xs={6}>
                        <div className='container-gasstations'>
                            <h1>Favorisierte Tankstellen ({this.state.bookmarkedGasStations.length})</h1>
                            <GasStationsOverview data={this.state.bookmarkedGasStations}></GasStationsOverview>
                        </div>
                    </Grid>
                </Box>
            );
        } else {
            return (
                <div>
                    <p className="loginMessage">Sie sind nicht angemeldet.<br />
                        Bitte melden Sie sich zuerst an.<br />
                        <a href='/signIn'>Zur Anmeldung</a>
                    </p>
                </div>
            );
        }
    }
}

export default Favorites;