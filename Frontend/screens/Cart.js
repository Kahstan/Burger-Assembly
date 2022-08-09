import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  StatusBar,
  FlatList,
} from "react-native";
import ReactContext from "../context/react-context";

const Cart = () => {
  const reactCtx = useContext(ReactContext);

  return (
    <SafeAreaView style={{ flexDirection: "row" }}>
      <Text></Text>
      <Text>Cart tab</Text>
    </SafeAreaView>
  );
};

export default Cart;
