import React, { Component } from 'react';
import { Button, Card, CardSection, Input } from './common';

export default class LoginForm extends Component {
  state = { email: '', password: '' };

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

        <CardSection>
          <Button label="Login In" />
        </CardSection>
      </Card>
    );
  }
}
