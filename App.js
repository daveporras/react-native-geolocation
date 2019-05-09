import React, { Component } from 'react';
import { Text, View } from 'react-native';
import BackgroundGeolocation from '@mauron85/react-native-background-geolocation';

export default class App extends Component {
  state = {
    latitude: 'calculando....',
    longitude: 'calculando....',
  }

  componentDidMount() {
    BackgroundGeolocation.configure({
      debug: false,
      desiredAccuracy: BackgroundGeolocation.HIGH_ACCURACY,
      distanceFilter: 0,
      startOnBoot: true,
      startForeground: true,
      stopOnTerminate: false,
      interval: 5000,
      fastestInterval: 5000,
      activitiesInterval: 10000,
      stopOnStillActivity: false,
      notificationsEnabled: false,
    });

    BackgroundGeolocation.on('location', (location) => {
      console.log(location);
      const { latitude, longitude } = location;
      BackgroundGeolocation.startTask((taskKey) => {
        this.setState({ latitude, longitude });
        BackgroundGeolocation.endTask(taskKey);
      });
    });

    BackgroundGeolocation.on('background', () => {
      console.log('[INFO] App is in background');
    });

    BackgroundGeolocation.on('foreground', () => {
      console.log('[INFO] App is in foreground');
    });

    BackgroundGeolocation.checkStatus((status) => {
      console.log('[INFO] BackgroundGeolocation service is running', status.isRunning);
      console.log('[INFO] BackgroundGeolocation services enabled', status.locationServicesEnabled);
      console.log('[INFO] BackgroundGeolocation auth status: ', status.authorization);
    });

    // you can also just start without checking for status
    BackgroundGeolocation.start();

    /* BackgroundGeolocation.getConfig(config => console.log(config)); */
  }

  componentWillUnmount() {
    BackgroundGeolocation.removeAllListeners();
  }

  render() {
    const { latitude, longitude } = this.state;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>{`Latitud: ${latitude}`}</Text>
        <Text>{`Longitud: ${longitude}`}</Text>
      </View>
    );
  }
}
