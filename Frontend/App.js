import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import SafeAreaView from "react-native-safe-area-view";

//react state
import React, { useState } from "react";
import ReactContext from "./context/react-context";

//Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "./screens/home";
import Details from "./screens/Details";

const Stack = createNativeStackNavigator();

const App = () => {
  const [listing, setListing] = useState("");
  const [refreshState, setRefreshState] = useState(false);

  return (
    <ReactContext.Provider
      value={{ listing, setListing, refreshState, setRefreshState }}
    >
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName="Home"
        >
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Details" component={Details} />
        </Stack.Navigator>
      </NavigationContainer>
    </ReactContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    border: 1,
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
