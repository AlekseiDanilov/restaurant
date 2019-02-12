import React from 'react';
import {inject, observer} from 'mobx-react';
import {compose} from 'recompose';
import Typography from "@material-ui/core/es/Typography/Typography";
import IconButton from "@material-ui/core/es/IconButton/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import {Link} from "react-router-dom";


class RestaurantSetting extends React.Component {
  render() {
    const {restaurantStore} = this.props;
    const {workTimeModel} = restaurantStore;
    if (!workTimeModel) {
      return <React.Fragment/>;
    }

    return (
      <div>
        <Typography variant="h5">
          {restaurantStore.name}
          <IconButton color="inherit" component={Link} to="/config/setting">
            <EditIcon/>
          </IconButton>
        </Typography>
        <Typography variant="title">
          {`Monday ${workTimeModel.monFrom.format('HH:mm')} - ${workTimeModel.monUntil.format('HH:mm')}`}
        </Typography>
        <Typography variant="title">
          {`Tuesday ${workTimeModel.thuFrom.format('HH:mm')} - ${workTimeModel.tueUntil.format('HH:mm')}`}
        </Typography>
        <Typography variant="title">
          {`Wednesday ${workTimeModel.wedFrom.format('HH:mm')} - ${workTimeModel.wedUntil.format('HH:mm')}`}
        </Typography>
        <Typography variant="title">
          {`Thursday ${workTimeModel.thuFrom.format('HH:mm')} - ${workTimeModel.thuUntil.format('HH:mm')}`}
        </Typography>
        <Typography variant="title">
          {`Friday ${workTimeModel.friFrom.format('HH:mm')} - ${workTimeModel.friUntil.format('HH:mm')}`}
        </Typography>
        <Typography variant="title">
          {`Saturday ${workTimeModel.satFrom.format('HH:mm')} - ${workTimeModel.satUntil.format('HH:mm')}`}
        </Typography>
        <Typography variant="title">
          {`Sunday ${workTimeModel.sunFrom.format('HH:mm')} - ${workTimeModel.sunUntil.format('HH:mm')}`}
        </Typography>
      </div>
    );
  }
}

export default compose(
  inject('restaurantStore'),
  observer
)(RestaurantSetting);