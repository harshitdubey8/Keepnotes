import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, LogBox } from "react-native";
import Header from "./app/components/Header";
import KeepScreen from "./app/screens/KeepScreen";
import firebase from "firebase";

export default function App() {
  LogBox.ignoreLogs(["Setting a timer"]);
  return (
    <View style={styles.container}>
      <Header />

      <KeepScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
