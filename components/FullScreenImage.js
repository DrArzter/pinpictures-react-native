import React, { useState } from 'react';
import { Modal, View, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';

const FullScreenImage = ({ imageUrl, onClose }) => {
  const [loading, setLoading] = useState(true);

  return (
    <Modal visible={true} transparent={true} animationType="fade">
      <TouchableOpacity style={styles.overlay} onPress={onClose}>
        <View style={styles.container}>
          {loading && <ActivityIndicator size="large" color="#ffffff" />}
          <Image
            source={{ uri: imageUrl }}
            style={styles.image}
            resizeMode="contain"
            onLoadEnd={() => setLoading(false)}
            onError={(error) => console.log('Image load error:', error)}
          />
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default FullScreenImage;
