import React,{Component} from 'react'
import * as SignalR from "@aspnet/signalr";
import DisplayOrders from "../components/displayorders";
import { submitMixedOrder, reportFailure } from "../actions";
import { connect } from "react-redux";

class Mixer extends Component {
    constructor(props) {
        super(props);
        this.handleMixedOrderClick = this.handleMixedOrderClick.bind(this);

        this.state = {
            messages: [],
            hubConnection: null,
        };
    }

    componentDidMount = () => {
        const hubConnection = new SignalR.HubConnectionBuilder()
            .withUrl("http://localhost:5001/ordermonitorhub?consumergroup=bostonbeach&topic=orderrequests")
            .configureLogging(SignalR.LogLevel.Information)
            .build();
        
        this.setState({ hubConnection }, () => {
            hubConnection.start().then(function () {
                console.log("connected");
                
            }).catch(err => console.log('Error while establishing connection :('));
        });

        hubConnection.on('InformNewOrderToMix', (receivedMessage) => {
            console.log(receivedMessage);
            var newArray = this.state.messages.slice();
            newArray.push(receivedMessage);
            this.setState({ messages: newArray });
            console.log(this.state.messages[0]);
        });
        
    }

    handleMixedOrderClick = (orderObj) => {
        //TODO
        /* When user clicks on Mix button in the UI
             2. We trigger service call and update the status of this order as Mixed (by writing to (readytobake) topic)
             3. Remove this order from recieved order list since it is already processed.
        */
        //1
        console.log(this.state.messages);
        var payload = Object.assign({},orderObj,{"MixedBy":"CookName1","MixedOn":"TestDate"});
        
        //2
        console.log("Submitting mixed order -"+JSON.stringify(payload));
        this.props.submitMixedOrder(payload);
        
        //3
        var newArray = this.state.messages.filter( el => el.id != orderObj.id )
        this.setState({messages:newArray});
    }
    handleFailureOrderClick = (orderObj) => {
        //TODO
        //1
        console.log(this.state.messages);
        var payload = Object.assign({},orderObj,{"RejectedBy":"CookName1","RejectedOn":"TestDate"});
        
        //2
        console.log("Reporting failed order -"+JSON.stringify(payload));
        this.props.reportFailedOrder(payload);
        
        //3
        var newArray = this.state.messages.filter( el => el.id != orderObj.id )
        this.setState({messages:newArray});
    }
    render() {
        return (
            <div style={{"textAlign":"left"}}>
                <h1 style={{"color":"orange"}}>Hey Mixer </h1>
                {this.state.messages.length ? <b>New orders to be mixed: <b style={{"fontSize":"50px"}}> {this.state.messages.length}</b></b> :""}
                <br/>
                {this.state.messages.length ? 
                        <DisplayOrders list={this.state.messages} submitOrder={this.handleMixedOrderClick} process="Mix" reportFailure = {this.handleFailureOrderClick} /> : "No new orders"}
            </div>
        );
    }
}

const mapStateToProps = state => ({ readytomixorders: state.order.ReadyToMixOrders });

const mapDispatchToProps = dispatch => ({
    submitMixedOrder: payload => dispatch(submitMixedOrder(payload)),
    reportFailedOrder: payload => dispatch(reportFailure(payload))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Mixer);

