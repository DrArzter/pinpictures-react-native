import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import * as utils from "../utils";

export default function Authentication({ setUser, navigation }) {
  const [registration, setRegistration] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit() {
    try {
      let userData;
      if (registration) {
        userData = await utils.registration(username, email, password);
        setRegistration(false);
      } else if (forgotPassword) {
        // await utils.forgotPassword(email); // TODO: Add forgot password functionality
        setForgotPassword(false);
      } else {
        userData = await utils.login(username, password);
      }
      if (!forgotPassword) {
        setUser(userData);
        navigation.navigate('Posts'); // Переход на страницу Posts
      }
    } catch (error) {
      console.error("Error during authentication:", error);
    }
  }

  function toggleRegistration() {
    setRegistration(!registration);
    setForgotPassword(false);
    setUsername("");
    setEmail("");
    setPassword("");
  }

  function toggleForgotPassword() {
    setForgotPassword(!forgotPassword);
    setRegistration(false);
    setUsername("");
    setEmail("");
    setPassword("");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {forgotPassword ? "Forgot Password" : registration ? "Sign Up" : "Sign In"}
      </Text>
      {!forgotPassword && (
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
          />
        </View>
      )}
      {(registration || forgotPassword) && (
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
      )}
      {!forgotPassword && (
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>
      )}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>
            {forgotPassword ? "Send Reset Link" : registration ? "Sign Up" : "Sign In"}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.toggleContainer}>
        {forgotPassword ? (
          <TouchableOpacity onPress={toggleForgotPassword}>
            <Text style={styles.toggleText}>Back to Sign In</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={toggleRegistration}>
            <Text style={styles.toggleText}>
              {registration
                ? "Already have an account? Sign In"
                : "Don't have an account? Sign Up"}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      {!registration && !forgotPassword && (
        <View style={styles.toggleContainer}>
          <TouchableOpacity onPress={toggleForgotPassword}>
            <Text style={styles.toggleText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3f3f46',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputWrapper: {
    marginBottom: 10,
    width: '100%',
  },
  label: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
  },
  buttonContainer: {
    marginBottom: 20,
    width: '100%',
  },
  button: {
    backgroundColor: '#52525b',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  toggleContainer: {
    alignItems: 'center',
  },
  toggleText: {
    color: '#fff',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});
