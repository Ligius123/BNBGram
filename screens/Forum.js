import { StyleSheet, View, Text } from "react-native";

import BackgroundImage from "../components/ui/BackgroundImage";
import { Colors } from "../constants/styles";
import Chat from "../components/Forum/Chat";

function Forum() {
  return (
    <BackgroundImage>
      <View style={styles.forum}>
        <Chat></Chat>
      </View>
    </BackgroundImage>
  );
}

const styles = StyleSheet.create({
  forum: {
    height: "100%",
    width: "100%",
    backgroundColor: Colors.primary500,
    opacity: 0.8,
  },
});

export default Forum;
