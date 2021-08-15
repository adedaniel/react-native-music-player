import React, { useEffect, useState } from "react";
import PlayingScreen from "./app/screens/PlayingScreen";
import HomeScreen from "./app/screens/HomeScreen";
import AllMusicScreen from "./app/screens/AllMusicScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Provider } from "./app/utils/Context";
import * as MediaLibrary from "expo-media-library";
import { Audio } from "expo-av";

const RootStack = createStackNavigator();
const RootStackScreen = () => (
  <RootStack.Navigator headerMode="none">
    <RootStack.Screen
      name="Home"
      component={HomeScreen}
      // options={{
      //   animationEnabled: false,
      // }}
    />
    <RootStack.Screen
      name="All Music"
      component={AllMusicScreen}
      // options={{
      //   animationEnabled: false,
      // }}
    />
    <RootStack.Screen
      name="Playing Screen"
      component={PlayingScreen}
      // options={{
      //   animationEnabled: false,
      // }}
    />
  </RootStack.Navigator>
);

export default function App() {
  const [audioFiles, setAudioFiles] = useState([]);
  const [totalAudioCount, setTotalAudioCount] = useState(0);
  const [permissionError, setPermissionError] = useState(false);
  const [photoPermission, setPhotoPermission] = useState(null);
  const [playBackObj, setPlayBackObj] = useState(null);
  const [soundObj, setSoundObj] = useState(null);
  const [currentAudio, setCurrentAudio] = useState({});
  const [currentlyPlaying, setCurrentlyPlaying] = useState({});
  const [isPlaying, setIsPlaying] = useState(false);

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
      mediaType: MediaLibrary.MediaType.audio,
      // first: media.totalCount,
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

  const onAudioPress = async (song) => {
    if (!soundObj) {
      // play audio for the first time
      const playbackObj = new Audio.Sound();
      const status = await playbackObj.loadAsync(
        { uri: song.uri },
        { shouldPlay: true }
      );
      setPlayBackObj(playbackObj);
      setCurrentAudio(song);
      setSoundObj(status);
      setIsPlaying(true);
      return;
    }

    if (soundObj.isLoaded && soundObj.isPlaying && currentAudio.id == song.id) {
      // if audio is already playing
      // pause audio
      const status = await playBackObj.setStatusAsync({ shouldPlay: false });
      setSoundObj(status);
      setIsPlaying(false);
      return;
    }
    if (
      soundObj.isLoaded &&
      !soundObj.isPlaying &&
      currentAudio.id == song.id
    ) {
      // if audio is already paused
      // resume audio
      const status = await playBackObj.playAsync();
      setSoundObj(status);
      setIsPlaying(true);
      return;
    }
    if (soundObj.isLoaded && currentAudio.id != song.id) {
      // if a new song is selected
      // start playing new song
      await playBackObj.stopAsync();
      await playBackObj.unloadAsync();
      const status = await playBackObj.loadAsync(
        { uri: song.uri },
        { shouldPlay: true }
      );
      setCurrentAudio(song);
      setSoundObj(status);
      setIsPlaying(true);
      return;
    }
  };
  // console.log(audioFiles, totalAudioCount);

  return (
    <Provider
      value={{
        audioFiles,
        setAudioFiles,
        totalAudioCount,
        setTotalAudioCount,
        permissionError,
        setPermissionError,
        playBackObj,
        setPlayBackObj,
        soundObj,
        setSoundObj,
        currentAudio,
        setCurrentAudio,
        isPlaying,
        setIsPlaying,
        onAudioPress,
      }}
    >
      <NavigationContainer>
        <RootStackScreen />
      </NavigationContainer>
    </Provider>
  );
}
