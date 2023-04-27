import '../../styles/PriceTile.css';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';

const PriceTile = (props) => {

    const Img = styled('img')({
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    });

    return (
        <Paper sx={{ p: 2, margin: 'auto', maxWidth: 500, flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item>
                    <ButtonBase sx={{ width: 128, height: 70 }}>
                        <Img alt="complex" src={`${process.env.PUBLIC_URL}/assets/placeholder.png`} />
                    </ButtonBase>
                </Grid>
                <Grid item xs={12} sm container>
                    <Grid item xs container direction="column" spacing={2}>
                        <Grid item xs>
                            <Typography gutterBottom variant="subtitle1" component="div">
                                {props.tileInformation[1]}
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                                Adress: <a href={'https://www.google.com/maps/place/' + props.tileInformation[4].replace(' ', '+')} target="_blank">{props.tileInformation[4]}</a>
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {props.tileInformation[2]}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {props.tileInformation[3]}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {props.tileInformation[4]}
                            </Typography>
                        </Grid>
                        <Grid item>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Typography variant="subtitle1" component="div">
                            Eur {props.tileInformation[0]}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
}

export default PriceTile;