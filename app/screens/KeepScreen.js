import React, { useState, useEffect } from "react";
import {
  FlatList,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Alert,
} from "react-native";
import KeepButton from "../components/KeepButton";
import KeepModal from "../components/KeepModal";
import KeepNote from "../components/KeepNote";
import db from "../Firebase";

const KeepScreen = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [keepNotes, setKeepNotes] = useState([]);
  const [noteId, setNoteId] = useState(null);

  useEffect(() => {
    const unsubscribe = db.collection("keepnotes").onSnapshot((snapshot) => {
      setKeepNotes(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          title: doc.data().title,
          note: doc.data().note,
        }))
      );
    });
    return () => {
      unsubscribe();
    };
  }, [db]);

  const addANoteHandler = (keepTitle, keepNote, mode) => {
    if (!keepTitle || !keepNote) {
      Alert.alert("blank", "A note can't have empty title or note", [
        { text: "OK" },
      ]);
      return;
    }

    if (mode === "add") {
      // setKeepNotes((prevNotes) => [
      //   { id: new Date().toString(), title: keepTitle, note: keepNote },
      //   ...prevNotes,
      // ]);
      db.collection("keepnotes").add({
        title: keepTitle,
        note: keepNote,
      });
    } else {
      // setKeepNotes((prevNotes) =>
      //   prevNotes.map((prevNote) =>
      //     prevNote.id === noteId
      //       ? { ...prevNote, title: keepTitle, note: keepNote }
      //       : prevNote
      //   )
      // );
      db.collection("keepnotes")
        .doc(noteId)
        .update({ title: keepTitle, note: keepNote });
    }

    setIsModalVisible(false);
    setNoteId(null);
    setTitle("");
    setNote("");
  };

  const addOrEditNote = (noteData) => {
    if (noteData) {
      setNoteId(noteData.id);
      setTitle(noteData.title);
      setNote(noteData.note);
    }
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setNoteId(null);
    setNote("");
    setTitle("");
    setIsModalVisible(false);
  };

  const deleteNoteHandler = (id) => {
    if (id) {
      Alert.alert("Delete", "Are you sure you to delete this note ?", [
        {
          text: "Yes",
          onPress: () => db.collection("keepnotes").doc(id).delete(),
        },
        { text: "No" },
      ]);
    }
  };

  return (
    <View style={styles.keepScreen}>
      <FlatList
        data={keepNotes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <KeepNote
            noteData={item}
            openNote={() => addOrEditNote(item)}
            deleteNoteHandler={deleteNoteHandler}
          />
        )}
        numColumns={2}
      />

      <KeepModal
        isModalVisible={isModalVisible}
        setIsModalVisible={closeModal}
        titleText={title}
        noteText={note}
        addANoteHandler={addANoteHandler}
      />
      <KeepButton
        style={styles.floatingAddButtonContainer}
        color="#F4D03F"
        onButtonPress={() => setIsModalVisible(true)}
      >
        <Text style={styles.floatingAddButtonText}>+</Text>
      </KeepButton>
    </View>
  );
};

export default KeepScreen;

const styles = StyleSheet.create({
  keepScreen: {
    flex: 1,
  },
  floatingAddButtonContainer: {
    width: 70,

    height: 70,
    borderRadius: 35,
    position: "absolute",
    bottom: 10,
    right: 10,
  },

  floatingAddButtonText: {
    color: "#fff",
    fontSize: 32,
  },

  // nd
});

{
  /* <ScrollView contentContainerStyle={styles.keepNote}>
  {keepNotes.map((notes, index) => (
    <KeepNote key={index} noteData={notes} />
  ))}
</ScrollView>; */
}
