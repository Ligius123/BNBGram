import { StyleSheet, View, TextInput } from "react-native";
import { useContext, useState } from "react";

import { Colors } from "../../constants/styles";
import Button from "../ui/Button";

import { Message } from "../../models/message";
import { UserContext } from "../../store/user-context";

function Chat({ onCreateMessage }) {
  const [enteredText, setEnteredText] = useState("");

  const userCtx = useContext(UserContext);

  function enteredTextHandler(enteredText) {
    setEnteredText(enteredText);
  }

  function showTextHandler() {
    const message = new Message(enteredText, userCtx.email);
    onCreateMessage(message);
    setEnteredText("");
  }

  return (
    <View>
      <TextInput
        style={styles.chat}
        onChangeText={enteredTextHandler}
        value={enteredText}
      />
      <Button onPress={showTextHandler}>Send</Button>
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
