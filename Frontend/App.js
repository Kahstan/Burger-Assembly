import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import SafeAreaView from "react-native-safe-area-view";

//react state
import React, { useState } from "react";
import ReactContext from "./context/react-context";

//Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Home from "./screens/home";
import Cart from "./screens/Cart";
import Payment from "./screens/Payment";

const Tab = createMaterialBottomTabNavigator();
const Stack = createNativeStackNavigator();

const App = () => {
  const [listing, setListing] = useState("");
  const [refreshState, setRefreshState] = useState(false);
  const [userCart, setUserCart] = useState();

  //Search bar
  const [searchListingInput, setSearchListingInput] = useState("");

  // adds the item to cart and increase the count by 1

  return (
    <ReactContext.Provider
      value={{
        listing,
        setListing,
        refreshState,
        setRefreshState,
        userCart,
        setUserCart,
        searchListingInput,
        setSearchListingInput,
      }}
    >
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Feed"
          activeColor="#e9e8ff"
          labelStyle={{ fontSize: 12 }}
          style={{ backgroundColor: "#f2590c" }}
        >
          <Tab.Screen
            name="Home"
            component={Home}
            options={{
              tabBarLabel: "Home",
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="home" color={color} size={26} />
              ),
            }}
          />
          <Tab.Screen
            name="Cart"
            component={Cart}
            options={{
              tabBarLabel: "Cart",
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="cart" color={color} size={26} />
              ),
            }}
          />
          <Tab.Screen
            name="Payment"
            component={Payment}
            options={{
              tabBarLabel: "Payment",
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons
                  name="contactless-payment"
                  color={color}
                  size={26}
                />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </ReactContext.Provider>
  );
};

export default App;
