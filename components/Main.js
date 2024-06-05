import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import * as utils from '../utils';
import FullScreenImage from './FullScreenImage';

const Main = () => {
  const [posts, setPosts] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    utils.getPosts().then(fetchedPosts => setPosts(fetchedPosts));
  }, []);

  const openFullScreenImage = (imageUrl) => {
    console.log('Opening image:', imageUrl);
    setSelectedImage(imageUrl);
  };

  const closeFullScreenImage = () => {
    setSelectedImage(null);
  };

  return (
    <ScrollView style={styles.mainContainer}>
      {posts.map((post) => (
        <View key={post.id} style={styles.postContainer}>
          {post.images && (
            <View style={styles.imageContainer}>
              {post.images.map((image) => (
                <View style={styles.imageWrapper} key={image.id}>
                  <TouchableOpacity onPress={() => openFullScreenImage(`${utils.config.apiUrl.replace("/api", "")}/${image.picpath}`)}>
                    <Image
                      source={{ uri: `${utils.config.apiUrl.replace("/api", "")}/${image.picpath}` }}
                      style={styles.image}
                      resizeMode="cover"
                    />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
          <Text style={styles.postText}>{post.name}</Text>
        </View>
      ))}
      {selectedImage && <FullScreenImage imageUrl={selectedImage} onClose={closeFullScreenImage} />}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#3f3f46',
  },
  postContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#52525b',
  },
  postText: {
    color: '#e4e4e7',
    marginTop: 8,
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    marginBottom: 16,
  },
  imageWrapper: {
    flexGrow: 1,
    flexShrink: 0,
    minWidth: 150,
    padding: 4,
  },
  image: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
    borderRadius: 8,
  },
});

export default Main;
