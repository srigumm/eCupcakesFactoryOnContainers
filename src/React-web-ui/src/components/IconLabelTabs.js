import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import DeleteRounded from '@material-ui/icons/DeleteRounded';
import WorkOutline from '@material-ui/icons/WorkOutline';
import BorderClear from '@material-ui/icons/BorderClear';
import WbIncandescent from '@material-ui/icons/WbIncandescent';



const styles = {
  root: {
    flexGrow: 1,
    // maxWidth: 500,
  },
};

class IconLabelTabs extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;

    return (
      <Paper square className={classes.root}>
        <Tabs
          value={this.state.value}
          onChange={this.handleChange}
          variant="fullWidth"
          indicatorColor="secondary"
          textColor="secondary"
        >
          <Tab icon={<DeleteRounded />} label="Mixing" />
          <Tab icon={<WbIncandescent />} label="Bake" />
          <Tab icon={<BorderClear />} label="Decorate" />
          <Tab icon={<WorkOutline />} label="Package" />
        </Tabs>
      </Paper>
    );
  }
}

IconLabelTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IconLabelTabs);
