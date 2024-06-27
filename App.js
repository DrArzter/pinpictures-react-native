import React, { useEffect, useState } from 'react';
import { StatusBar, SafeAreaView, View, StyleSheet, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import * as utils from './utils';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(utils.getUser());
  }, []);

  return (
    <NavigationContainer>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" />
        <View style={styles.container}>
          <Header user={user} setUser={setUser} />
          <Main user={user} setUser={setUser} />
        </View>
      </SafeAreaView>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#27272a', // zinc-800
  },
  container: {
    flex: 1,
    backgroundColor: '#27272a', // zinc-800
  },
});

export default App;
