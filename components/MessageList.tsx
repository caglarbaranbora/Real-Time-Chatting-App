import { View, Text, ScrollView } from "react-native";
import React from "react";
import MessageItem from "./MessageItem";

const MessageList = ({ messages, scrollViewRef, currentUser }) => {
  return (
    <ScrollView
      ref={scrollViewRef}
      contentContainerStyle={{ paddingTop: 10 }}
      showsVerticalScrollIndicator={false}
    >
      {messages.map((message, index) => {
        return (
          <MessageItem
            message={message}
            key={index}
            currentUser={currentUser}
          />
        );
      })}
    </ScrollView>
  );
};

export default MessageList;
