import React from "react";
import { SafeAreaView, StyleSheet, TextInput, Text, Button, TouchableOpacity, onPress, Image} from "react-native";


import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';






const Register = () => {
  const [text, onChangeText] = React.useState("");
  const [number, onChangeNumber] = React.useState(null);
  

  const [pincode, onChangePincode] = React.useState(null);
  
  const [address, onChangeAddress] = React.useState("");


  


  return (
    <SafeAreaView>




<Text style = {styles.text}> Create Account </Text>



<TextInput
        style={styles.input}
        onChangeText={onChangePincode}
        value={pincode}
        placeholder="Pincode" 
        
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
        placeholder="Name" 
      />

      <TextInput
        style={styles.input}
        onChangeText={onChangeAddress}
        value={address}
        placeholder="Full Address" 
      />


      <TextInput
        style={styles.input}
        onChangeText={onChangeNumber}
        value={number}
        placeholder="Phone Number" 
        
        keyboardType="numeric"
      />


<Button
  title="Already have an account? Login"
  onPress={() => navigation.push('Details')}
/>



<TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
    
    
    <Text style={styles.appButtonText}>{"Register "}</Text>
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