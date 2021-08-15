import React, { useContext, useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  ImageBackground,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
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
import { AntDesign } from "@expo/vector-icons";
import { secondsToDuration, wordTruncate } from "../utils";
import AudioContext from "../utils/Context";
import MusicInfo from "expo-music-info";

function PlayingScreen({ navigation }) {
  const {
    isPlaying,
    setIsPlaying,
    onAudioPress,
    currentAudio,
    audioFiles,
    setCurrentAudio,
  } = useContext(AudioContext);

  const [songDetails, setSongDetails] = useState({});
  const {
    id,
    uri,
    albumId,
    duration,
    filename,
    creationTime,
    modificationTime,
  } = currentAudio;

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
  useEffect(() => {
    fetchSongDetails();
  }, [currentAudio]);

  const { title, artist, album, genre, picture } = songDetails;

  return (
    <ScrollView style={{ backgroundColor: "#0d1117" }}>
      <StatusBar />
      <SafeAreaView style={styles.container}>
        <View style={styles.viewLayout}>
          <View style={styles.upperContentContainer}>
            <View style={styles.upperContent}>
              <View style={styles.topRow}>
                <IconButton
                  icon="chevron-down"
                  color={Colors.white}
                  size={32}
                  onPress={() => navigation.navigate("All Music")}
                />
                <Text style={[styles.textWhite, styles.nowPlayingText]}>
                  Now Playing
                </Text>
                <IconButton
                  icon="dots-vertical"
                  color={Colors.white}
                  size={32}
                  onPress={() => console.log("Pressed")}
                />
              </View>
              <View style={styles.optionsRow}>
                <FAB
                  small
                  icon="shuffle"
                  color="white"
                  style={styles.playOption}
                  onPress={() => console.log("Pressed")}
                />
                <FAB
                  small
                  icon="repeat"
                  color="white"
                  style={styles.playOption}
                  onPress={() => console.log("Pressed")}
                />
                <FAB
                  small
                  icon="playlist-play"
                  color="white"
                  style={styles.playOption}
                  onPress={() => console.log("Pressed")}
                />
                <FAB
                  small
                  icon="heart-outline"
                  color="white"
                  style={styles.playOption}
                  onPress={() => console.log("Pressed")}
                />
              </View>
            </View>
          </View>

          <View style={styles.middleContainer}>
            <Image
              style={styles.songImage}
              source={{
                uri:
                  picture?.pictureData ||
                  "https://source.unsplash.com/featured/?music",
              }}
              borderRadius={20}
            />
          </View>

          <View style={styles.lowerContentContainer}>
            {/* <View style={styles.lowerContentOverlay}></View> */}

            <View style={styles.lowerContent}>
              <View style={styles.songInfo}>
                <Text style={[styles.textWhite, styles.songName]}>
                  {wordTruncate(title || filename, 50)}
                </Text>
                <Text style={[styles.textWhite, styles.songArtist]}>
                  {artist}
                </Text>
                <View style={styles.playBackContainer}>
                  <View style={styles.playBackContent}>
                    <View style={styles.playBackRow}>
                      <Text style={[styles.textWhite]}>0:01</Text>
                      <Slider
                        minimumTrackTintColor="#28fcfc"
                        maximumTrackTintColor="lightgrey"
                        thumbTintColor="#28fcfc"
                        style={styles.playBackSlider}
                        tapToSeek
                      />
                      <Text style={[styles.textWhite]}>
                        {secondsToDuration(duration)}
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={styles.songActionsContainer}>
                  <IconButton
                    icon="skip-previous"
                    color={Colors.white}
                    size={32}
                    onPress={() => {
                      const currentAudioIndex = audioFiles.findIndex(
                        ({ id }) => id === currentAudio.id
                      );
                      if (currentAudioIndex > 0) {
                        setCurrentAudio(audioFiles[currentAudioIndex - 1]);
                        onAudioPress(audioFiles[currentAudioIndex - 1]);
                        setIsPlaying(true);
                      }
                    }}
                  />
                  <FAB
                    icon={isPlaying ? "pause" : "play"}
                    color="black"
                    backgroundColor="#28fcfc"
                    style={styles.playButton}
                    onPress={() => {
                      setIsPlaying(!isPlaying);
                      onAudioPress(currentAudio);
                    }}
                  />
                  {/* <AntDesign.Button
                    name="play"
                    size={64}
                    borderRadius={40}
                    color="#28fcfc"
                    backgroundColor="transparent"
                  /> */}
                  <IconButton
                    icon="skip-next"
                    color={Colors.white}
                    size={32}
                    onPress={() => {
                      const currentAudioIndex = audioFiles.findIndex(
                        ({ id }) => id === currentAudio.id
                      );
                      if (currentAudioIndex < audioFiles.length - 1) {
                        setCurrentAudio(audioFiles[currentAudioIndex + 1]);
                        onAudioPress(audioFiles[currentAudioIndex + 1]);
                        setIsPlaying(true);
                      }
                    }}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

export default PlayingScreen;

const styles = StyleSheet.create({
  songImage: {
    width: 250,
    height: 250,
  },
  middleContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  lowerContentOverlay: {
    width: "100%",
    height: "100%",
    opacity: 0.4,
  },
  lowerContent: {
    width: "100%",
    // position: "absolute",
  },
  lowerContentContainer: {
    paddingTop: 0,
    width: "100%",
    // position: "relative",
  },

  upperContentOverlay: {
    width: "100%",
    height: "100%",
    backgroundColor: "#3c3c3c",
    opacity: 0.2,
  },
  upperContent: {
    width: "100%",
  },
  upperContentContainer: {
    // marginTop: 12,
    width: "100%",
  },

  playBackSlider: {
    width: "75%",
    marginHorizontal: 4,
  },
  playBackRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "baseline",
  },
  playBackContent: {
    position: "absolute",
    height: "100%",
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  playBackOverlay: {
    backgroundColor: "black",
    height: "100%",
    opacity: 0.3,
  },
  playBackContainer: {
    width: "100%",
    height: 72,
    // marginBottom: 8,
  },
  playButton: {
    backgroundColor: "#28fcfc",
    marginHorizontal: 10,

    // fontSize: 90,
    // height: 70,
    // width: 70,
    // justifyContent: "center",
    // alignItems: "center",
    // borderRadius: 40,
  },
  songActionsContainer: {
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  songInfo: {
    justifyContent: "center",
    alignItems: "center",
  },
  optionsRow: {
    width: "100%",
    justifyContent: "center",
    flexDirection: "row",
    marginTop: 12,
  },
  viewLayout: {
    height: "100%",
    justifyContent: "space-between",
  },
  musicImageBg: {
    width: "100%",
    height: "100%",
  },
  playOption: {
    backgroundColor: "#9493936b",
    // fontSize: 80,
    marginRight: 18,
  },
  playlistContainer: {
    backgroundColor: "#30363d",
    paddingBottom: 8,
    marginRight: 24,
    borderRadius: 8,
  },
  nowPlayingText: {
    fontSize: 18,
  },
  textWhite: {
    color: "white",
  },
  songArtist: {
    color: "white",
    marginTop: 4,
    textAlign: "center",
    // marginBottom: 8,
    fontSize: 16,
  },
  songName: {
    color: "white",
    paddingTop: 10,
    paddingHorizontal: 16,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 24,
  },
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
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
  text: {
    color: "white",
  },
});
