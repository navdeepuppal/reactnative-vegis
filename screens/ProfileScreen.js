import React from "react";
import { Text, View, Button, onPress, navigation, StyleSheet, TouchableOpacity, buttonClickedHandler, title } from "react-native";
import { Ionicons } from "@expo/vector-icons";


import HomeScreen from "./HomeScreen";
var x = 0;
var totalPrice = 1;


var correspondItemPrice = 10; // firebase output will be here

const Profile = ({ navigation }) => {
  
  return (
    
    
    
    <View style={styles.screen}>
    




    
    <View>
    

    

    <TouchableOpacity
    style={styles.roundButton1}>
    <Text>Contact Us</Text>
    </TouchableOpacity>    
    
    <TouchableOpacity
    style={styles.roundButton1}>
    <Text>Addresses</Text>
    </TouchableOpacity>    
    
    
    <TouchableOpacity
    style={styles.roundButton1}>
    <Text>Vegis Money</Text>
    </TouchableOpacity>
    </View>
    </View>
    );
  };
  
  

  
  export default Profile;
  
  
  
  const styles = StyleSheet.create({
    screen: {
      flex: 1,
      justifyContent: "center"
      
    },
    roundButton1: {
      width: 300,
      height: 60,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 1,
      borderRadius: 7,
      backgroundColor: 'white',
      fontSize: 40,
      margin: 20
    },
    
    text: {
      fontSize: 40,
      textAlign: "center",
  
      
    },
  
  });