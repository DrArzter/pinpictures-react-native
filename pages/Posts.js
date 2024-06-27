import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity, Image, Modal } from 'react-native';
import * as utils from '../utils';

const Comment = ({ comment }) => (
  <View key={comment.id} style={styles.commentContainer}>
    <Text style={styles.commentText}>{comment.comment}</Text>
    <Text style={styles.commentAuthor}>By: {comment.author}</Text>
  </View>
);

const Post = ({ post, commentValue, onCommentChange, onCommentSubmit }) => {
  const [isImageFullScreen, setIsImageFullScreen] = useState(false);
  const [fullScreenImageUrl, setFullScreenImageUrl] = useState("");

  const openFullScreenImage = (imageUrl) => {
    setFullScreenImageUrl(imageUrl);
    setIsImageFullScreen(true);
  };

  const closeFullScreenImage = () => {
    setIsImageFullScreen(false);
  };

  return (
    <View key={post.id} style={styles.postContainer}>
      <View style={styles.postContent}>
        {post.images && (
          <View style={styles.imagesContainer}>
            {post.images.map((image) => (
              <TouchableOpacity key={image.id} onPress={() => openFullScreenImage(`${utils.config.apiUrl.replace("/api", "")}/${image.picpath}`)}>
                <Image
                  source={{ uri: `${utils.config.apiUrl.replace("/api", "")}/${image.picpath}` }}
                  style={styles.postImage}
                />
              </TouchableOpacity>
            ))}
          </View>
        )}
        <View style={styles.postDetails}>
          <Text style={styles.postTitle}>{post.name}</Text>
          <Text style={styles.postDescription}>{post.description}</Text>
          <Text style={styles.postAuthor}>Posted by: {post.author}</Text>
          <ScrollView style={styles.commentsContainer}>
            {post.comments && post.comments.map((comment) => (
              <Comment key={comment.id} comment={comment} />
            ))}
          </ScrollView>
          <View style={styles.commentInputContainer}>
            <TextInput
              style={styles.commentInput}
              value={commentValue}
              onChangeText={onCommentChange}
              placeholder="Add a comment"
              placeholderTextColor="#aaa"
            />
            <Button title="Send" onPress={onCommentSubmit} />
          </View>
        </View>
      </View>
      <Modal visible={isImageFullScreen} transparent={true}>
        <View style={styles.fullScreenImageContainer}>
          <TouchableOpacity onPress={closeFullScreenImage} style={styles.fullScreenImageBackdrop}>
            <Image
              source={{ uri: fullScreenImageUrl }}
              style={styles.fullScreenImage}
            />
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [commentValues, setCommentValues] = useState({});

  useEffect(() => {
    async function fetchPosts() {
      const postsData = await utils.getPosts();
      setPosts(postsData);
    }
    fetchPosts();
  }, []);

  const handleCommentChange = (postId, value) => {
    setCommentValues((prevValues) => ({
      ...prevValues,
      [postId]: value,
    }));
  };

  const handleCommentSubmit = (postId) => {
    // Handle comment submit logic
    setCommentValues((prevValues) => ({
      ...prevValues,
      [postId]: "",
    }));
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.postsContainer}>
        {posts.map((post) => (
          <Post
            key={post.id}
            post={post}
            commentValue={commentValues[post.id] || ""}
            onCommentChange={(text) => handleCommentChange(post.id, text)}
            onCommentSubmit={() => handleCommentSubmit(post.id)}
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#27272a', // zinc-800
  },
  postsContainer: {
    padding: 10,
    backgroundColor: '#27272a', // zinc-800
  },
  postContainer: {
    backgroundColor: '#333',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  postContent: {
    flexDirection: 'column',
  },
  imagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  postImage: {
    width: 100,
    height: 100,
    margin: 5,
    borderRadius: 5,
  },
  postDetails: {
    flex: 1,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  postDescription: {
    fontSize: 14,
    color: '#ccc',
    marginBottom: 5,
  },
  postAuthor: {
    fontSize: 12,
    color: '#aaa',
    marginBottom: 10,
  },
  commentsContainer: {
    maxHeight: 100,
    marginBottom: 10,
  },
  commentContainer: {
    backgroundColor: '#444',
    padding: 5,
    marginBottom: 5,
    borderRadius: 5,
  },
  commentText: {
    fontSize: 12,
    color: '#ddd',
  },
  commentAuthor: {
    fontSize: 10,
    color: '#aaa',
  },
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentInput: {
    flex: 1,
    backgroundColor: '#555',
    padding: 5,
    borderRadius: 5,
    color: '#fff',
    marginRight: 10,
  },
  fullScreenImageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  fullScreenImageBackdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullScreenImage: {
    width: '90%',
    height: '90%',
    resizeMode: 'contain',
  },
});
