import React, { Component } from 'react';
import { View } from 'react-native';
import LoginForm from './components/LoginForm';
import { CardSection, Header, Button, Spinner } from './components/common';
import firebase from 'firebase';

export default class App extends Component {
  state = { loggedIn: null };

  componentDidMount() {
    // Initialize Firebase
    const config = {
      apiKey: 'AIzaSyDf6UWB0FEs4-biGOUW1MCo4dkPqtDF5xY',
      authDomain: 'rn-authentication-505a8.firebaseapp.com',
      databaseURL: 'https://rn-authentication-505a8.firebaseio.com',
      projectId: 'rn-authentication-505a8',
      storageBucket: 'rn-authentication-505a8.appspot.com',
      messagingSenderId: '749524062865'
    };
    firebase.initializeApp(config);

    firebase.auth().onAuthStateChanged((user) => {
      this.setState({ loggedIn: user ? true : false });
    });
  }

  renderContent() {
    switch(this.state.loggedIn) {
      case true:
        return ( 
          <CardSection>
            <Button label="Log Out" />
          </CardSection>
        )       
      case false:
        return <LoginForm />
      default:
        return ( 
          <CardSection>
            <Spinner style={{ alignItems: 'center' }} size="large" />
          </CardSection>
        )
    }
  }

  render() {
    return (
      <View>
        <Header title="Authentication" />
        { this.renderContent() }
      </View>
    );
  }
}
