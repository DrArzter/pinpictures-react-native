import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Footer = () => {
  return (
    <View style={styles.footerContainer}>
      <Text style={styles.footerText}>© My App Footer</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    backgroundColor: '#3f3f46', // zinc-700
    padding: 10,
    alignItems: 'center',
  },
  footerText: {
    color: '#D4D4D8',
  },
});

export default Footer;
