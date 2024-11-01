import {
  View,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { useLocalSearchParams } from "expo-router";
import ChatRoomHeader from "@/components/ChatRoomHeader";
import { useRouter } from "expo-router";
import MessageList from "@/components/MessageList";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Feather } from "@expo/vector-icons";
import CustomKeyboardView from "@/components/CustomKeyboardView";
import { getRoomId } from "@/utils/common";
import {
  setDoc,
  doc,
  Timestamp,
  collection,
  addDoc,
  orderBy,
  onSnapshot,
  query,
} from "firebase/firestore";
import { useAuth } from "@/context/authContext";
import { db } from "@/firebaseConfig";

export default function ChatRoom() {
  const item = useLocalSearchParams(); // second user
  const { user } = useAuth(); //logged in user
  const router = useRouter();
  const [messages, setMessages] = useState([]);
  const textRef = useRef("");
  const inputRef = useRef(null);
  const scrollViewRef = useRef(null);

  useEffect(() => {
    createRoomIfNotExist();
    let roomId = getRoomId(user?.userId, item?.userId);
    const docRef = doc(db, "rooms", roomId);
    const messagesRef = collection(docRef, "messages");
    const q = query(messagesRef, orderBy("createdAt", "asc"));

    let unsub = onSnapshot(q, (snapshot) => {
      let allMessages = snapshot.docs.map((doc) => {
        return doc.data();
      });

      setMessages([...allMessages]);
    });

    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      updateScrollView
    );
    return () => {
      unsub();
      keyboardDidShowListener.remove();
    };
  }, []);

  useEffect(() => {
    updateScrollView();
  }, [messages]);

  const updateScrollView = () => {
    setTimeout(() => {
      scrollViewRef?.current.scrollToEnd({ animated: true });
    }, 100);
  };

  const createRoomIfNotExist = async () => {
    let roomId = getRoomId(user?.uid, item?.userId);
    await setDoc(doc(db, "rooms", roomId), {
      roomId,
      createdAt: Timestamp.fromDate(new Date()),
    });
  };

  const handleSendMessage = async () => {
    let message = textRef.current.trim();
    if (!message) return;
    try {
      let roomId = getRoomId(user?.userId, item?.userId);
      const docRef = doc(db, "rooms", roomId);
      const messagesRef = collection(docRef, "messages");
      textRef.current = "";
      if (inputRef.current) inputRef?.current?.clear();
      const newDoc = await addDoc(messagesRef, {
        userId: user?.userId,
        text: message,
        profileUrl: user?.profileUrl,
        senderName: user?.username,
        createdAt: Timestamp.fromDate(new Date()),
      });
    } catch (err) {
      Alert.alert("Message", err.message);
    }
  };

  return (
    <CustomKeyboardView inChat={true}>
      <View className="flex-1 bg-white">
        <StatusBar barStyle="dark-content" />
        <ChatRoomHeader user={item} router={router} />
        <View className="flex-1 justify-between bg-neutral-100 overflow-visible">
          <View className="flex-1">
            <MessageList
              scrollViewRef={scrollViewRef}
              messages={messages}
              currentUser={user}
            />
          </View>
          <View style={{ marginBottom: hp(2.7) }} className="pt-2">
            <View className="flex-row mx-3 justify-between bg-white border p-2 border-neutral-300 rounded-full pl-5 ">
              <TextInput
                ref={inputRef}
                onChangeText={(value) => (textRef.current = value)}
                placeholder="Type Message..."
                className="flex-1 mr-2"
                style={{ fontSize: hp(2) }}
              />
              <TouchableOpacity
                onPress={handleSendMessage}
                className="bg-neutral-200 p-2 mr-[1px] rounded-full"
              >
                <Feather name="send" size={hp(2.7)} color="#737373" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </CustomKeyboardView>
  );
}
