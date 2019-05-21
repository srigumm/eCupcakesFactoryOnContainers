import React from 'react';
import OrderRequest from "../components/orderrequest";
import { submitUserOrderRequest} from "../actions";
import { connect } from "react-redux";

const CreateOrderRequest = (props)=>{
    return (
        <div>
            <OrderRequest submitOrder={props.submitOrder} />
        </div>
    )
}

const mapStateToProps = state => (
    {submittedorders:state.order.submittedorders,
        recievedorders:state.order.recievedorders,
        orderdetails:state.order.OrderDetails});

const mapDispatchToProps = dispatch => ({
    submitOrder: payload => dispatch(submitUserOrderRequest(payload))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateOrderRequest);
