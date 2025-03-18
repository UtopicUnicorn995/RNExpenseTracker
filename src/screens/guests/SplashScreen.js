import React from 'react';
import {View, Text, ActivityIndicator, StyleSheet, Image} from 'react-native';

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/hero1.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>Expense Tracker</Text>

      <ActivityIndicator size="large" color="#4F46E5" style={styles.spinner} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 20,
  },
  spinner: {
    marginTop: 10,
  },
});
