import React from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    paper: {
        padding: theme.spacing.unit * 2,
        margin: 'auto',
        textAlign: 'center'
    }
});

const Order = ({request,classes})=>{
    return (
        <Paper className={classes.paper}>
                <Typography gutterBottom variant="subtitle1">{request.flavour}</Typography>
                <Typography gutterBottom>Quanity: {request.quantity}</Typography>
                <Typography gutterBottom>Size: {request.size}</Typography>
                <Typography color="textSecondary">ID: {request.id}</Typography>
         </Paper>
    );
};

export default withStyles(styles)(Order);