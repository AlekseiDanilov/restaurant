import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField/TextField';
import Button from '@material-ui/core/Button/Button';
import {Link} from 'react-router-dom';
import {compose} from 'recompose';
import {inject} from 'mobx-react';
import mapRouteParamToProps from "../../hoc/mapRouteParamToProps";

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

class AddEditUserForm extends React.Component {

  initialState = {
    id: '',
    name: '',
    email: '',
    username: '',
    password: '',
  };

  state = this.initialState;

  constructor(props) {
    super(props);
    const {userId, userStore} = props;
    if (userId) {
      userStore.findById(userId).then(u => this.setState(u));
    }
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  submit = () => {
    const {userId, userStore} = this.props;
    const user = this.state;
    const action = userId ? userStore.updateUser : userStore.saveUser;
    action(user).then(() => {
      this.props.history.push("/config/users");
    })
  };

  render() {
    const {classes} = this.props;
    const user = this.state;
    return (
      <div>
        <form className={classes.container} autoComplete="off">
          <TextField
            id="name"
            label="Name"
            className={classes.textField}
            value={user.name}
            onChange={this.handleChange('name')}
            margin="normal"
          />
          <TextField
            id="username"
            label="Username"
            className={classes.textField}
            value={user.username}
            onChange={this.handleChange('username')}
            margin="normal"
          />
          <TextField
            id="email"
            label="Email"
            value={user.email}
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
                onClick={this.submit}>
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


export default compose(
  withStyles(styles),
  inject("userStore"),
  mapRouteParamToProps('id', 'userId')
)(AddEditUserForm);
