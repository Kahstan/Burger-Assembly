import { Text, View, StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { FocusedStatusBar, HomeHeader, NFTCard } from "../components";
import { COLORS, BurgerData } from "../constants";
import React, { useState, useEffect, useContext } from "react";
import ReactContext from "../context/react-context";

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
      console.log(reactCtx.listing);
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

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FocusedStatusBar backgroundColor={COLORS.primary} />
      <View style={{ flex: 1 }}>
        <View style={{ zIndex: 0 }}>
          <FlatList
            data={reactCtx.listing}
            renderItem={({ item }) => <NFTCard data={item} />}
            keyExtractor={(item) => item.id}
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
          <View style={{ backgroundColor: COLORS.primary }} />
          <View style={{ flex: 1, backgroundColor: COLORS.white }} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;
