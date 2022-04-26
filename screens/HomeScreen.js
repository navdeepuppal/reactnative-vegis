import React from "react";
import { Text, View, Button, onPressLearnMore, navigation, TouchableOpacity, onPress, StyleSheet, Image} from "react-native";
import { Ionicons } from "@expo/vector-icons";
var totalPrice =1;

const Home = () => {
return (
	<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
	
    <Ionicons name="md-flower-outline" size={80} color="#006600" />


    



<TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
    
    
    <Image source={require("../assets/favicon.png")}/>
    <Text style={styles.appButtonText}>{"Vegetables"}</Text>
  </TouchableOpacity>

  <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
    
    <Image source={require("../assets/favicon.png")}/>
    <Text style={styles.appButtonText}>{"Fruits"}</Text>
  </TouchableOpacity>

  <TouchableOpacity onPress={onPress} style={styles.appButtonContainer1}>
    <Text style={styles.appButtonText}>{"View cart : ₹"}{totalPrice}</Text>
  </TouchableOpacity>

	</View>



);
};

export default Home;


const styles = StyleSheet.create({
    screen: {
      flex: 10,
      justifyContent: "center"
      
    },

appButtonContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 12,
    bottom: 0,
    width: 120,
    height: 150,
    justifyContent: "center",
  },

  appButtonContainer1: {
    backgroundColor: "green",
   
    borderRadius: 0,
    paddingVertical: 10,
    paddingHorizontal: 12,
    position: "absolute",
    bottom: 0,
    width: 375,
    height: 50,
    justifyContent: "center",
  }


});