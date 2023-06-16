import React from "react";
import {
  StyleSheet,
} from "react-native";
import {
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
import FetchData    from "./components/fetch.js";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// npm install @react-navigation/native 
// npm install @react-navigation/bottom-tabs
import { Ionicons } from "@expo/vector-icons";
import db from "./components/config.jsx";
// npm install @expo/vector-icons
import Add from "./components/add.js";

export default function App() {
  const tab=createBottomTabNavigator();

  return (
    
    <NavigationContainer>
        <tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === "login user") {
                iconName = "ios-log-in";
              } else if (route.name === "Manage Users") {
                iconName = "ios-people";
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: "tomato",
            tabBarInactiveTintColor: "gray",
          })}
        >
          <tab.Screen
            name="login user"
           component={Add}
            options={{ headerShown: false }}
          />
          <tab.Screen
            name="Manage Users"
           component={FetchData}
            options={{ headerShown: false }}
          />
        </tab.Navigator>
      </NavigationContainer>
  );
}
