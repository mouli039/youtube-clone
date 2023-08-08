import React, {Component} from 'react';
import {Provider} from 'react-redux';
import Navigations from './src/components/Navigations';
import myStore from './src/redux/store';

class App extends Component {
  render() {
    return (
      <Provider store={myStore}>
        <Navigations />
      </Provider>
    );
  }
}

export default App;
