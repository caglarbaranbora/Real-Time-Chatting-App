import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { Image } from "expo-image";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { blurhash } from "@/utils/common";

export default function Start() {
  const router = useRouter();
  return (
    <View className="flex-1">
      <View className="mt-10 flex-row bg-indigo-300 w-20 h-20 rounded-full items-center justify-center ml-2">
        <Image
          source={require("../assets/images/icon.png")}
          style={{ width: wp(17), height: hp(10) }}
        />
      </View>
      <View className="items-center">
        <View className="flex-row mt-3">
          <Text
            style={{ fontSize: hp(3.5) }}
            className="font-semibold text-black"
          >
            Welcome to{" "}
          </Text>
          <Text
            style={{ fontSize: hp(3.5) }}
            className=" text-indigo-500 font-extrabold"
          >
            @Chat
          </Text>
        </View>
        <Image
          source={require("../assets/images/chat.png")}
          style={{ width: wp(100), height: hp(60) }}
          contentFit="contain"
          placeholder={blurhash}
        />
        <View>
          <TouchableOpacity
            onPress={() => router.push("signIn")}
            style={{ height: hp(6.5), width: wp(80) }}
            className="bg-indigo-500 rounded-xl justify-center items-center"
          >
            <Text
              style={{ fontSize: hp(2.7) }}
              className="text-white font-extrabold tracking-wider"
            >
              Start Explore
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
