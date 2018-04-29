import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Header } from './components/comon';

export default class App extends Component {
  render() {
    return (
      <View>
        <Header title="Authentication" />
        <Text>An app</Text>
      </View>
    );
  }
}
