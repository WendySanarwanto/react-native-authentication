import React, { Component } from 'react';
import { Text } from 'react-native';
import { Button, Card, CardSection, Input, Spinner } from './common';
// import firebase from 'firebase';
import { connect } from 'react-redux';
import { doSignIn } from '../actions/';

class LoginForm extends Component {
  state = { error: undefined, email: '', password: '', loading: false };

  async onClicked() {
    const { email, password } = this.state;
    this.setState({ error: undefined, loading: true });
    this.props.doSignIn(email, password, (err) => {
      if (err) {
        this.onLoginFail();
      } else {
        this.onLoginSuccess();
      }
    });
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

  renderErrorMessage(errMessage) {
    if (!errMessage) return null;

    return (
      <Text style=
        {styles.errorTextStyle}>{ errMessage }
      </Text>
    );
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

        { this.renderErrorMessage(this.state.error) }

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

export default connect(null, { doSignIn })(LoginForm);
