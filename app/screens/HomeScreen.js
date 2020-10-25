import React, { useState } from "react";
import { Text, View, StyleSheet, Button, Alert } from "react-native";
import DateChanger from "../components/DateChanger";
import MoodSlider from "../components/MoodSlider";
import Colors from "../constants/colors";

import saveData from "../utils/saveData";
import getData from "../utils/getData";
import getAllData from "../utils/getAllData";
import EmotionPicker from "../components/EmotionPicker";
import { ScrollView } from "react-native-gesture-handler";
import ComplimentesBad from "../constants/complimentsBad";
import ComplimentesGood from "../constants/complimentsGood";
import ComplimentAlert from "../components/ComplimentAlert";

function HomeScreen({ navigation }) {
  const [currentDate, setCurrentDate] = useState(new Date(Date.now()));
  const [mood, setMood] = useState(3);
  const [emotions, setEmotions] = useState([]);

  async function onSaveButtonPress() {
    await saveData(currentDate.getTime().toString(), {
      mood: mood,
      emotions: emotions,
    });
  }
  
  return (
    <View style={styles.screen}>
        <Text style={styles.welcomeText}>Jak się masz?</Text>
        <MoodSlider onValueChange={(moodValue) => setMood(moodValue)} />
        <DateChanger
          date={currentDate}
          mode="datetime"
          style={styles.dateChanger}
        />
        <Button title="Zapisz" onPress={() => {
          onSaveButtonPress;
          ComplimentAlert(mood);
          }} />
        <EmotionPicker onValueChange={(v) => setEmotions(v)}/>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    marginTop: 20,
  },
  welcomeText: {
    fontSize: 28,
    color: Colors.primary,
    fontWeight: "bold",
    alignSelf: "center",
    marginVertical: 10,
  },
  dateChanger: {
    padding: 20,
  },
});

export default HomeScreen;