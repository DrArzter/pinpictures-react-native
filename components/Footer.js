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
    backgroundColor: '#27272a',
    paddingVertical: 16,
    alignItems: 'center',
  },
  footerText: {
    color: '#D4D4D8',
    textAlign: 'center',
  },
});

export default Footer;
