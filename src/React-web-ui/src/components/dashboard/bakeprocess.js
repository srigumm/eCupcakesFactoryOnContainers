
import React, { Component } from 'react';
import * as SignalR from "@aspnet/signalr";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'
import ButtonBase from '@material-ui/core/ButtonBase';

const styles = (theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
    card: {
        width: 400,
        height: 310,
        textAlign: 'center'
    },
    media: {
        height: 160,
    },
    image: {
        position: 'relative',
        height: 200,
        [theme.breakpoints.down('xs')]: {
          width: '100% !important', // Overrides inline-style
          height: 100,
        },
        '&:hover, &$focusVisible': {
          zIndex: 1,
          '& $imageBackdrop': {
            opacity: 0.15,
          },
          '& $imageMarked': {
            opacity: 0,
          },
          '& $imageTitle': {
            border: '4px solid currentColor',
          },
        },
      },
      focusVisible: {},
      imageButton: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.palette.common.white,
      },
      imageSrc: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundSize: 'cover',
        backgroundPosition: 'center 40%',
      },
      imageBackdrop: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: theme.palette.common.black,
        opacity: 0.4,
        transition: theme.transitions.create('opacity'),
      },
      imageTitle: {
        position: 'relative',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 4}px ${theme.spacing.unit + 6}px`,
      },
      imageMarked: {
        height: 3,
        width: 18,
        backgroundColor: theme.palette.common.white,
        position: 'absolute',
        bottom: -2,
        left: 'calc(50% - 9px)',
        transition: theme.transitions.create('opacity'),
      }
});

class OrdersToBake extends Component {
    constructor(props) {
        super(props);

        this.handleBakedOrderClick = this.handleBakedOrderClick.bind(this);

        this.state = {
            messages: [],
            hubConnection: null,
        };
    }

    componentDidMount = () => {
        const hubConnection = new SignalR.HubConnectionBuilder()
            .withUrl("http://localhost:5002/ordermonitorhub?consumergroup=bostonbeach&topic=readytobake")
            .configureLogging(SignalR.LogLevel.Information)
            .build();
        this.setState({ hubConnection }, () => {
            hubConnection.start().then(function () {
                console.log("connected");

            }).catch(err => console.log('Error while establishing connection :('));
        });

        hubConnection.on('InformNewOrderToBake', (receivedMessage) => {
            console.log(receivedMessage);
            var newArray = this.state.messages.slice();
            newArray.push(receivedMessage);
            this.setState({ messages: newArray });
            console.log(this.state.messages[0]);
        });

    }

    handleBakedOrderClick = () => {
        //TODO
        /* When user clicks on "bake" button in the UI
             1. we assume that the Baker(cook) took the most earliest  order in the newly recieved "mixed" list.
             2. We trigger service call and update the status of this order as Baked (by writing to (readytodecorate) topic)
             3. Remove this order from recieved order list since it is already processed.
        */
        //1
        console.log(this.state.messages);
        var payload = Object.assign({},this.state.messages[0],{"BakedBy":"Bake-CookName1","BakedOn":"BakedTestDate"});
        
        //2
        console.log("Submitting baked order -"+JSON.stringify(payload));
        
        //2
        this.props.submitBakedOrder(payload);
        
        //3
        var newArray = this.state.messages.slice(1);
        this.setState({messages:newArray});

    }

    render() {
        const { classes } = this.props;
        const ViewAll = props => <Link to="/listorders" {...props} />
        const NewOrders = ()=>{
            return (
                <div>New orders: 
                    <Button size="small" color="primary" component={ViewAll} >{this.state.messages.length}</Button>
                </div>);
        };
        //const ViewAll = props => <Link to={{ pathname: '/listorders', state: { list: this.state.messages} }} {...props} />
        return (

            <Card className={classes.card}>
                <CardHeader title="Bake Process " component="span" style={{ backgroundColor: 'lightblue', color: 'white' }}>
                </CardHeader>
                
                <CardContent>
                    <ButtonBase
                    focusRipple
                    key="bake"
                    className={classes.image}
                    focusVisibleClassName={classes.focusVisible}
                    style={{
                        width: "100%",
                        height:"180px"
                    }}
                    >
                    <span
                        className={classes.imageSrc}
                        style={{
                        backgroundImage: `url(bakeprocess.png)`
                        }}
                    />
                    <span className={classes.imageBackdrop} />
                    <span className={classes.imageButton} onClick={this.handleBakedOrderClick} >
                        <Typography
                        component="span"
                        variant="subtitle1"
                        color="inherit"
                        className={classes.imageTitle}
                        >
                        BAKE
                        <span className={classes.imageMarked} />
                        </Typography>
                    </span>
                    </ButtonBase>
                    {/* this.state.messages.map((orderrequest, index) => (
                        <Order request={orderrequest}/> 
                    )) : "No New Orders" } */}
                </CardContent>
                <CardActions>
                    <Typography component="button" variant="subtitile" style={{right:0}}>
                    { this.state.messages.length==0 ? "No Orders" : <NewOrders/> }
                    </Typography>
                </CardActions>
            </Card>
        );
    }
}

export default withStyles(styles)(OrdersToBake);