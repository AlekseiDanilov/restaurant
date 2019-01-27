import React from 'react';
import PropTypes from 'prop-types';
import Tab from "@material-ui/core/Tab/Tab";
import Popper from "@material-ui/core/Popper/Popper";
import Grow from "@material-ui/core/Grow/Grow";
import Paper from "@material-ui/core/Paper/Paper";
import {ClickAwayListener} from "@material-ui/core/";
import MenuList from "@material-ui/core/MenuList/MenuList";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import withStyles from "@material-ui/core/styles/withStyles";
import {Link} from "react-router-dom";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";

const styles = () => ({
  popper: {
    position: 'fixed !important',
  }
});

class TabMenu extends React.Component {

  static propTypes = {
    label: PropTypes.string.isRequired,
    config: PropTypes.array.isRequired
  };

  state = {
    open: false,
  };

  handleToggle = () => {
    this.setState(state => ({open: !state.open}));
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render() {
    const {label, config, classes, ...props} = this.props;
    const {open} = this.state;
    return (
      <div>
        <Tab label={label}
             onClick={this.handleToggle}
             {...props}/>

        <Popper open={open}
                className={classes.popper}
                transition
                disablePortal>
          {({TransitionProps, placement}) => (
            <Grow {...TransitionProps}>
              <Paper>
                <ClickAwayListener onClickAway={this.handleClose}>
                  <MenuList>{config.map(c =>
                    <MenuItem key={c.link}
                              onClick={this.handleClose}
                              component={Link}
                              to={c.link}>
                      <ListItemText primary={c.title}/>
                    </MenuItem>
                  )}</MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    );
  }
}

export default withStyles(styles)(TabMenu);