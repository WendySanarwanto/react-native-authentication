import React, { Component } from 'react';
import {  View, Text, } from 'react-native';
import { Button, Card, CardSection } from './common';

export default class LoginForm extends Component {
  render() {
    return (
      <Card>
        <CardSection></CardSection>

        <CardSection></CardSection>

        <CardSection>
          <Button label="Login In" />
        </CardSection>
      </Card>
    );
  }
}
