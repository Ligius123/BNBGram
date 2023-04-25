import { StyleSheet, View, Text, TextInput } from "react-native";
import { useState } from "react";

import { Colors } from "../../constants/styles";
import Button from "../ui/Button";

function Chat() {
  const [enteredText, setEnteredText] = useState("");
  const [showText, setShowText] = useState(false);

  function enteredTextHandler(enteredText) {
    setEnteredText(enteredText);
    setShowText(false);
  }

  function showTextHandler() {
    setShowText(true);
    // setEnteredText("");
  }

  return (
    <View>
      <TextInput
        style={styles.chat}
        onChangeText={enteredTextHandler}
        value={enteredText}
      />
      <Button onPress={showTextHandler}>Send</Button>
      <Text style={styles.text}>{showText && enteredText}</Text>
    </View>
  );
}

export default Chat;

const styles = StyleSheet.create({
  chat: {
    backgroundColor: Colors.primary900,
    opacity: 0.9,
  },
  text: {
    color: Colors.primary900,
  },
});
