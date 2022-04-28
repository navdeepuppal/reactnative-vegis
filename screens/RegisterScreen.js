import { useState, useEffect } from "react";
import React from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Button,
  onPress,
} from "react-native";
import Constants from "expo-constants";
import * as SQLite from "expo-sqlite";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { color } from "react-native-elements/dist/helpers";

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

export default function User() {
  const [text, setText] = useState(null);
  const [forceUpdate, forceUpdateId] = useForceUpdate();

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "create table if not exists profile (number integer primary key not null, name text, address text, pincode integer);"
      );
    });
  }, []);

  const add = (texxt, number, address, pincode) => {
    // is text empty?
    if (texxt === null || texxt === "" || number === null || number === "" || pincode === "" || address === "")  {
      return false;
    }

    db.transaction(
      (tx) => {
        tx.executeSql("insert into profile (number, name, address, pincode) values (?, ?, ?, ?)", [number], [texxt], [address], [pincode]);
        tx.executeSql("select * from profile;", [], (_, { rows }) =>
          console.log(JSON.stringify(rows))
        );
      },
      null,
      forceUpdate
    );
  };

  const [texxt, onChangeTexxt] = React.useState("");
  const [number, onChangeNumber] = React.useState(null);

  const [pincode, onChangePincode] = React.useState(null);

  const [address, onChangeAddress] = React.useState("");


  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Create Account</Text>

      {Platform.OS === "web" ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={styles.heading}>
            Expo SQlite is not supported on web!
          </Text>
        </View>
      ) : (
        <>
          <View style={styles.flexColumn}>
            <TextInput
              onChangeText={onChangeNumber}
              placeholder="Enter Your Phone Number"
              style={styles.input}
              value={number}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              onChangeText={onChangePincode}
              value={pincode}
              placeholder="Pincode"
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              onChangeText={onChangeTexxt}
              value={texxt}
              placeholder="Name"
            />
            <TextInput
              style={styles.input}
              onChangeText={onChangeAddress}
              value={address}
              placeholder="Full Address"
            />

            <TouchableOpacity
              onPress={() => {


                if (texxt === null || texxt === "" || number === null || number === "" || pincode === "" || address === "")  {
                  return false,
                  console.log('Sorry');
                }
                add(texxt);
                add(number);
                add(address);
                add(pincode);
                writeUserData(number, texxt, pincode, address);
              }}
              style={styles.appButtonContainer}
            >
              <Text style={styles.appButtonText}>{"Register "}</Text>
            </TouchableOpacity>
            <Text>
{"\n\n\n"}
</Text>
            <Button
  title="Already have an account? Login"
  onPress={() => navigation.push('Details')}
/>
          </View>
          <ScrollView style={styles.listArea}>
           
          </ScrollView>
        </>
      )}
    </View>
  );
}

function useForceUpdate() {
  const [value, setValue] = useState(0);
  return [() => setValue(value + 1), value];
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
  heading: {
    fontSize: 45,
    textAlign: "center",
  },
  flexColumn: {
    flexDirection: "column",
    alignContent: "space-between",
  },
  input: {
    borderColor: "silver",
    borderRadius: 9,
    borderWidth: 0.5,
    fontSize: 27,
    height: 48,
    margin: 16,
    padding: 10
  },
  listArea: {
    flex: 1,
    paddingTop: 16,
  },
  sectionContainer: {
    marginBottom: 16,
    marginHorizontal: 16,
  },
  sectionHeading: {
    fontSize: 15,
    marginBottom: 8,
  },
  appButtonContainer: {
    justifyContent: "space-evenly",
    borderColor: "#38CC77",
    borderRadius: 20,
    backgroundColor: "#27EB89",
    marginHorizontal: 70,
height: 60,

},
  appButtonText: {
    fontSize: 30,
    color: "white",
    alignSelf: "center",
  },
});
