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
        `select * from items where done = ?;`,
        [doneHeading ? 1 : 0],
        (_, { rows: { _array } }) => setItems(_array)
      );
    });
  }, []);

  const heading = doneHeading ? "Completed" : "Todo";

  if (items === null || items.length === 0) {
    return null;
  }

  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionHeading}>{heading}</Text>
      {items.map(({ id, done, value }) => (
        <TouchableOpacity
          key={id}
          onPress={() => onPressItem && onPressItem(id)}
          style={{
            backgroundColor: done ? "#1c9963" : "#fff",
            borderColor: "#000",
            borderWidth: 1,
            padding: 8,
          }}
        >
          <Text style={{ color: done ? "#fff" : "#000" }}>{value}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

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

function writeUserData(number, texxt, pincode, address) {
  console.log("yaahan3");

  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
  set(ref(db_f, "Orders/" +  date + number), {
    name: texxt,
    phno: number,
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
        "create table if not exists items (id integer primary key not null, done int, value text, cart text);"
      );
    });
  }, []);

  const add = (text) => {
    // is text empty?
    if (text === null || text === "") {
      return false;
    }

    db.transaction(
      (tx) => {
        tx.executeSql("insert into items (done, cart) values (0, ?)", [text]);
        tx.executeSql("select * from items", [], (_, { rows }) =>
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
          </View>
          <ScrollView style={styles.listArea}>
            <Items
              key={`forceupdate-todo-${forceUpdateId}`}
              done={false}
              onPressItem={(id) =>
                db.transaction(
                  (tx) => {
                    tx.executeSql(`update items set done = 1 where id = ?;`, [
                      id,
                    ]);
                  },
                  null,
                  forceUpdate
                )
              }
            />
            <Items
              done
              key={`forceupdate-done-${forceUpdateId}`}
              onPressItem={(id) =>
                db.transaction(
                  (tx) => {
                    tx.executeSql(`delete from items where id = ?;`, [id]);
                  },
                  null,
                  forceUpdate
                )
              }
            />
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
    backgroundColor: "#fff",
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  flexColumn: {
    flexDirection: "column",
    alignContent: "space-between",
  },
  input: {
    borderColor: "#4630eb",
    borderRadius: 4,
    borderWidth: 1,
    flex: 1,
    height: 48,
    margin: 16,
    padding: 8,
  },
  listArea: {
    backgroundColor: "#f0f0f0",
    flex: 1,
    paddingTop: 16,
  },
  sectionContainer: {
    marginBottom: 16,
    marginHorizontal: 16,
  },
  sectionHeading: {
    fontSize: 18,
    marginBottom: 8,
  },
  appButtonContainer: {
    justifyContent: "space-evenly",
    borderColor: "green",
    borderRadius: 20,
    backgroundColor: "green",
    marginHorizontal: 50,
  },
  appButtonText: {
    fontSize: 20,
    alignSelf: "center",
  },
});
