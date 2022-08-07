import { Text, View, StyleSheet, Image, Button } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { FocusedStatusBar, HomeHeader } from "../components";
import React, { useState, useEffect, useContext } from "react";
import ReactContext from "../context/react-context";

const randomNum = Math.random();

const Home = () => {
  const reactCtx = useContext(ReactContext);

  const fetchListings = async (url) => {
    const options = {
      method: "GET",
    };

    try {
      const res = await fetch(url, options);
      if (res.status !== 200) {
        throw new Error("Something went wrong.");
      }

      const data = await res.json();
      console.log(data);
      reactCtx.setListing(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchListings("http://localhost:5001/listings/displayAll");
    // eslint-disable-next-line
  }, [reactCtx.setListing]);

  const handleSearch = (value) => {
    if (value.length === 0) {
      reactCtx.setListing(reactCtx.listing);
    }

    const filteredData = reactCtx.listing.filter((item) =>
      item.title.toLowerCase().includes(value.toLowerCase())
    );

    if (filteredData.length === 0) {
      reactCtx.setListing(reactCtx.listing);
    } else {
      reactCtx.setListing(filteredData);
    }
  };

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
      <View style={{ backgroundColor: "gray", border: 3 }}>
        <Image source={item?.image} style={{ width: 80, height: 80 }} />
        <Item title={item.title} />
        <Item title={item.price} />
        <Item title={item.ingredient} />
        <Button
          id={item._id}
          title="Add to cart"
          onPress={reactCtx.addToCart}
        />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FocusedStatusBar backgroundColor="#ffffff" />
      <View style={{ flex: 1 }}>
        <View style={{ zIndex: 0 }}>
          <FlatList
            data={reactCtx.listing}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={<HomeHeader onSearch={handleSearch} />}
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

export default Home;
