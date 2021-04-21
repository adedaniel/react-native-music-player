import React, { useEffect, useState } from "react";
import {
  Alert,
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
import * as MediaLibrary from "expo-media-library";
import Moment from "react-moment";
import { secondsToDuration, wordTruncate } from "../utils";
import MusicListItem from "../components/MusicListItem";
// import Permissions from "react-native-permissions";
// import MusicFiles from "react-native-get-music-files";

function AllMusicScreen({ navigation }) {
  const [isPlaying, setIsPlaying] = useState(false);

  const [audioFiles, setAudioFiles] = useState([]);
  const [totalAudioCount, setTotalAudioCount] = useState(0);
  const [permissionError, setPermissionError] = useState(false);
  const [photoPermission, setPhotoPermission] = useState(null);

  // const getSongs = () => {
  //   Alert.alert("seen");
  //   MusicFiles.getAll({
  //     blured: true, // works only when 'cover' is set to true
  //     artist: true,
  //     duration: true, //default : true
  //     cover: true, //default : true,
  //     genre: true,
  //     title: true,
  //     cover: true,
  //     fields: ["title", "albumTitle", "genre", "lyrics", "artwork", "duration"], // for iOs Version
  //   })
  //     .then((tracks) => {
  //       console.log(tracks);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  // useEffect(() => {
  //   Permissions.request("storage").then((response) => {
  //     setPhotoPermission(response);
  //   });
  //   getSongs();
  // }, []);

  const permissionAlert = () => {
    Alert.alert("Permission Required", "This app needs to read audio files!", [
      {
        text: "I am ready",
        onPress: () => getPermission(),
      },
      {
        text: "cancel",
        onPress: () => permissionAlert(),
      },
    ]);
  };

  const getAudioFiles = async () => {
    let media = await MediaLibrary.getAssetsAsync({
      mediaType: "audio",
    });
    media = await MediaLibrary.getAssetsAsync({
      mediaType: "audio",
      first: media.totalCount,
    });
    setTotalAudioCount(media.totalCount);
    setAudioFiles([...audioFiles, ...media.assets]);
  };

  const getPermission = async () => {
    // {
    //     "canAskAgain": true,
    //     "expires": "never",
    //     "granted": false,
    //     "status": "undetermined",
    //   }
    const permission = await MediaLibrary.getPermissionsAsync();
    if (permission.granted) {
      //    we want to get all the audio files
      audioFiles.length === 0 && getAudioFiles();
    }

    if (!permission.canAskAgain && !permission.granted) {
      setPermissionError(true);
    }

    if (!permission.granted && permission.canAskAgain) {
      const {
        status,
        canAskAgain,
      } = await MediaLibrary.requestPermissionsAsync();
      if (status === "denied" && canAskAgain) {
        //   we are going to display alert that user must allow this permission to work this app
        permissionAlert();
      }

      if (status === "granted") {
        //    we want to get all the audio files
        audioFiles.length === 0 && getAudioFiles();
      }

      if (status === "denied" && !canAskAgain) {
        //   we want to display some error to the user
        setPermissionError(true);
      }
    }
  };
  useEffect(() => {
    getPermission();
  }, []);

  console.log(audioFiles, totalAudioCount);

  return (
    <ScrollView>
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
                  5 hr 36 min . {totalAudioCount} songs
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
              setIsPlaying(!isPlaying);
            }}
          />
        </View>
        <View style={styles.playlistContainer}>
          {audioFiles
            .sort(
              (a, b) =>
                new Date(b.modificationTime) - new Date(a.modificationTime)
            )
            .map((song) => (
              <MusicListItem
                onPress={() => navigation.navigate("Playing Screen")}
                key={song.id}
                song={song}
              />
            ))}
        </View>
      </SafeAreaView>
    </ScrollView>
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
    padding: 0,
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
