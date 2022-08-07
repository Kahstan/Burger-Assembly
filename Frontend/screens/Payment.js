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

const Payment = () => {
  const reactCtx = useContext(ReactContext);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text>Payment tab</Text>
    </SafeAreaView>
  );
};

export default Payment;
