import React from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";

const Header = () => {
  return (
    <View style={styles.header}>
      <StatusBar
        translucent
        animated
        barStyle="light-content"
        backgroundColor="rgba(0,0,0,0.1)"
      />
      <Text style={styles.header_title}>&copy; Harshit Keep-note-clone </Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    paddingTop: StatusBar.currentHeight,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F4D03F",
    height: 80,
  },
  header_title: {
    fontWeight: "bold",
  },
});
