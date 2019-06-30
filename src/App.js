import React, { Component } from 'react';
import { View } from 'react-native';
import LoginForm from './components/LoginForm';
import { CardSection, Header, Button, Spinner } from './components/common';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { doInitialiseFirebaseApp } from './actions';

import Root from './Root';

class App extends Component {
  
  componentDidMount() {
    this.props.doInitialiseFirebaseApp();
  }

  renderContent(loggedIn) {
    switch(loggedIn) {
      case true:
        return ( 
          <CardSection>
            <Button label="Log Out" onClicked={() => firebase.auth().signOut()}/>
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
    const { loggedIn } = this.props;
    return (
      <View>
        <Header title="Authentication" />
        { this.renderContent(loggedIn) }
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    loggedIn: state.loginState.loggedIn
  }
}

const ConnectedApp = connect(mapStateToProps, { doInitialiseFirebaseApp })(App);

export default root = () => (
  <Root>
    <ConnectedApp/>
  </Root>
);
