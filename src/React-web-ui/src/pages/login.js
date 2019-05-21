import React,{Component} from 'react';
import Button from '@material-ui/core/Button';
import SimpleDialog from '../components/simpledialog';

class Login extends Component {
    state = {
      open: false,
      selectedValue: "",
    };
  
    handleClickOpen = () => {
      this.setState({
        open: true,
      });
    };
  
    handleClose = value => {
      this.setState({ selectedValue: value, open: false });
      this.props.history.push('/'+value);
    };
  
    render() {
      return (
        <div>
          <br />
          <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
            Login
          </Button>
          <SimpleDialog
            selectedValue={this.state.selectedValue}
            open={this.state.open}
            onClose={this.handleClose}
          />
        </div>
      );
    }
  }
  
  export default Login;