import React from "react";
import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { createAppContainer } from "react-navigation";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";

import HomeScreen from "./screens/HomeScreen";
import UserScreen from "./screens/UserScreen";
import SettingScreen from "./screens/SettingScreen";
import FirebaseScreen from "./screens/FirebaseScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import RegisterScreen from "./screens/RegisterScreen";
import LoginScreen from "./screens/LoginScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ProfileSqliteScreen from "./screens/ProfileSqliteScreen";
import InventorySqliteScreen from "./screens/InventorySqliteScreen";

import OnboardingScreen from "./screens/OnboardingScreen";

import HomeUIScreen from "./screens/HomeUIScreen";
import CartScreen from "./screens/CartUIScreen";

import MyStack from "./MyStack";
//import FoodList from "./screens/FoodListScreen";

import * as SQLite from "expo-sqlite";

import Constants from "expo-constants";

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

const TabNavigator = createMaterialBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarLabel: "Home",
        tabBarIcon: (tabInfo) => (
          <Ionicons
            name="md-home"
            size={tabInfo.focused ? 26 : 20}
            color={tabInfo.tintColor}
          />
        ),
      },
    },

    HomeUIScreen: {
      screen: HomeUIScreen,
      navigationOptions: {
        tabBarLabel: "HomeUIScreen",
        tabBarIcon: (tabInfo) => (
          <Ionicons
            name="md-home"
            size={tabInfo.focused ? 26 : 20}
            color={tabInfo.tintColor}
          />
        ),
      },
    },

    PlaceOrder: {
      screen: PlaceOrderScreen,
      navigationOptions: {
        tabBarLabel: "PlaceOrder",
        tabBarIcon: (tabInfo) => (
          <Ionicons
            name="md-person-circle-outline"
            size={tabInfo.focused ? 26 : 20}
            color={tabInfo.tintColor}
          />
        ),
      },
    },
    User: {
      screen: UserScreen,
      navigationOptions: {
        tabBarLabel: "Sqllite",
        tabBarIcon: (tabInfo) => (
          <Ionicons
            name="md-person-circle-outline"
            size={tabInfo.focused ? 26 : 20}
            color={tabInfo.tintColor}
          />
        ),
      },
    },
    Setting: {
      screen: SettingScreen,
      navigationOptions: {
        tabBarLabel: "Setting",
        tabBarIcon: (tabInfo) => (
          <Ionicons
            name="md-settings-outline"
            size={tabInfo.focused ? 26 : 20}
            color={tabInfo.tintColor}
          />
        ),
      },
    },

    Register: {
      screen: RegisterScreen,
      navigationOptions: {
        tabBarLabel: "Register",
        tabBarIcon: (tabInfo) => (
          <Ionicons
            name="md-logo-firebase"
            size={tabInfo.focused ? 26 : 20}
            color={tabInfo.tintColor}
          />
        ),
      },
    },

    Login: {
      screen: LoginScreen,
      navigationOptions: {
        tabBarLabel: "Login",
        tabBarIcon: (tabInfo) => (
          <Ionicons
            name="md-logo-firebase"
            size={tabInfo.focused ? 26 : 20}
            color={tabInfo.tintColor}
          />
        ),
      },
    },

    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        tabBarLabel: "Profile",
        tabBarIcon: (tabInfo) => (
          <Ionicons
            name="md-person-circle-outline"
            size={tabInfo.focused ? 26 : 20}
            color={tabInfo.tintColor}
          />
        ),
      },
    },

    Firebase: {
      screen: FirebaseScreen,
      navigationOptions: {
        tabBarLabel: "Firebase",
        tabBarIcon: (tabInfo) => (
          <Ionicons
            name="md-logo-firebase"
            size={tabInfo.focused ? 26 : 20}
            color={tabInfo.tintColor}
          />
        ),
      },
    },

    InventorySqlite: {
      screen: InventorySqliteScreen,
      navigationOptions: {
        tabBarLabel: "InventorySqlite",
        tabBarIcon: (tabInfo) => (
          <Ionicons
            name="md-logo-firebase"
            size={tabInfo.focused ? 26 : 20}
            color={tabInfo.tintColor}
          />
        ),
      },
    },

    ProfileSqlite: {
      screen: ProfileSqliteScreen,
      navigationOptions: {
        tabBarLabel: "ProfileSqlite",
        tabBarIcon: (tabInfo) => (
          <Ionicons
            name="md-logo-firebase"
            size={tabInfo.focused ? 26 : 20}
            color={tabInfo.tintColor}
          />
        ),
      },
    },


    Onboarding: {
      screen: OnboardingScreen,
      navigationOptions: {
        tabBarLabel: "OnboardingScreen",
        tabBarIcon: (tabInfo) => (
          <Ionicons
            name="md-logo-firebase"
            size={tabInfo.focused ? 26 : 20}
            color={tabInfo.tintColor}
          />
        ),
      },
    },

    Cart: {
      screen: CartScreen,
      navigationOptions: {
        tabBarLabel: "CartUIScreen",
        tabBarIcon: (tabInfo) => (
          <Ionicons
            name="md-logo-firebase"
            size={tabInfo.focused ? 26 : 20}
            color={tabInfo.tintColor}
          />
        ),
      },
    },

 

  },
  {
    initialRouteName: "Home",
    barStyle: { backgroundColor: "white" },
  }
);

const Navigator = createAppContainer(TabNavigator);

export default function User() {
  const [text, setText] = useState(null);
  const [forceUpdate, forceUpdateId] = useForceUpdate();

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "create table if not exists fruits (name text primary key not null, cutprice integer, price integer, units text, comment text,  image text);"
      );
      tx.executeSql(
        "create table if not exists vegetables (name text primary key not null, cutprice integer, price integer, units text, comment text, image text);"
      );
      console.log("Both table Created");
    });
  }, []);

  return (
    <Navigator>
      <HomeScreen />
    </Navigator>
  );
  /*return (
              <MyStack />
              );*/
}

function useForceUpdate() {
  const [value, setValue] = useState(0);
  return [() => setValue(value + 1), value];
}
