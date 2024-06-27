import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View, StyleSheet } from 'react-native';
import Posts from '../pages/Posts';
import Authentication from '../pages/Authentication';

const Stack = createStackNavigator();

const Main = ({ user, setUser }) => {
  return (
    <View style={styles.container}>
      <Stack.Navigator initialRouteName={user ? "Posts" : "Authentication"}>
        <Stack.Screen name="Posts" options={{ headerShown: false }}>
          {({ navigation }) => (
            <Posts
              user={user}
              setUser={setUser}
              navigation={navigation}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Authentication" options={{ headerShown: false }}>
          {({ navigation }) => (
            <Authentication setUser={setUser} navigation={navigation} />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#27272a', // zinc-800
  },
});

export default Main;
