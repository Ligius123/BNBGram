import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from "react-native";

import { Colors } from "../../constants/styles";

function PlaceItem({ place, onSelect }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.item, pressed && styles.pressed]}
      onPress={onSelect.bind(this, place.id)}
    >
      <Image style={styles.image} source={{ uri: place.imageUri }} />
      <View style={styles.info}>
        <Text style={styles.title}>{place.title}</Text>
        <Text style={styles.address}>{place.address}</Text>
      </View>
      <ScrollView>
        <Text style={styles.description}>{place.description}</Text>
      </ScrollView>
    </Pressable>
  );
}

export default PlaceItem;

const styles = StyleSheet.create({
  item: {
    flexDirection: "column",
    // alignItems: "center",
    // justifyContent: "center",
    borderRadius: 6,
    marginVertical: 12,
    // backgroundColor: Colors.primary1000,
    elevation: 5,
    shadowColor: Colors.primary500,
    shadowOpacity: 0.15,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 2,
  },
  pressed: {
    opacity: 0.9,
  },
  image: {
    flex: 1,
    borderBottomLeftRadius: 4,
    borderTopLeftRadius: 4,
    height: 180,
  },
  info: {
    flex: 1,
    padding: 12,
    height: 100,
    backgroundColor: Colors.primary1000,
    opacity: 0.5,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    color: Colors.primary500,
  },
  address: {
    fontSize: 12,
    color: Colors.primary500,
  },
  description: {
    fontSize: 12,
    color: Colors.primary500,
    height: 150,
    padding: 12,
  },
});
