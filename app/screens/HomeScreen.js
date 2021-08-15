import React, { useEffect, useMemo, useState } from "react";
import {
  Alert,
  DeviceEventEmitter,
  Dimensions,
  Image,
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
import MusicFiles from "react-native-get-music-files";
import * as DocumentPicker from "expo-document-picker";
import * as MediaLibrary from "expo-media-library";
import useWindowDimensions from "react-native/Libraries/Utilities/useWindowDimensions";

function HomeScreen({ navigation }) {
  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <View style={styles.innerContainer}>
          <View style={styles.topRow}>
            <IconButton
              icon="menu"
              color={Colors.white}
              size={32}
              onPress={() => {
                console.log("Pressed");
              }}
            />
            <Image
              source={{
                uri: "https://picsum.photos/200",
              }}
              style={styles.profileImage}
            />
          </View>
          <View>
            <Text style={styles.introMessage}>Hello Sumiya</Text>
            <Text style={styles.subMessage}>
              Play your best songs on your phone
            </Text>
          </View>
          <TextInput
            label="Looking For..."
            mode="outlined"
            selectionColor="#ffffff"
            underlineColor="#ffffff"
            theme={{
              roundness: 12,
              colors: {
                placeholder: "#c5c5c58c",
                text: "white",
                primary: "#28fcfc",
                underlineColor: "transparent",
                background: "#003489",
              },
            }}
            keyboardType="web-search"
            style={styles.searchSongInput}
            right={
              <TextInput.Icon
                name={() => (
                  <Ionicons name="search-outline" size={32} color="#c5c5c58c" />
                )} // where <Icon /> is any component from vector-icons or anything else
                onPress={() => {}}
              />
            }
            // value={text}
            // onChangeText={(text) => setText(text)}
          />

          <Text style={[styles.textWhite, styles.playlist]}>
            Popular Playlist
          </Text>
          <ScrollView bounces bouncesZoom horizontal style={styles.playlistRow}>
            {[0, 1, 2, 3].map((index) => (
              <View key={index} style={styles.playlistContainer}>
                <Image
                  source={{
                    uri: "https://source.unsplash.com/featured/?music",
                  }}
                  style={styles.playlistImage}
                />
                <View style={styles.playlistInfoContainer}>
                  <View>
                    <Text style={[styles.textWhite, styles.playlistName]}>
                      Evolve
                    </Text>
                    <Text style={[styles.textWhite]}>Imagine Dragons</Text>
                  </View>
                  <FAB
                    small
                    icon="play"
                    color="white"
                    style={styles.playButton}
                    onPress={() => navigation.navigate("All Music")}
                  />
                </View>
              </View>
            ))}
          </ScrollView>
          <View>
            <Text style={[styles.textWhite, styles.recentlyPlayedTitle]}>
              Recently Played
            </Text>
            <ScrollView bounces bouncesZoom horizontal style={styles.playsRow}>
              {[0, 1, 2, 3].map((index) => (
                <TouchableOpacity key={index}>
                  <View style={styles.playsContainer}>
                    <Image
                      source={{
                        uri: "https://source.unsplash.com/featured/?music",
                      }}
                      style={styles.playsImage}
                    />
                    <View style={styles.playsInfoContainer}>
                      <View>
                        <Text style={[styles.textWhite]}>Light</Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  playsRow: {
    width: Dimensions.get("screen").width,
    marginBottom: 56,
  },
  playsImage: {
    width: 120,
    height: 100,
    borderRadius: 6,
    marginBottom: 8,
  },
  playsContainer: {
    paddingBottom: 8,
    alignItems: "center",
    marginRight: 16,
    borderRadius: 8,
  },
  recentlyPlayedTitle: { fontSize: 18, marginTop: 26, marginBottom: 24 },
  playButton: {
    backgroundColor: "#28fcfc",
  },
  playlistInfoContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingBottom: 8,
  },
  // playlistTrackName: {},
  playlistName: { fontSize: 18, paddingTop: 8, fontWeight: "bold" },
  playlistImage: {
    width: 240,
    height: 150,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
  },
  playlistContainer: {
    backgroundColor: "#30363d",
    paddingBottom: 8,
    marginRight: 24,
    borderRadius: 8,
  },
  playlistRow: {
    // display: "flex",
    // flexWrap: "nowrap",
    // flexDirection: "row",
    // width: "100%",
    width: Dimensions.get("screen").width,
    // backgroundColor: "white",
    paddingBottom: 8,
  },
  playlist: {
    fontSize: 20,
    marginTop: 36,
    marginBottom: 24,
  },
  textWhite: {
    color: "white",
  },
  searchSongInput: {
    color: "white",
    backgroundColor: "#3c3c3c",
    borderColor: "#bb573f",
  },
  subMessage: {
    color: "white",
    marginTop: 4,
    marginBottom: 32,
    fontSize: 20,
  },
  introMessage: {
    color: "white",
    fontWeight: "bold",
    fontSize: 32,
  },
  container: {
    flex: 1,
    // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "#0d1117",
    paddingHorizontal: 16,
    color: "#fff",
    // height: Dimensions.get("window").height,
    // alignItems: "center",
    // justifyContent: "center",
  },
  innerContainer: {
    marginHorizontal: Platform.OS === "android" ? 0 : 20,
  },
  profileImage: {
    height: 40,
    width: 40,
    borderRadius: 4,
  },
  topRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
    marginBottom: 6,
  },
  text: {
    color: "white",
  },
});
