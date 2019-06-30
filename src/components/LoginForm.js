import React, { Component } from 'react';
import { Text } from 'react-native';
import { Button, Card, CardSection, Input, Spinner } from './common';
import firebase from 'firebase';

export default class LoginForm extends Component {
  state = { error: undefined, email: '', password: '', loading: false };

  async onClicked() {
    const { email, password } = this.state;
    this.setState({ error: undefined, loading: true });

    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      this.onLoginSuccess();
    } catch(signInErr) {
      console.log(`[WARN] - <LoginForm> Sign In using as '${email}' is failing. Details: \n`, signInErr);
      try { 
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        this.onLoginSuccess();
      } catch(createUserErr) {
        // Show message
        console.log(`[ERROR] - <LoginForm> Creating a new account with email: '${email}' is failing. Details: \n `, createUserErr);
        this.onLoginFail();
      } 
    }
  }

  onLoginFail() {
    this.setState({error: 'Authentication failed.', loading: false});
  }

  onLoginSuccess() {
    this.setState({ 
      email: '',
      password: '',
      loading: false 
    });
  }

  renderButton() {
    if (this.state.loading) {
      return <Spinner size="small"/>
    }

    return <Button label="Login In" onClicked={ this.onClicked.bind(this) } /> 
  }

  render() {   
    return (
      <Card>
        <CardSection>
          <Input 
            label= "Email" 
            value={this.state.email}
            placeHolder= "john.smith@gmail.com"
            onChangeText={ email => this.setState({ email }) }/>
        </CardSection>

        <CardSection>
          <Input 
            label= "Password" 
            value={this.state.password}
            placeHolder= "password"
            secureTextEntry
            onChangeText= { password => this.setState({ password }) } />
        </CardSection>

        <Text style={styles.errorTextStyle}>
          { this.state.error }
        </Text>

        <CardSection>
          { this.renderButton() }
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
