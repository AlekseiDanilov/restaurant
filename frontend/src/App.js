import React, {Component} from 'react';
import Router from './Router';
import {Provider} from 'mobx-react';
import RootStore from './model/store/RootStore';
import {MuiPickersUtilsProvider} from "material-ui-pickers";
import MomentUtils from '@date-io/moment';

const rootStore = new RootStore();

class App extends Component {
  render() {
    return (
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <Provider {...rootStore}>
          <Router/>
        </Provider>
      </MuiPickersUtilsProvider>
    );
  }
}

export default App;
