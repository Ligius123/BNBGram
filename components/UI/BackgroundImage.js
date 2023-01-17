import { ImageBackground, StyleSheet, View } from "react-native";

export default function BackgroundImage({ children }) {
  return (
    <ImageBackground
      source={require("../../assets/images/roma.png")}
      resizeMode="cover"
      style={styles.rootScreen || styles.children}
      imageStyle={styles.backgroundImage}
    >
      {children}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.7,
  },
});
