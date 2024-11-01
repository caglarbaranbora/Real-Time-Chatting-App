import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Image } from "expo-image";
import { blurhash, formatDate } from "@/utils/common";
import { useRouter } from "expo-router";
import { getRoomId } from "@/utils/common";
import {
  doc,
  collection,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "@/firebaseConfig";

export default function ChatItem({ item, index, noBorder, currentUser }) {
  const [lastMessage, setLastMessage] = useState(undefined);
  const router = useRouter();

  useEffect(() => {
    let roomId = getRoomId(currentUser?.userId, item?.userId);
    const docRef = doc(db, "rooms", roomId);
    const messagesRef = collection(docRef, "messages");
    const q = query(messagesRef, orderBy("createdAt", "desc"));

    let unsub = onSnapshot(q, (snapshot) => {
      let allMessages = snapshot.docs.map((doc) => {
        return doc.data();
      });

      setLastMessage(allMessages[0] ? allMessages[0] : null);
    });
    return unsub;
  }, []);

  const openChatRoom = () => {
    router.push({ pathname: "/chatRoom", params: item });
  };

  const renderTime = () => {
    if (lastMessage) {
      let date = lastMessage?.createdAt;
      return formatDate(new Date(date?.seconds * 1000));
    }
  };

  const renderLastMessage = () => {
    if (typeof lastMessage == "undefined") return "Loading...";
    if (lastMessage) {
      if (currentUser?.userId == lastMessage?.userId)
        return "You: " + lastMessage?.text;
      return `${currentUser?.username}:` + lastMessage?.text;
    } else {
      return "Say Hi 👋";
    }
  };
  return (
    <TouchableOpacity
      onPress={openChatRoom}
      className={`flex-row justify-between items-center mx-4 gap-3 mb-4 pb-2 ${
        noBorder ? "" : " border-b border-neutral-200"
      }`}
    >
      <Image
        source={item?.profileUrl}
        style={{ height: hp(6), width: hp(6), borderRadius: 100 }}
        placeholder={blurhash}
        transition={500}
      />

      {/* name and last message */}
      <View className="flex-1 gap-1">
        <View className="flex-row justify-between">
          <Text
            style={{ fontSize: hp(1.8) }}
            className="font-semibold text-neutral-800"
          >
            {item?.username}
          </Text>
          <Text
            style={{ fontSize: hp(1.6) }}
            className="font-medium text-neutral-500"
          >
            {renderTime()}
          </Text>
        </View>
        <Text
          style={{ fontSize: hp(1.6) }}
          className="font-medium text-neutral-500"
        >
          {renderLastMessage()}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
