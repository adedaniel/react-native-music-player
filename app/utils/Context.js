import React from "react";

const AudioContext = React.createContext();

export const Provider = AudioContext.Provider;
export const Consumer = AudioContext.Consumer;

export default AudioContext;
