import { useState, useEffect } from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  onPress,
} from "react-native";
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

export default function User() {
  const [text, setText] = useState(null);
  const [forceUpdate, forceUpdateId] = useForceUpdate();

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "create table if not exists cart (name text primary key not null, price integer, quantity integer, units text);"
      );
      console.log("Cart table Created");
    });
  }, []);

  const add = (name, price, units) => {
    // is text empty?
    if (name === null || name === "") {
      return false;
    }
    var ifExists = false;
    db.transaction(
      (tx) => {
        tx.executeSql(
          "select * from cart where name = ?",
          [name],
          (_, { rows }) => {
            ifExists = JSON.stringify(rows).includes('"name":"' + name + '"');
            if (ifExists) {
              console.log("Increased");
              tx.executeSql(
                "update cart set quantity = quantity+1 where name = ?",
                [name]
              );
            } else {
              console.log("Inserted");
              tx.executeSql(
                "insert into cart (name, price, quantity, units) values (?, ?, ?, ?)",
                [name, price, 1, units]
              );
            }
            tx.executeSql("select * from cart", [], (_, { rows }) =>
              console.log(JSON.stringify(rows))
            );
          }
        );
      },
      null,
      forceUpdate
    );
  };

  const reduce = (name) => {
    // is text empty?
    if (name === null || name === "") {
      return false;
    }
    var quantity = 0;
    db.transaction(
      (tx) => {
        tx.executeSql(
          "select quantity from cart where name = ?",
          [name],
          (_, { rows }) => {
            var str = JSON.stringify(rows);
            quantity = parseInt(
              str.slice(str.indexOf('"quantity":') + 11, str.indexOf("}]"))
            );
            if (quantity > 1) {
              console.log("Decreased");
              tx.executeSql(
                "update cart set quantity = quantity-1 where name = ?",
                [name]
              );
            } else {
              console.log("Deleted");
              tx.executeSql("delete from cart where name = ?", [name]);
            }
            tx.executeSql("select * from cart", [], (_, { rows }) =>
              console.log(JSON.stringify(rows))
            );
          }
        );
      },
      null,
      forceUpdate
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>SQLite Example</Text>

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
          <View style={styles.flexRow}>
            <TouchableOpacity
              onPress={() => add("Onion", 30, "kg") && setText(null)}
              style={styles.roundButton1}
            >
              <Text>+</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => reduce("Onion") && setText(null)}
              style={styles.roundButton1}
            >
              <Text>-</Text>
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.listArea}>
            <Items
              key={`forceupdate-todo-${forceUpdateId}`}
              done={false}
              onPressItem={() => {}}
            />
            <Items
              done
              key={`forceupdate-done-${forceUpdateId}`}
              onPressItem={() => {}}
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
  roundButton1: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    padding: 1,
    borderRadius: 0,
    backgroundColor: "white",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  flexRow: {
    flexDirection: "row",
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
});
