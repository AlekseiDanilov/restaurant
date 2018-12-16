import React, { Component } from 'react';
import Router from './Router';
import { Provider } from 'mobx-react';
import RootStore from './model/store/RootStore';

const rootStore = new RootStore();

class App extends Component {
  render() {
    return (
      <Provider {...rootStore}>
        <Router/>
      </Provider>
    );
  }
}

export default App;
