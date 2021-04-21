import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import { Colors, IconButton } from "react-native-paper";
import { secondsToDuration, wordTruncate } from "../utils";
import MusicInfo from "expo-music-info";

export default function MusicListItem({ song, ...rest }) {
  const [songDetails, setSongDetails] = useState({});
  const {
    id,
    uri,
    albumId,
    duration,
    filename,
    creationTime,
    modificationTime,
  } = song;

  async function fetchSongDetails() {
    let metadata = await MusicInfo.getMusicInfoAsync(uri, {
      title: true,
      artist: true,
      album: true,
      genre: true,
      picture: true,
    });
    setSongDetails({ ...metadata });
  }
  const { title, artist, album, genre, picture } = songDetails;

  useEffect(() => {
    fetchSongDetails();
  }, []);

  return (
    <TouchableHighlight
      activeOpacity={1}
      underlayColor="#616161"
      style={styles.touchHighlight}
      {...rest}
    >
      <View style={styles.musicRow}>
        <View style={styles.musicDetailsContainer}>
          <Image
            source={{
              uri: picture?.pictureData,
            }}
            style={styles.musicImage}
          />
          <View style={styles.musicDetails}>
            <Text style={styles.musicTime}>{secondsToDuration(duration)}</Text>
            <Text style={styles.musicName}>
              {wordTruncate(title || filename, 20)}
            </Text>
            <Text style={styles.musicArtiste}>{artist}</Text>
          </View>
        </View>
        <IconButton
          icon="dots-vertical"
          color={Colors.white}
          size={32}
          onPress={() => console.log("Pressed")}
        />
      </View>
    </TouchableHighlight>
  );
}
const styles = StyleSheet.create({
  touchHighlight: {
    borderRadius: 8,
    width: "100%",
  },
  musicArtiste: {
    color: "lightgrey",
    fontSize: 12,
  },
  musicName: {
    fontWeight: "bold",
    color: "white",
    fontSize: 16,
  },
  musicTime: {
    color: "lightgrey",
    fontSize: 12,
  },
  musicDetails: {},
  musicImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 12,
  },
  musicDetailsContainer: {
    flexDirection: "row",
    maxWidth: "100%",
    alignItems: "center",
  },
  musicRow: {
    width: "100%",
    padding: 10,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textWhite: {
    color: "white",
  },
});
