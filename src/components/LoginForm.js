import React, { Component } from 'react';
import { Text } from 'react-native';
import { Button, Card, CardSection, Input } from './common';
import firebase from 'firebase';

export default class LoginForm extends Component {
  state = { error: undefined, email: '', password: '' };

  async onClicked() {
    const { email, password } = this.state;
    this.setState({ error: undefined });

    try {
      await firebase.auth()
        .signInWithEmailAndPassword(email, password);
    } catch(signInErr) {
      console.log(`[WARN] - <LoginForm> Sign In using as '${email}' is failing. Details: \n`, signInErr);
      try { 
        await firebase.auth()
          .createUserWithEmailAndPassword(email, password);
      } catch(createUserErr) {
        // Show message
        console.log(`[ERROR] - <LoginForm> Creating a new account with email: '${email}' is failing. Details: \n `, createUserErr);
        this.setState({error: 'Authentication failed.'});
      }
    }
  }

  render() {
    return (
      <Card>
        <CardSection>
          <Input label= "Email" value={this.state.email}
            placeHolder= "john.smith@gmail.com"
            onChangeText={ email => this.setState({ email }) }/>
        </CardSection>

        <CardSection>
          <Input label= "Password" value={this.state.password}
          placeHolder= "password"
          secureTextEntry
          onChangeText= { password => this.setState({ password }) } />
        </CardSection>

        <Text style={styles.errorTextStyle}>
          { this.state.error }
        </Text>

        <CardSection>
          <Button label="Login In"
            onClicked={ this.onClicked.bind(this) } />
        </CardSection>
      </Card>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
};
