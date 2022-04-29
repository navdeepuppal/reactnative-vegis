import React from "react";
import {
  Text,
  StyleSheet,
} from "react-native";

const Cart = ({ navigation, route }) => {
  return <Text> Hi {route.params.name}</Text>;
};

export default Cart;

const styles = StyleSheet.create({
  screen: {
    flex: 10,
    justifyContent: "center",
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
    textTransform: "uppercase",
  },
});
