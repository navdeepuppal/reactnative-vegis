import React from "react";
import { SafeAreaView, StyleSheet, TextInput, Text, Button, TouchableOpacity, onPress, Image} from "react-native";


import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue } from "firebase/database";





const Register = () => {
  const [text, onChangeText] = React.useState("");
  const [number, onChangeNumber] = React.useState(null);
  

  const [pincode, onChangePincode] = React.useState(null);
  
  const [address, onChangeAddress] = React.useState("");


  

  const firebaseConfig = {
    apiKey: "AIzaSyD5URkTEN93VGrNZCe1MtQbVszA1VcBP5I",
    authDomain: "reactnativevegis-f8fb3.firebaseapp.com",
    databaseURL: "https://reactnativevegis-f8fb3-default-rtdb.firebaseio.com",
    projectId: "reactnativevegis-f8fb3",
    storageBucket: "reactnativevegis-f8fb3.appspot.com",
    messagingSenderId: "733536075017",
    appId: "1:733536075017:web:505a1fcf90fab668eea7d8",
    measurementId: "G-S7FKN1M03Y",
  };
  
  
  const app = initializeApp(firebaseConfig);
  const db_f = getDatabase(app);
  
  function writeUserData(number, texxt,  address,pincode) {
    console.log("yaahan3");
    set(ref(db_f, "RegisterDetails/" + number), {
     
      phno: number,
      name: texxt,
      address: address,
      pincode: pincode,
    });
  }

  return (
    <SafeAreaView>




<Text style = {styles.text}> Login </Text>





      <TextInput
        style={styles.input}
        onChangeText={onChangeNumber}
        value={number}
        placeholder="Phone Number" 
        
        keyboardType="numeric"
      />






<TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
    
    
    <Text style={styles.appButtonText}>{"Login "}</Text>
    </TouchableOpacity>
    </SafeAreaView>
  );
};




const styles = StyleSheet.create({
  input: {
    width: 320,
    height: 50,
    margin: 12,
    borderWidth: 1,
    borderColor: "silver",
    borderRadius: 10,
    padding: 10,
    alignItems: "center"
  },
  text: {
    fontSize: 40,
    textAlign: "center",

    
  },

  appButtonContainer: {

    backgroundColor: "#1e90ff",
    borderRadius: 25,
    fontSize: 40,
    fontWeight: "bold",
    height: 50,
    width: 210,
    margin: 80
  },

  appButtonText:{
    fontSize: 30,
    textAlign: "center",
    color: "white"
  }
});

export default Register;