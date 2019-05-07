import React, { Component } from 'react';
import { Text, View } from 'react-native';
import RNLocation from 'react-native-location';

export default class App extends Component {
  async componentDidMount() {
    RNLocation.configure({
      allowsBackgroundLocationUpdates: true,
      pausesLocationUpdatesAutomatically: false,
      showsBackgroundLocationIndicator: true,
    });
    const permission = await RNLocation.checkPermission({
      ios: 'always', // or 'always'
      android: {
        detail: 'fine', // or 'fine'
      },
    });
    if (!permission) {
      const request = await RNLocation.requestPermission({
        ios: 'always',
        android: {
          detail: 'fine',
          rationale: {
            title: 'Necesitamos permisos para acceder a tu ubicación',
            message: 'Usaremos tu ubicación para ubicarte en el mapa',
            buttonNegative: 'Denegar',
            buttonPositive: 'Permitir',
          },
        },
      });
      if (request) this.startUpdatingLocation();
    } else {
      this.startUpdatingLocation();
    }
    console.log(permission);
  }

  startUpdatingLocation = () => {
    RNLocation.subscribeToLocationUpdates((locations) => {
      console.log(locations);
    });
  }

  render() {
    return (
      <View>
        <Text>Hi</Text>
      </View>
    );
  }
}
