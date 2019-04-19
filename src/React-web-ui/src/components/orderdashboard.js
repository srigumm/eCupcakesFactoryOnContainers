import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import OrderRequest from './orderrequest';
import OrdersToMixer from "./mixerprocess";
const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        margin: 'auto',
        textAlign: 'center'
    },
    image: {
        width: 128,
        height: 128,
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
});

const OrderDashboard = (props) => {

    const { classes } = props;
    return (
        <div className={classes.root}>

            <Grid container spacing={24}>
                
                <Grid item lg={12} sm container>
                    <Paper className={classes.paper}>
                        List of submitted Orders
                    </Paper>
                </Grid>
                <Grid item lg={6} sm container>
                        <OrderRequest submitOrder={props.submitOrder} />
                </Grid>
                <Grid item lg={6} sm container>
                    <Paper className={classes.paper}>
                        <OrdersToMixer />
                    </Paper>
                </Grid>
            </Grid>
            
            {/* <Paper className={classes.paper}>
                <Grid container spacing={16}>
                     <Grid item>
                        <ButtonBase className={classes.image}>
                            <img className={classes.img} alt="complex" src="../images/chai-latte-cupcakes.jpg" />
                        </ButtonBase>
                    </Grid> 
                    <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={16}>
                            <Grid item xs>
                                <Typography gutterBottom variant="subtitle1">
                                    Chai latte cupcake
                                </Typography>
                                <Typography gutterBottom>Full resolution 1920x1080 • JPEG</Typography>
                                <Typography color="textSecondary">ID: 1030114</Typography>
                            </Grid>
                            <Grid item>
                                <Typography style={{ cursor: 'pointer' }}>Remove</Typography>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Typography variant="subtitle1">$19.00</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper> */}
        </div>
    );
}

export default withStyles(styles)(OrderDashboard);