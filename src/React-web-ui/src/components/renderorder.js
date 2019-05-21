import React from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    paper: {
        padding: theme.spacing.unit * 2,
        margin: 'auto',
        textAlign: 'center'
    },
    button:{
        textAlign: 'right',
        margin: theme.spacing.unit
    }
});

const RenderOrder = ({request,process,buttonAction,reportFailure,classes})=>{
    const submitAction = ()=>{
        buttonAction(request);
    }
    const submitFailure = ()=>{
        reportFailure(request);
    }
    return (
        <Paper className={classes.paper}>
                <Typography gutterBottom variant="subtitle1">{request.flavour}</Typography>
                <Typography gutterBottom>Quanity: {request.quantity}</Typography>
                <Typography gutterBottom>Size: {request.size}</Typography>
                <Typography color="textSecondary">ID: {request.id}</Typography>
                <Button variant="outlined" className={classes.button} onClick={submitAction}>
                    {process}
                </Button>
                <Button variant="outlined" className={classes.button} onClick={submitFailure}>
                    reject
                </Button>
         </Paper>
    );
};

export default withStyles(styles)(RenderOrder);