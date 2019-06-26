import React,{Component} from 'react'
import * as SignalR from "@aspnet/signalr";
import DisplayOrders from "../components/displayorders";
import { submitBoxedOrder,reportFailure } from "../actions";
import { connect } from "react-redux";

class Package extends Component {
    constructor(props) {
        super(props);
        this.handleBoxedOrderClick = this.handleBoxedOrderClick.bind(this);

        this.state = {
            messages: [],
            hubConnection: null,
        };
    }

    componentDidMount = () => {
        const hubConnection = new SignalR.HubConnectionBuilder()
            .withUrl("http://localhost:5004/ordermonitorhub?consumergroup=bostonbeach")
            .configureLogging(SignalR.LogLevel.Information)
            .build();
        
        this.setState({ hubConnection }, () => {
            hubConnection.start().then(function () {
                console.log("connected");
                
            }).catch(err => console.log('Error while establishing connection :('));
        });

        hubConnection.on('InformNewOrderToPackage', (receivedMessage) => {
            console.log(receivedMessage);
            var newArray = this.state.messages.slice();
            newArray.push(receivedMessage);
            this.setState({ messages: newArray });
            console.log(this.state.messages[0]);
        });
        
    }

    handleBoxedOrderClick = (orderObj) => {
        //TODO
        /* When user clicks on Submit button in the UI
             2. We trigger service call and update the status of this order as Packaged (by writing to (readytoship) topic)
             3. Remove this order from recieved order list since it is already processed.
        */
        //1
        console.log(this.state.messages);
        var payload = Object.assign({},orderObj,{"PackagedBy":"CookName2","PackagedOn":"TestDate"});
        
        //2
        console.log("Submitting packaged order -"+JSON.stringify(payload));
        this.props.submitBoxedOrder(payload);
        
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
                <h1 style={{"color":"green"}}>Hey Packaging-Team </h1>
                {this.state.messages.length ? <b>New orders to be baked: <b style={{"fontSize":"50px"}}> {this.state.messages.length}</b></b> :""}
                <br/>
                {this.state.messages.length ? 
                        <DisplayOrders list={this.state.messages} submitOrder={this.handleBoxedOrderClick} reportFailure = {this.handleFailureOrderClick} process="Package" /> : "No new orders"}
            </div>
        );
    }
}

const mapStateToProps = state => ({ readytoboxorders: state.order.ReadyToBoxOrders });

const mapDispatchToProps = dispatch => ({
    submitBoxedOrder: payload => dispatch(submitBoxedOrder(payload)),
    reportFailedOrder: payload => dispatch(reportFailure(payload))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Package);

