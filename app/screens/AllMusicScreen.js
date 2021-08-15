import React, { useContext, useEffect, useState } from "react";
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  Platform,
  SafeAreaView,
  ScrollView,
  // StatusBar,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import {
  Colors,
  IconButton,
  Icon,
  Menu,
  TextInput,
  FAB,
} from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { BlurView } from "expo-blur";
import * as MediaLibrary from "expo-media-library";
import Moment from "react-moment";
import { secondsToDuration, secondsToHHMM, wordTruncate } from "../utils";
import MusicListItem from "../components/MusicListItem";
import { StatusBar } from "expo-status-bar";
import AudioContext from "../utils/Context";
// import Permissions from "react-native-permissions";
// import MusicFiles from "react-native-get-music-files";

function AllMusicScreen({ navigation }) {
  const {
    audioFiles,
    totalAudioCount,
    soundObj,
    playBackObj,
    currentAudio,
    setCurrentAudio,
    setPlayBackObj,
    setSoundObj,
    isPlaying,
    setIsPlaying,
    onAudioPress,
  } = useContext(AudioContext);

  const renderItem = ({ item: song }) => (
    <MusicListItem
      onPress={() => {
        if (song.id !== currentAudio.id) {
          setCurrentAudio(song);
          setIsPlaying(true);
          onAudioPress(song);
        }
        navigation.navigate("Playing Screen");
      }}
      key={song.id}
      song={song}
    />
  );

  const getTotalPlayTime = () => {
    const totalTime = audioFiles.reduce(
      (total, { duration }) => total + duration,
      0
    );
    return totalTime;
  };

  return (
    <>
      <StatusBar />
      <SafeAreaView style={styles.container}>
        <ImageBackground
          resizeMode="cover"
          source={{
            uri: "https://source.unsplash.com/random",
          }}
          style={styles.musicImageBg}
        >
          <BlurView intensity={60} tint="dark">
            <View style={styles.imageContainer}>
              <View style={styles.topRow}>
                <IconButton
                  icon="chevron-left"
                  color={Colors.white}
                  size={32}
                  onPress={() => navigation.navigate("Home")}
                />
              </View>
              <View style={styles.playlistDetails}>
                <Text style={styles.playlistTitle}>All Songs</Text>
                {/* <Text style={styles.playlistArtist}>Kodaline</Text> */}
                <Text style={styles.playlistTime}>
                  {secondsToHHMM(getTotalPlayTime())} . {totalAudioCount} songs
                </Text>
              </View>
            </View>
          </BlurView>
        </ImageBackground>
        <View style={styles.playButtonRow}>
          <FAB
            icon={isPlaying ? "pause" : "play"}
            color="white"
            style={styles.playButton}
            onPress={() => {
              navigation.navigate("Playing Screen");
              // setIsPlaying(!isPlaying);
            }}
          />
        </View>
        <FlatList
          data={audioFiles.sort(
            (a, b) =>
              new Date(b.modificationTime) - new Date(a.modificationTime)
          )}
          renderItem={renderItem}
          keyExtractor={(song) => song.id}
          progressViewOffset={20}
        />
      </SafeAreaView>
    </>
  );
}

export default AllMusicScreen;

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
  playButton: {
    backgroundColor: "#28fcfc",
  },
  playButtonRow: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
    paddingHorizontal: 24,
    marginTop: -30,
    marginBottom: 10,
  },
  playlistTime: {
    color: "lightgrey",
    fontSize: 14,
  },
  playlistArtist: {
    color: "white",
    fontSize: 20,
  },
  playlistTitle: {
    color: "white",
    fontSize: 36,
  },
  playlistDetails: {
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  imageContainer: {
    // backgroundColor: "green",
    width: "100%",
    height: "100%",
    paddingTop: 8,
    justifyContent: "space-between",
  },
  musicImageBg: {
    width: "100%",
    height: 250,
    // padding: 8,
  },
  playlistContainer: {
    padding: 8,
  },
  container: {
    flex: 1,
    // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "#0d1117",
    // paddingHorizontal: 16,
    minHeight: Dimensions.get("window").height,
    color: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },

  topRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // marginTop: 16,
    // marginBottom: 6,
  },
  textWhite: {
    color: "white",
  },
});
