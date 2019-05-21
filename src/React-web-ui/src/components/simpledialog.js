import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import blue from '@material-ui/core/colors/blue';

const userroles = [
                    {"id":'mixer',"value":"mixer"}, 
                    {"id":'baker',"value":"baker"},
                    {"id":'decorator',"value":"decorator"},
                    {"id":'packaging',"value":"packaging team"},
                    {"id":'dashboard',"value":"Admin - Dashboard"},
                    {"id":'create',"value":"Customer"}
                ];

const styles = {
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
};

 class SimpleDialog extends React.Component {
  handleClose = () => {
    this.props.onClose(this.props.selectedValue);
  };

  handleListItemClick = value => {
    this.props.onClose(value);
  };

  render() {
    const { classes, onClose, selectedValue, ...other } = this.props;

    return (
      <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" {...other}>
        <DialogTitle id="simple-dialog-title">Choose your role</DialogTitle>
        <div>
          <List>
            {userroles.map(role => (
              <ListItem button onClick={() => this.handleListItemClick(role.id)} key={role.id}>
                <ListItemText primary={role.value} />
              </ListItem>
            ))}
          </List>
        </div>
      </Dialog>
    );
  }
}

SimpleDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func,
  selectedValue: PropTypes.string,
};

export default withStyles(styles)(SimpleDialog);