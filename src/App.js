import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import Router from './Router';

class App extends Component {
    componentWillMount(){
        const config = {
            apiKey: "AIzaSyBoWNOn_at8DSsyAnqMDcIHH-t1qwf45FM",
            authDomain: "manager-e83e5.firebaseapp.com",
            databaseURL: "https://manager-e83e5.firebaseio.com",
            projectId: "manager-e83e5",
            storageBucket: "manager-e83e5.appspot.com",
            messagingSenderId: "434413914093"
          };
          firebase.initializeApp(config);
    }
    render(){
         store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
        return(
          <Provider store={store}>
            <Router/>
          </Provider>      
        );
    }
}

export default App;
