import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  Button,
  FlatList,
} from "react-native";
import ReactContext from "../context/react-context";

const Cart = () => {
  const reactCtx = useContext(ReactContext);

  const Item = ({ title, price, ingredient, image, _id }) => (
    <View>
      <Image>{image}</Image>
      <Text>{title}</Text>
      <Text>{price}</Text>
      <Text>{ingredient}</Text>
      <Text>{_id}</Text>
    </View>
  );

  const renderItem = ({ item }) => (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        alignContent: "stretch",
      }}
    >
      <View style={{ backgroundColor: "blue", border: 3 }}>
        <Image source={item?.image} style={{ width: 50, height: 50 }} />
        <Item title={item.title} />
        <Item title={item.price} />
        <Item title={item.ingredient} />
        <Item title={item._id} />
      </View>
    </View>
  );
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <View style={{ zIndex: 0 }}>
          <FlatList
            data={reactCtx.listing}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
          />
        </View>

        <View
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            zIndex: -1,
          }}
        >
          <View style={{ backgroundColor: "white" }} />
          <View style={{ flex: 1, backgroundColor: "white" }} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Cart;
