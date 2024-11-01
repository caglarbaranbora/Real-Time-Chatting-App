import { KeyboardAvoidingView, ScrollView, Platform } from "react-native";
import React from "react";

const ios = Platform.OS === "ios";

const CustomKeyboardView = ({ children, inChat }) => {
  let kavConfig = {};
  let scrollViewConfig = {};
  if (inChat) {
    kavConfig = {
      keyboardVerticalOffset: 90,
    };
    scrollViewConfig = {
      contentContainerStyle: { flex: 1 },
    };
  }

  return (
    <KeyboardAvoidingView
      behavior={ios ? "padding" : "height"}
      style={{ flex: 1 }}
      {...kavConfig}
    >
      <ScrollView
        style={{ flex: 1 }}
        {...scrollViewConfig}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CustomKeyboardView;
