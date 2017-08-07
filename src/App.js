import React, { PureComponent } from 'react';
import {
  View,
  Text,
} from 'react-native';
import { getCurrentPosition } from './geolocation';

export default class App extends PureComponent {
  state = {
    text: 'Waiting for position',
  }

  async componentDidMount() {
    const position = await getCurrentPosition();
    console.warn('position', position);
    console.warn('this.props', this.props);
    if (position) {
      const {
        latitude,
        longitude,
      } = position.coords;
      this.setState({
        text: `${latitude}, ${longitude}`,
      });
    } else {
      this.setState({
        text: 'Position timeout expired',
      });
    }
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ textAlign: 'center', fontSize: 25, color: '#333' }}>
          {this.state.text}
        </Text>
      </View>
    );
  }
}