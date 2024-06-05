import React from 'react';
import { StatusBar, SafeAreaView, View, StyleSheet, Platform } from 'react-native';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.innerContainer}>
        <Header />
        <Main />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#27272a',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  innerContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
});

export default App;
