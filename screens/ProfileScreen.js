import React from "react";
import {
  Text,
  View,
  Button,
  onPress,
  navigation,
  StyleSheet,
  TouchableOpacity,
  buttonClickedHandler,
  Alert,
  title,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState, useEffect } from "react";

import HomeScreen from "./HomeScreen";

import Constants from "expo-constants";
import * as SQLite from "expo-sqlite";

function openDatabase() {
  if (Platform.OS === "web") {
    return {
      transaction: () => {
        return {
          executeSql: () => {},
        };
      },
    };
  }

  const db = SQLite.openDatabase("db.db");
  return db;
}

const db = openDatabase();

function Items({ done: doneHeading, onPressItem }) {
  const [items, setItems] = useState(null);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        `select * from cart where done = ?;`,
        [doneHeading ? 1 : 0],
        (_, { rows: { _array } }) => setItems(_array)
      );
    });
  }, []);
}

var x = 0;
var totalPrice = 1;

var correspondItemPrice = 10; // firebase output will be here

const Profile = ({ navigation }) => {




  showAlert=()=>{
    alert('One button alert dialog');
    
  }
  
  alertDialogTwoButtons=()=>{
    Alert.alert(
      'Hello, User',
      'Alert with two buttons',
      [
        {text: 'Yes', onPress: () => console.log('Yes clicked')},
        {text: 'No', onPress: () => console.log('No clicked'), style: 'cancel'},
      ],
      { 
        cancelable: true 
      }
    );
  }
  
  alertDialogThreeButtons=()=>{
    Alert.alert(
      'Hello, User', 'Alert dialog in react native example',
      [
        {text: 'Ask me later', onPress: () => console.log('Ask me later clicked')},
        {text: 'Yes', onPress: () => console.log('Yes clicked')},
        {text: 'OK', onPress: () => console.log('OK clicked')},
      ],
      { 
        cancelable: false 
      }
    );
  }
  

  const [forceUpdate, forceUpdateId] = useForceUpdate();

  const reduce = () => {
    db.transaction(
      (tx) => {
        tx.executeSql("drop table cart;");
        console.log("Cart Table Deleted ! ");
      },
      null,
      forceUpdate
    );
  };

  return (
    <View style={styles.screen}>
      <View>
        <TouchableOpacity style={styles.roundButton1}>
          <Text>Contact Us</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.roundButton1}>
          <Text>Addresses</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.roundButton1}>
          <Text>Vegis Money</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {reduce(),
        alert('Logged Out');
        }
        } style={styles.roundButton1}>
          <Text>Logout</Text>
        </TouchableOpacity>

        <Button title="Demo 2" onPress={this.alertDialogTwoButtons} />

        <Button title="Demo 3" onPress={this.alertDialogThreeButtons} />
      </View>
    </View>
  );
};

function useForceUpdate() {
  const [value, setValue] = useState(0);
  return [() => setValue(value + 1), value];
}

export default Profile;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  screen: {
    flex: 1,
    justifyContent: "center",
  },
  roundButton1: {
    width: 300,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    padding: 1,
    borderRadius: 7,
    backgroundColor: "white",
    fontSize: 40,
    margin: 20,
  },

  text: {
    fontSize: 40,
    textAlign: "center",
  },
});
