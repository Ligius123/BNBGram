import { StyleSheet, View, FlatList } from "react-native";
import { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";

import BackgroundImage from "../components/ui/BackgroundImage";
import { Colors } from "../constants/styles";
import Chat from "../components/Forum/Chat";
import { storeMessage } from "../util/http";
import ErrorOverlay from "../components/ui/ErrorOverlay";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { fetchMessage } from "../util/http";
import Message from "../components/Forum/Message";

function Forum({ route }) {
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();
  const [loadedMessages, setLoadedMessages] = useState([]);

  const isFocused = useIsFocused();
  async function createMessageHandler(message) {
    try {
      const id = await storeMessage(message);
    } catch (error) {
      Alert.alert("Not enough arguments", "You have to fill al the fields");
      console.log(error);
    }
  }

  useEffect(() => {
    async function loadMessages() {
      setIsFetching(true);
      try {
        const message = await fetchMessage();
        setLoadedMessages(message);
      } catch (error) {
        console.log(error);
        setError("Could not fetch messages!");
      }
      setIsFetching(false);
    }

    loadMessages();
    // setLoadedPlaces((curPlaces) => [...curPlaces, route.params.place]);
  }, [isFocused, route]);

  if (error && !isFetching) {
    return <ErrorOverlay message={error} />;
  }

  if (isFetching) {
    return <LoadingOverlay message="View all messages..." />;
  }

  return (
    <BackgroundImage>
      <View style={styles.forum}>
        <Chat onCreateMessage={createMessageHandler}></Chat>

        <FlatList
          data={loadedMessages}
          keyExtractor={(item) => item.id}
          // ref={listRef}
          // onScroll={(event) => {
          //   setContentVerticalOffset(event.nativeEvent.contentOffset.y);
          // }}
          renderItem={({ item }) => <Message message={item} />}
        />
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
