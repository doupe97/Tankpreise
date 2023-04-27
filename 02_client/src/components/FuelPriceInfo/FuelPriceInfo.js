import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const FuelPriceInfo = (props) => {

    return (
        <Grid container item spacing={2}>
            <React.Fragment>
                <Grid item xs={4}>
                    <Typography variant="h6" color="text.secondary">
                        {props.data[0]}
                    </Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography variant="h6" color="text.secondary">
                        {props.data[1]}
                    </Typography>
                </Grid>
            </React.Fragment>
        </Grid>
    );

}

export default FuelPriceInfo;