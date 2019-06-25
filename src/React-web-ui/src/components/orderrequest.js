import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from '@material-ui/core/TextField';
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 180
  },
  card: {
    width: 400,
    margin: "auto",
    textAlign: "center"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 100,
  },
  media: {
    height: 140
  }
});

const handleChange = event => {
  //this.setState({ [event.target.name]: event.target.value });
  //alert(event.target.value);
};

export class OrderRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
        OrderDetail:{
            Flavour: 0,
            Size: 0,
            Quanity:0
        },
        SubmissionStatusMessage: ""
    };
  }

  handleSubmitClick() {
    this.props.submitOrder(this.state.OrderDetail);
    this.setState(prevState => ( {"SubmissionStatusMessage":"we recieved your order"}));
  }

  handleCupCakeFlavourChange(flavour) {
    console.log(flavour);
    this.setState(prevState => ({
        "OrderDetail": {
            ...prevState.OrderDetail,
            "Flavour": flavour
        },
        "SubmissionStatusMessage":"" //clear submission status message.
    }));
  }

  handleCupCakeSizeChange(size) {
    this.setState(prevState => ({
        "OrderDetail": {
            ...prevState.OrderDetail,
            "Size": size
        },
        "SubmissionStatusMessage":"" 
    }));
  }

  handleCupCakeQuantityChange(quantity) {
    this.setState(prevState => ({
        "OrderDetail": {
            ...prevState.OrderDetail,
            "Quantity": quantity
        },
        "SubmissionStatusMessage":"" 
    }));
  }

  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.card}>
        <CardHeader title="Place New Order Here" />
        <CardContent>
          <form className={classes.root} autoComplete="off">
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="cupcake-flavour">Choose Flavour</InputLabel>
              <Select
                onChange={event => {
                  this.handleCupCakeFlavourChange(
                    event.target.value
                  );
                }}
                value={this.state.OrderDetail.Flavour}
                inputProps={{
                    name: 'flavour',
                    id: 'cupcake-flavour',
                  }}
                  className={classes.textField}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="Chacolate">Chocolate</MenuItem>
                <MenuItem value="Vanilla">Vanilla</MenuItem>
                <MenuItem value="Coffee">Coffee</MenuItem>
              </Select>
              </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="cupcake-size" >Choose Size</InputLabel>
              <Select
                onChange={event => {
                  this.handleCupCakeSizeChange(
                    event.target.value
                  );
                }}
                className={classes.textField}
                inputProps={{
                    name: 'size',
                    id: 'cupcake-size',
                  }}
                value={this.state.OrderDetail.Size}
              >
                <MenuItem abel="Size" value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={0}>Small</MenuItem>
                <MenuItem value={1}>Medium</MenuItem>
                <MenuItem value={2}>Large</MenuItem>
              </Select>
              </FormControl>
              <FormControl className={classes.formControl}>
                <TextField
                    id="quantity"
                    defaultValue="0" label="Quantity"
                    className={classes.textField}
                    margin="normal"
                    type="number"
                    onChange={event => {
                        this.handleCupCakeQuantityChange(
                          event.target.value
                        );
                    }}
                />
              </FormControl>
            
          </form>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            color="primary"
            onClick={event => {
              this.handleSubmitClick();
            }}
          >
            Order
          </Button>
        </CardActions>
        <CardContent>
        <InputLabel >{this.state.SubmissionStatusMessage}</InputLabel>
        </CardContent>
      </Card>
    );
  }
}
export default withStyles(styles)(OrderRequest);