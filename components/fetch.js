import React from "react";

import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Pressable,
  Alert,
  Button,
  Image,
  KeyboardAvoidingView,
  FlatList,
  ScrollView,
  prompt,
  Platform,
  ImageBackground,
  Modal,
} from "react-native";
import { useState, useEffect } from "react";
import { collection, doc, setDoc, addDoc, updateDoc } from "firebase/firestore";
import { db } from "./config.jsx";
import { query, where, getDocs, deleteDoc } from "firebase/firestore";

function FetchData() {
  fetch();
  const [users, setUsers] = useState([]);
  const [showData, setshowData] = useState(false);
  const [selectedUser, setselectedUser] = useState("");
  const [editdialog, seteditdialog] = useState(false);  
  const [editusername, onchangeeditusername] = React.useState("");
  const [editemail, onchangeeditemail] = React.useState("");

  async function fetch() {
    const q = query(collection(db, "user"));

    const querySnapshot = await getDocs(q);

    const usersData = [];
    querySnapshot.forEach((doc) => {
  
      usersData.push(doc.data());
    });

    setUsers(usersData);
  }
  async function deleteuser(username) {
    console.log(username);
    delete1 = username.toString();
    console.log(delete1);
    const q = query(collection(db, "user"), where("username", "==", username));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      deleteDoc(doc.ref);
      console.log("deleted");
    });
  }
    async function updateuser() {
        console.log("update pressed");
        console.log(selectedUser.item.username);
        console.log(selectedUser);
        const q = query(collection(db, "user"), where("username", "==", selectedUser.item.username));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            updateDoc(doc.ref, {
                username: editusername,
                email: editemail,
            });
            fetch();
        
            seteditdialog(false);
            console.log("updated");
           
            
        });
    }

  async function edituser(item) {
    console.log("edit pressed");
    seteditdialog(true);
    console.log(item);
   setselectedUser(item);
    console.log(selectedUser);
    onchangeeditusername(item.item.username);
    onchangeeditemail(item.item.email);

  }
  return (
    <ImageBackground  
    style={{ flex: 1, resizeMode: 'contain' }}
    source={require("../assets/1.jpeg")}>
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <Pressable
          style={styles.button_style}
          onPress={() => {
            setshowData(!showData), fetch();
          }}
        >
          <Text style={styles.Button_text}>
            {showData ? "Hide Users" : "Show Users"}
          </Text>
        </Pressable>
      </View>

     {editdialog && (
 <View style={styles.container3}>
    <Text style={styles.text_style}>Edit User Dialog</Text>
 <TextInput
   value={editusername}
   placeholder={editusername}
   onChangeText={(editusername) => {
     onchangeeditusername(editusername);
   }}
   style={styles.input_style}
   placeholderTextColor="grey"
   clearButtonMode="always"
 ></TextInput>
 <TextInput
   value={editemail}
   placeholder={editemail}
   onChangeText={(editemail) => {
     onchangeeditemail(editemail);
   }}
   style={styles.input_style}
   placeholderTextColor="grey"
   clearButtonMode="always"
 ></TextInput>
 <Pressable
   style={styles.button_style1}
   onPress={() => {
    
      updateuser();
   }}
 >
   <Text>Update</Text>
 </Pressable>
</View>
     )}

      {showData && (
        <FlatList
          data={users}
          indicatorStyle="black"
          renderItem={({ item }) => (
            <View style={styles.container1}>
              <View style={{paddingRight:20}}>
                <Text style={styles.text_style3}>{item.username}</Text>
                <Text style={styles.text_style3}>{item.email}</Text>
              </View>
              <Pressable
                style={styles.button_style1}
                onPress={() => edituser({ item })}
              >
                <Text>Edit</Text>
              </Pressable>
              <Pressable
                style={styles.button_style1}
                onPress={() => deleteuser(item.username)}
              >
                <Text>Delete</Text>
              </Pressable>
            </View>
          )}
        />
      )}
    </View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingTop: 80,
  },
  container3: {
    paddingTop: 35,
    borderColor: "black",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    marginTop: 20,
    borderRadius: 10,


  },
  container1: {
    paddingTop: 10,
    paddingLeft: 25,
    paddingRight: 10,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    borderColor: "black",
    borderWidth: 2,
    alignItems: "center",
  },
  container2: {
    paddingTop: 10,
    paddingLeft: 25,
    paddingRight: 25,
    marginBottom: 10,
    flexDirection: "row",
    borderColor: "black",
    borderWidth: 1,
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
    fontSize: 12,
    alignSelf: "center",
    fontStyle: "italic",
    fontWeight: "bold",
  },
  input_style: {
    height: 40,
    width: 250,
    margin: 12,
    borderWidth: 1,
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
    alignItems: "center",
    justifyContent: "center",

    marginLeft: 30,
  },
  button_style1: {
    height: 35,
    width: 75,
    margin: 12,
    borderWidth: 1,
    fontSize: 16,
    borderColor: "white",
    borderRadius: 10,
    backgroundColor: "transparent",
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
export default FetchData;
