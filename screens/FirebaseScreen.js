import React, { Component } from "react";
import { Text, SafeAreaView, TouchableOpacity, StyleSheet } from "react-native";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue } from "firebase/database";

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
const db = getDatabase(app);

const Ref = ref(db, "Hello/name");
var p;
class Firebase extends React.Component {
  writeUserData(name) {
    set(ref(db, "Hello/"), {
      name: name,
    });
    this.setState({
      p: name,
    });
  }

  render() {
    onValue(Ref, (snapshot) => {
      p = snapshot.val();
    });
    return (
      <SafeAreaView>
        <Text> Firebase ! {p}</Text>
        <TouchableOpacity
          onPress={() => this.writeUserData(501)}
          style={styles.appButtonContainer}
        >
          <Text>Chalo Sahi se</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

//var Firebase = ({ navigation }) => {};

export default Firebase;

const styles = StyleSheet.create({
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
});
