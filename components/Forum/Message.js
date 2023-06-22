import { StyleSheet, View, Text } from "react-native";

import { Colors } from "../../constants/styles";

function Message({ message }) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.user}>{message.user}: </Text>
      <View style={styles.message}>
        <Text>{message.message}</Text>
        <Text style={styles.date}>{message.date}</Text>
      </View>
    </View>
  );
}

export default Message;

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
  },
  message: {
    backgroundColor: Colors.primary100,
    opacity: 0.9,
    marginTop: 1,
    marginLeft: 1,
    marginRight: 1,
    marginBottom: 1,
    borderRadius: 8,
    padding: 9,
    width: "98%",
    justifyContent: "center",
    color: Colors.primary500,
  },
  user: {
    color: Colors.primary900,
    alignSelf: "flex-start",
  },
  date: {
    fontSize: 8,
    color: Colors.primary500,
  },
});
