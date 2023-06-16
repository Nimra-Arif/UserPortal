import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Button,
  Image,
  KeyboardAvoidingView,
  FlatList,
  ScrollView,
  Alert,
  Platform,
  ImageBackground,
} from "react-native";
import { useState } from "react";
import { collection, addDoc, setDoc,doc } from "firebase/firestore";
import { db } from "./config.jsx";

function Add() {
  const [email, onchangeemail] = useState('');
  const [username, onchangeusername] = useState('');
  const [password, onchangepassword] = useState('');


  function create() {
    console.log("create pressed");
    addDoc(collection(db, "user"), {
      username: username,
      email: email,
      password: password,
    })
      .then(() => {
        console.log("Document successfully written!");
        onchangeemail("");
        onchangeusername("");
        onchangepassword("");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  }

 
  return (
    <ImageBackground
      style={{ flex: 1, resizeMode: "contain" }}
      source={require("../assets/1.jpeg")}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : { height: 100 }}
      >
        <ScrollView style={styles.container} keyboardDismissMode="on-drag">
          <View>
            <Text style={styles.text_style}>User Registration</Text>
            <Text style={styles.text_style2}>Add users</Text>
          </View>

          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
              paddingBottom: 140,
            }}
          >
            <TextInput
              value={username}
              placeholder="Username"
              onChangeText={(username) => {
                onchangeusername(username);
              }}
              style={styles.input_style}
              placeholderTextColor="grey"
              clearButtonMode="always"
            ></TextInput>

            <TextInput
              value={email}
              placeholder="Email Address"
              onChangeText={(email) => {
                onchangeemail(email);
              }}
              style={styles.input_style}
              placeholderTextColor="grey"
              clearButtonMode="always"
            ></TextInput>
            <TextInput
              value={password}
              placeholder="Password"
              secureTextEntry={true}
              onChangeText={(password) => {
                onchangepassword(password);
              }}
              style={styles.input_style}
              placeholderTextColor="grey"
              clearButtonMode="always"
            ></TextInput>

            <Pressable
              style={styles.button_style}
              onPress={create}
            >
              <Text style={styles.Button_text}>Login</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
  },
  container1: {
    justifyContent: "center",
    alignItems: "center",
  },
  text_style: {
    color: "black",
    fontSize: 30,
    alignSelf: "center",
    fontWeight: "bold",
    fontStyle: "italic",
  },
  text_style2: {
    color: "black",
    fontSize: 25,
    alignSelf: "center",
    fontStyle: "italic",
    paddingTop: 25,
    fontWeight: "bold",
    paddingBottom: 70,
  },
  text_style3: {
    color: "black",
    fontSize: 25,
    alignSelf: "center",
    fontStyle: "italic",
    paddingTop: 50,
    fontWeight: "bold",
    paddingBottom: 30,
  },
  input_style: {
    height: 40,
    width: 300,
    margin: 12,
    borderWidth: 2,
    padding: 10,
    fontSize: 16,
    borderColor: "black",
    borderRadius: 10,
    backgroundColor: "white",
    paddingBottom: 10,
  },
  button_style: {
    height: 40,
    width: 300,
    margin: 12,
    borderWidth: 2,
    fontSize: 16,
    borderColor: "black",
    borderRadius: 10,
    backgroundColor: "transparent",
    paddingBottom: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  Button_text: {
    color: "black",
    fontSize: 10,
    fontSize: 20,
    fontStyle: "italic",
    textAlign: "center",
    fontWeight: "bold",
    justifyContent: "center",
  },
});

export default Add;