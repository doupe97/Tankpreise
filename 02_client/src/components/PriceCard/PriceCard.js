import '../../styles/PriceCard.css'
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FuelPriceInfo from '../FuelPriceInfo/FuelPriceInfo';
import BookmarkButton from '../BookmarkButton/BookmarkButton';

const PriceCard = (props) => {

    const toAddressCase = (text) => {
        return text
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')
            .replace('Straße', 'Str.')
            .replace('Strasse', 'Str.')
            .replace('Str ', 'Str. ')
            .replace(' , ', ', ')
            .replace('  , ', ', ');
    };

    const BrandImg = styled('img')({
        margin: 'auto',
        display: 'block',
        maxWidth: '120px',
        maxHeight: '120px',
        padding: '20px 30px 0px 20px'
    });

    const OpenStateImg = styled('img')({
        margin: 'auto',
        display: 'block',
        maxWidth: '80px',
        maxHeight: '30px'
    });

    return (
        <Paper sx={{ p: 2, margin: 'auto', maxWidth: 600, flexGrow: 1 }} className="paper">
            <Grid container spacing={2}>
                <Grid item>
                    <BrandImg alt="brandLogo" src={props.data[5]} />
                </Grid>
                <Grid item xs={12} sm container>
                    <Grid item xs container direction="column" spacing={2}>
                        <Grid item xs>
                            <Typography gutterBottom variant="h5" component="div" className="brandName">
                                {props.data[0]}
                            </Typography>
                            <Typography variant="body2" gutterBottom className="address">
                                <a href={'https://www.google.com/maps/place/' + props.data[1].replace(' ', '+')} target="_blank">{toAddressCase(props.data[1])}</a>
                            </Typography>
                            <Typography variant="h6" component="div" className="dist">
                                {props.data[6]}
                            </Typography>
                            <Box sx={{ flexGrow: 1, marginTop: 3 }}>
                                <Grid container spacing={1}>
                                    <FuelPriceInfo data={["Diesel", props.data[2]]}/>
                                    <FuelPriceInfo data={["Super E5", props.data[3]]}/>
                                    <FuelPriceInfo data={["Super E10", props.data[4]]}/>
                                </Grid>
                            </Box>
                        </Grid>
                            <Grid item>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <BookmarkButton data={props.data[8]}></BookmarkButton>
                        <Typography component="div" sx={{ marginTop: 25 }}>
                            <OpenStateImg src={props.data[7]} alt="openStateLogo" />
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
}

export default PriceCard;