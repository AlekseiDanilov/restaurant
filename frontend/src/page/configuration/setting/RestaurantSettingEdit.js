import React from 'react';
import {inject, observer} from 'mobx-react';
import {compose} from 'recompose';
import Grid from "@material-ui/core/es/Grid/Grid";
import Paper from "@material-ui/core/es/Paper/Paper";
import withStyles from "@material-ui/core/es/styles/withStyles";
import DateField from "../../../component/form/DateField";
import Button from "@material-ui/core/es/Button/Button";
import Typography from "@material-ui/core/es/Typography/Typography";
import TextField from "../../../component/form/TextField";
import {Link} from "react-router-dom";

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 3,
  },
  field: {
    marginRight: theme.spacing.unit * 3
  },
  nameField: {
    marginBottom: theme.spacing.unit * 3
  },
  cancel: {
    marginLeft: theme.spacing.unit * 2
  }
});

class RestaurantSettingEdit extends React.Component {
  render() {
    const {classes, restaurantStore} = this.props;
    const {workTimeModel} = restaurantStore;

    if (!workTimeModel) {
      return <React.Fragment/>;
    }
    const {form} = workTimeModel;
    const {fields} = form;

    return (
      <Grid container
            justify='center'
            alignItems='center'
            spacing={8}>
        <Grid item xs={12} sm={8} md={6}>
          <Paper className={classes.paper}>
            <form>
              <Typography variant="h6">
                Restaurant name
              </Typography>
              <TextField model={restaurantStore.nameField} className={classes.nameField}/>
              <Typography variant="h6">
                Work time
              </Typography>
              <DateField type='time' model={fields.monFrom} className={classes.field}/>
              <DateField type='time' model={fields.monUntil} className={classes.field}/>
              <br/>
              <DateField type='time' model={fields.tueFrom} className={classes.field}/>
              <DateField type='time' model={fields.tueUntil} className={classes.field}/>
              <br/>
              <DateField type='time' model={fields.wedFrom} className={classes.field}/>
              <DateField type='time' model={fields.wedUntil} className={classes.field}/>
              <br/>
              <DateField type='time' model={fields.thuFrom} className={classes.field}/>
              <DateField type='time' model={fields.thuUntil} className={classes.field}/>
              <br/>
              <DateField type='time' model={fields.friFrom} className={classes.field}/>
              <DateField type='time' model={fields.friUntil} className={classes.field}/>
              <br/>
              <DateField type='time' model={fields.satFrom} className={classes.field}/>
              <DateField type='time' model={fields.satUntil} className={classes.field}/>
              <br/>
              <DateField type='time' model={fields.sunFrom} className={classes.field}/>
              <DateField type='time' model={fields.sunUntil} className={classes.field}/>
              <br/>
            </form>
            <Button disabled={form.hasError}
                    component={Link}
                    to="/config"
                    onClick={restaurantStore.save}
                    color="primary"
                    variant="contained">
              Save
            </Button>
            <Button component={Link}
                    to="/config"
                    className={classes.cancel}
                    color="secondary"
                    variant="contained">
              Cancel
            </Button>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default compose(
  withStyles(styles),
  inject('restaurantStore'),
  observer
)(RestaurantSettingEdit);
