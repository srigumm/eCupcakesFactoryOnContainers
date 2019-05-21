
import React from 'react';
import RenderOrder from './renderorder';
import Grid from '@material-ui/core/Grid';

const DisplayOrders = (props) => (
   <Grid container spacing={24}>
      {props.list ?props.list.map((orderrequest, index) => (
        <Grid item xs={6} sm={3} >
          <RenderOrder request={orderrequest} process={props.process} buttonAction={props.submitOrder} reportFailure={props.reportFailure} />
        </Grid>
      )): "No new orders"}
    </Grid>
);

export default DisplayOrders;