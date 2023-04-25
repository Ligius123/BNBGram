import { StyleSheet, View, Text } from "react-native";

import { Colors } from "../../constants/styles";

function Message({ message }) {
  return (
    <View>
      <Text style={styles.text}>{message.user}: </Text>
      <Text style={styles.container}>{message.message}</Text>
    </View>
  );
}

export default Message;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary100,
    opacity: 0.9,
    marginTop: 1,
    marginLeft: 1,
    marginRight: 1,
    marginBottom: 1,
    borderRadius: 8,
    padding: 7,
    color: Colors.primary500,
  },
  text: {
    color: Colors.primary900,
  },
});
