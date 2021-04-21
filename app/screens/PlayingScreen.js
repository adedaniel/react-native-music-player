import React, { useState } from "react";
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

function PlayingScreen({ navigation }) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <ScrollView>
      <StatusBar />
      <SafeAreaView style={styles.container}>
        <ImageBackground
          source={{
            uri: "https://source.unsplash.com/featured/?music",
          }}
          style={styles.musicImageBg}
        >
          <View style={styles.viewLayout}>
            <View style={styles.upperContentContainer}>
              <BlurView intensity={50}>
                <View style={styles.upperContentOverlay}></View>
              </BlurView>
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
                    icon="shuffle"
                    color="white"
                    style={styles.playOption}
                    onPress={() => console.log("Pressed")}
                  />
                  <FAB
                    icon="repeat"
                    color="white"
                    style={styles.playOption}
                    onPress={() => console.log("Pressed")}
                  />
                  <FAB
                    icon="playlist-play"
                    color="white"
                    style={styles.playOption}
                    onPress={() => console.log("Pressed")}
                  />
                  <FAB
                    icon="heart-outline"
                    color="white"
                    style={styles.playOption}
                    onPress={() => console.log("Pressed")}
                  />
                </View>
              </View>
            </View>
            <View style={styles.lowerContentContainer}>
              <BlurView intensity={50} tint="dark">
                {/* <View style={styles.lowerContentOverlay}></View> */}

                <View style={styles.lowerContent}>
                  <View style={styles.songInfo}>
                    <Text style={[styles.textWhite, styles.songName]}>
                      Believe In YourselfBelieve In Yourself
                    </Text>
                    <Text style={[styles.textWhite, styles.songArtist]}>
                      Muhammed Ali
                    </Text>
                    <View style={styles.songActionsContainer}>
                      <IconButton
                        icon="skip-previous"
                        color={Colors.white}
                        size={32}
                        onPress={() => console.log("Pressed")}
                      />
                      <FAB
                        icon={isPlaying ? "pause" : "play"}
                        color="white"
                        style={styles.playButton}
                        onPress={() => setIsPlaying(!isPlaying)}
                      />
                      <IconButton
                        icon="skip-next"
                        color={Colors.white}
                        size={32}
                        onPress={() => console.log("Pressed")}
                      />
                    </View>
                  </View>

                  <View style={styles.playBackContainer}>
                    <View style={styles.playBackOverlay}></View>
                    <View style={styles.playBackContent}>
                      <View style={styles.playBackRow}>
                        <Text style={[styles.textWhite]}>0:01</Text>
                        <Slider
                          minimumTrackTintColor={Colors.green200}
                          maximumTrackTintColor="lightgrey"
                          thumbTintColor="#3b9262"
                          style={styles.playBackSlider}
                          tapToSeek
                        />
                        <Text style={[styles.textWhite]}>2:28</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </BlurView>
            </View>
          </View>
        </ImageBackground>
      </SafeAreaView>
    </ScrollView>
  );
}

export default PlayingScreen;

const styles = StyleSheet.create({
  lowerContentOverlay: {
    width: "100%",
    height: "100%",
    backgroundColor: "#000",
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
    position: "absolute",
  },
  upperContentContainer: {
    width: "100%",
    position: "relative",
    height: 170,
  },

  playBackSlider: {
    width: "80%",
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
    position: "relative",
    marginTop: 20,
    height: 72,
  },
  playButton: {
    backgroundColor: "#3b9262",
    marginHorizontal: 10,
    // fontSize: 90,
    // height: 70,
    // width: 70,
    // justifyContent: "center",
    // alignItems: "center",
    // borderRadius: 40,
  },
  songActionsContainer: {
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
    marginTop: 24,
  },
  viewLayout: {
    height: Dimensions.get("window").height,
    justifyContent: "space-between",
  },
  musicImageBg: {
    width: "100%",
    height: "100%",
  },
  playOption: {
    backgroundColor: "#9493936b",
    // fontSize: 80,
    marginRight: 12,
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
    marginBottom: 32,
    fontSize: 20,
  },
  songName: {
    color: "white",
    paddingTop: 10,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 28,
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
    marginBottom: 6,
  },
  text: {
    color: "white",
  },
});
