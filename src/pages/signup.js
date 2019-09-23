import React, { Component } from "react";
import PropTypes from "prop-types";
import AppIcon from "../images/penguin.png";
import { Link } from "react-router-dom";

// redux stuff
import { connect } from "react-redux";
import { signupUser } from "../redux/actions/userActions";

// MUI stuff
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = {
  form: {
    textAlign: "center"
  },
  image: {
    margin: "20px auto 20px auto"
  },
  pageTitle: {
    margin: "10px auto 10px auto"
  },
  textField: {
    margin: "10px auto 10px auto"
  },
  button: {
    marginTop: 20,
    position: "relative"
  },
  customError: {
    color: "red",
    fontSize: "0.8rem",
    marginTop: 10
  },
  progress: {
    position: "absolute"
  }
};

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      handle: "",
      errors: {}
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.UI.errors !== prevProps.UI.errors) {
      this.setState({
        errors: this.props.UI.errors
      });
    }
  }

  handleSubmit = event => {
    event.preventDefault();
    const newUser = {
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      handle: this.state.handle
    };
    this.props.signupUser(newUser, this.props.history);
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    const {
      classes,
      UI: { loading }
    } = this.props;
    const { errors } = this.state;
    console.log(
      `The password is ${this.state.password} and is of `,
      typeof this.state.password
    );
    console.log(
      `The confirm password is ${this.state.confirmPassword} and is of `,
      typeof this.state.confirmPassword
    );
    return (
      <Grid container className={classes.form}>
        <Grid item sm />
        <Grid item sm>
          <img src={AppIcon} alt="Login Icon" className={classes.image} />
          <Typography variant="h2" className={classes.pageTitle}>
            Signup
          </Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField
              className={classes.textField}
              type="text"
              name="handle"
              id="handle"
              label="Handle"
              value={this.state.handle}
              helperText={errors.handle}
              error={errors.handle ? true : false}
              onChange={this.handleChange}
              fullWidth
            />
            <TextField
              className={classes.textField}
              type="email"
              name="email"
              id="email"
              label="Email"
              value={this.state.email}
              helperText={errors.email}
              error={errors.email ? true : false}
              onChange={this.handleChange}
              fullWidth
            />
            <TextField
              className={classes.textField}
              type="password"
              name="password"
              id="password"
              label="Password"
              error={errors.password ? true : false}
              helperText={errors.password}
              value={this.state.password}
              onChange={this.handleChange}
              fullWidth
            />
            <TextField
              className={classes.textField}
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              label="Confirm Password"
              error={errors.confirmPassword ? true : false}
              helperText={errors.confirmPassword}
              value={this.state.confirmPassword}
              onChange={this.handleChange}
              fullWidth
            />

            {errors.general && (
              <Typography variant="body2" className={classes.customError}>
                {errors.general}
              </Typography>
            )}

            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
              disabled={loading}
            >
              {loading && (
                <CircularProgress className={classes.progress} size={30} />
              )}
              Sign up
            </Button>
            <br />
            <small>
              Already have an account ? login <Link to="/login">here</Link>
            </small>
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }
}

Signup.propTypes = {
  classes: PropTypes.object.isRequired,
  signupUser: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  UI: state.UI
});

const mapActionsToProps = {
  signupUser
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Signup));
