import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField/TextField';
import Button from '@material-ui/core/Button/Button';
import { Link } from 'react-router-dom';

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexWrap: 'noWrap',
  },
  textField: {
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    width: theme.spacing.unit * 30,
  },
  button: {
    margin: theme.spacing.unit * 2
  }

});

class NewUserForm extends React.Component {

  state = {
    name: '',
    email: '',
    username: '',
    password: '',
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <form className={classes.container} autoComplete="off">
          <TextField
            id="name"
            label="Name"
            className={classes.textField}
            value={this.state.name}
            onChange={this.handleChange('name')}
            margin="normal"
          />
          <TextField
            id="username"
            label="Username"
            className={classes.textField}
            onChange={this.handleChange('username')}
            margin="normal"
          />
          <TextField
            id="email"
            label="Email"
            onChange={this.handleChange('email')}
            className={classes.textField}
            margin="normal"
          />
          <TextField
            id="password"
            label="Password"
            type="password"
            onChange={this.handleChange('password')}
            className={classes.textField}
            margin="normal"
          />
          <TextField
            id="passwordCnf"
            label="Confirm password"
            type="password"
            className={classes.textField}
            margin="normal"
          />
        </form>
        <Button variant="contained"
                className={classes.button}
                color="primary"
                onClick={() => {
                  console.log(this.state)
                }}>
          Save
        </Button>
        <Button variant="contained"
                className={classes.button}
                color="secondary"
                component={Link}
                to="/config/users">
          Cancel
        </Button>
      </div>
    );
  }
}


export default withStyles(styles)(NewUserForm);