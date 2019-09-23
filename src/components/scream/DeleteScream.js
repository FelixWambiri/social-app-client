import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import MyButton from "../../util/MyButton";

// MUI Stuff
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DeleteOutline from "@material-ui/icons/DeleteOutline";

import { connect } from "react-redux";
import { deleteScream } from "../../redux/actions/dataActions";

const styles = {
  deleteButton: {
    position: "absolute",
    left: "90%",
    top: "10%"
  }
};

class DeleteScream extends Component {
  state = {
    open: false
  };

  toggleDialogState = () => {
    this.setState({
      open: !this.state.open
    });
  };

  deleteScream = () => {
    this.props.deleteScream(this.props.screamId);
    this.toggleDialogState();
  };
  render() {
    const { classes } = this.props;

    return (
      <>
        <MyButton
          tip="Delete Scream"
          onClick={this.toggleDialogState}
          btnClassName={classes.deleteButton}
        >
          <DeleteOutline color="secondary"/>
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.toggleDialogState}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Are you sure you want to delete this scream</DialogTitle>
          <DialogActions>
            <Button onClick={this.toggleDialogState} color="primary">
              Cancel
            </Button>
            <Button onClick={this.deleteScream} color="secondary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

DeleteScream.propTypes = {
  deleteScream: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  screamId: PropTypes.string.isRequired
};

export default connect(
  null,
  { deleteScream }
)(withStyles(styles)(DeleteScream));
