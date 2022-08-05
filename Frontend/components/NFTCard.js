import { View, Text, Button, Image } from "react-native";
import React from "react";
import { useEffect, useContext } from "react";
import ReactContext from "../context/react-context";
import { COLORS, SIZES, SHADOWS, FONTS, assets } from "../constants";
import { useNavigation } from "@react-navigation/native";
import { CircleButton, RectButton } from "./Button";
import { SubInfo, EthPrice, NFTTitle } from "./SubInfo";

const NFTCard = ({ data }) => {
  // const reactCtx = useContext(ReactContext);
  const navigation = useNavigation();

  return (
    <View>
      <View
        style={{
          backgroundColor: COLORS.white,
          borderRadius: SIZES.font,
          marginBottom: SIZES.extraLarge,
          margin: SIZES.base,
          ...SHADOWS.dark,
        }}
      >
        <View
          style={{
            width: "100%",
            height: 250,
          }}
        >
          <Image
            source={data.image}
            resizeMode="cover"
            style={{
              width: "100%",
              height: "100%",
              borderTopLeftRadius: SIZES.font,
              borderTopRightRadius: SIZES.font,
            }}
          />
        </View>

        <SubInfo />

        <View
          style={{
            width: "100%",
            padding: SIZES.font,
            marginTop: SIZES.medium,
          }}
        >
          <NFTTitle
            title={data.title}
            subtitle={data.creator}
            titleSize={SIZES.large}
            subTitleSize={SIZES.small}
          />

          <View
            style={{
              marginTop: SIZES.font,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <EthPrice price={data.price} />
            <RectButton
              minWidth={120}
              fontSize={SIZES.font}
              handlePress={() => navigation.navigate("Details", { data })}
            />
          </View>
        </View>
      </View>
      {/* <View>
        {reactCtx.listing &&
          reactCtx.listing.map((data, index) => {
            // need conditional rendering because initially displayAll is undefined because its empty. When we do displayAll && it will render when it returns true aka when displayAll is not empty aka not undefined, aka its populated
            return (
              <View>
                <View keyExtractor={(item) => item.id}>
                  <Text style={{ flex: 1 }}>{data?.title}</Text>
                  <Text>{data.breed}</Text>
                </View>
              </View>
            );
          })}
      </View> */}
      {/* <Button title="Click to get data" onPress={submitListingSearch}></Button> */}
    </View>
  );
};

export default NFTCard;
