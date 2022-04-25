import React from "react";
import { Text, View, Button, onPress, navigation, StyleSheet, TouchableOpacity, buttonClickedHandler, title } from "react-native";
import { Ionicons } from "@expo/vector-icons";


import HomeScreen from "./HomeScreen";
var x = 0;
var totalPrice = 1;


var correspondItemPrice = 10; // firebase output will be here


const Settings = () => {
 
    


return (

   

	<View style={styles.screen}>

<View>

<TouchableOpacity
        onPress={
            incrementQuantity

         
        }
        style={styles.roundButton1}>
        <Text>+</Text>
      </TouchableOpacity>

<Text style={{ color: "#006600", fontSize: 40 }}>{x}</Text> 



     

      <TouchableOpacity
        onPress={decrementQuantity}
        style={styles.roundButton1}>
        <Text>-</Text>
      </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
    <Text style={styles.appButtonText}>{"View cart : ₹"}{totalPrice}</Text>
  </TouchableOpacity>
    </View>
);
};


function incrementQuantity()
{
x=x+1;
totalPrice = totalPrice + correspondItemPrice;
this.setState({ count: this.state.count + 1 }, () => {
    this.result();
    this.forceUpdate();
  });
}
function decrementQuantity()
{
x=x+1;
}

function refreshPage(){ 
    window.location.reload(); 
  }

export default Settings;



const styles = StyleSheet.create({
    screen: {
      flex: 10,
      justifyContent: "center"
      
    },
    roundButton1: {
        fontSize: 10,
    fontSize: 90,
      width: 50,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 1,
      borderRadius: 100,
      backgroundColor: 'orange',
    },
    appButtonContainer: {
        backgroundColor: "#009688",
        borderRadius: 0,
        paddingVertical: 10,
        paddingHorizontal: 12,
        position: "absolute",
        bottom: 0,
        width: 375,
        height: 40,
        justifyContent: "center",
      },
      appButtonText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
      },
  });