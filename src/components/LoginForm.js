import React, { Component } from 'react';
import { Button, Card, CardSection, Input } from './common';

export default class LoginForm extends Component {
  state = { email: '' };

  render() {
    return (
      <Card>
        <CardSection>
          <Input label= "Email" value={this.state.email}
            placeHolder= "john.smith@gmail.com"
            onChangeText={ email => this.setState({ email }) }/>
        </CardSection>

        <CardSection></CardSection>

        <CardSection>
          <Button label="Login In" />
        </CardSection>
      </Card>
    );
  }
}
