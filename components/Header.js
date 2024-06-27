import React from 'react';
import { View, Text, StyleSheet, Alert, Image } from 'react-native';
import Svg, { Path, G } from 'react-native-svg';
import SvgButton from './SvgButton';
import * as utils from '../utils';

const Header = ({ user, setUser }) => {
  const handleSvgButtonPress = () => {
    Alert.alert('SVG Button Pressed');
  };

  return (
    <View style={styles.headerContainer}>
      <View style={styles.logoContainer}>
        {user?.picpath ? (
          <Image
            source={{ uri: user.picpath.startsWith("https://ui-avatars.com/") ? user.picpath : utils.config.apiUrl.replace('/api', '/') + user.picpath }}
            style={styles.profileImage}
          />
        ) : (
          <Svg style={styles.logo} height="40" width="40" viewBox="0 0 1200 1200">
            <G>
              <Path d="m1089.6 248.4-420-230.4c-43.199-24-94.801-24-138 0l-420 230.4c-46.801 25.203-75.602 73.203-75.602 126v451.2c0 52.801 28.801 100.8 74.398 126l420 230.4c21.602 12 45.602 18 69.602 18s48-6 69.602-18l420-230.4c45.602-25.199 74.398-73.199 74.398-126v-451.2c0-52.797-28.801-100.8-74.398-126zm26.398 577.2c0 34.801-19.199 67.199-50.398 84l-420 230.4c-28.801 15.602-63.602 15.602-92.398 0l-420-230.4c-31.199-16.801-49.199-49.199-49.199-84l-0.003906-451.2c0-34.801 19.199-67.199 49.199-84l420-230.4c14.398-8.3984 30-12 46.801-12s31.199 3.6016 45.602 12l420 230.4c31.199 16.801 50.398 49.199 50.398 84z" />
              <Path d="m495.6 484.8h-60c-25.199 0-37.199 12-37.199 39.602v136.8c0 21.602 12 34.801 32.398 34.801 20.398 0 32.398-12 32.398-34.801v-33.602h33.602c50.398 0 90-15.602 90-72-1.1992-55.203-40.801-70.801-91.199-70.801zm3.5977 93.598h-36v-43.199h33.602c15.602 0 25.199 8.3984 25.199 21.602 0 14.398-12 21.598-22.801 21.598z" />
              <Path d="m720 484.8h-60c-25.199 0-37.199 12-37.199 39.602v136.8c0 21.602 12 34.801 32.398 34.801 20.398 0 32.398-12 32.398-34.801v-33.602h32.402c50.398 0 90-15.602 90-72 0-55.203-39.602-70.801-90-70.801zm3.6016 93.598h-36v-43.199h32.398c15.602 0 25.199 8.3984 25.199 21.602 0 14.398-10.801 21.598-21.598 21.598z" />
            </G>
          </Svg>
        )}
        <Text style={styles.logoText}>{user?.name}</Text>
      </View>
      <SvgButton onPress={handleSvgButtonPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#3f3f46', // zinc-700
    paddingBottom: 8,
    paddingHorizontal: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    tintColor: '#D4D4D8',
    color: '#D4D4D8',
    fill: '#D4D4D8',
  },
  logoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#D4D4D8',
    marginLeft: 8,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 10,
  },
});

export default Header;
