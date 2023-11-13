import { useEffect, useState } from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import ExerciseModalForExercisePage from "./ExerciseModalForExercisePage.js";
import ListOfExercises from "./ListOfExercises.js";
import { useStore } from "../src/store.js";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//             to do list
// figure out how to unselect muscle and/or equipment dropdown selections

//             feature roadmap
// add body outline with muscles and display exercises for selected muscle group (modal?)

const ExercisePage = ({ createNewExerciseModal, setCreateNewExerciseModal, navigation }) => {

  // global state from store
  const toggleComingFromExercisePage = useStore(state => state.toggleComingFromExercisePage);
  const toggleComingFromStartEmptyWorkout = useStore(state => state.toggleComingFromStartEmptyWorkout);

  useEffect(() => {
    console.log('inside useEffect')
    if (navigation) {
      console.log('inside navigation')
      const updateComingFrom = navigation.addListener('tabPress', (e) => {
        e.preventDefault();
        toggleComingFromExercisePage(true);
        toggleComingFromStartEmptyWorkout(false);
        console.log(e);
      });
      return updateComingFrom;
    }
  }, [navigation]);

  // for exercise modal
  const [exerciseModal, setExerciseModal] = useState(false);
  const [exerciseNameForModal, setExerciseNameForModal] = useState(undefined);

  return (
    <View style={[styles.container]}>
      <View style={{ marginBottom: 15, flexDirection: "row", gap: 20 }}>
        <Pressable
          style={{
            borderRadius: 10,
            borderWidth: 2,
            borderColor: "white",
            padding: 10,
            marginLeft: 20,
          }}
          onPress={() => { setCreateNewExerciseModal(true), toggleComingFromExercisePage(true) }}
        >
          <Text
            style={{
              color: "#D3D3D3",
              fontSize: 14,
            }}
          >
            New
          </Text>
        </Pressable>
        <Text
          style={{
            color: "#D3D3D3",
            fontSize: 30,
            // paddingLeft: 20,
            // paddingBottom: 10,
            textAlign: "center",
          }}
        >
          Exercise Page
        </Text>
      </View>
      <ListOfExercises
        exerciseModal={exerciseModal}
        setExerciseModal={setExerciseModal}
        exerciseNameForModal={exerciseNameForModal}
        setExerciseNameForModal={setExerciseNameForModal}
      />
      <ExerciseModalForExercisePage
        exerciseModal={exerciseModal}
        setExerciseModal={setExerciseModal}
        exerciseNameForModal={exerciseNameForModal}
        setExerciseNameForModal={setExerciseNameForModal}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    borderRadius: 10,
  },
  item: {
    padding: 20,
    marginVertical: 4,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 16,
    color: "white",
  },
  selectedExerciseOrEquipment: {
    backgroundColor: "#011638",
    color: "#61FF7E",
    borderColor: "#D3D3D3",
    fontWeight: "bold",
  },
  noSelectedExerciseOrEquipment: {
    backgroundColor: "#364156",
    color: "black",
    borderColor: "#D3D3D3",
  },
  modalCenteredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 50,
    backgroundColor: "#D3D3D3",
    borderRadius: 20,
    borderColor: "#D3D3D3",
    padding: 25,
    alignItems: "center",
    height: "80%",
    width: "95%",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: 50,
    height: 50,
    marginRight: 10,
    flex: 1,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#011638",
  },
  textStyle: {
    color: "#0A8754",
    fontWeight: "bold",
    textAlign: "center",
    width: 10,
    // flex: 1,
    // margin: 10
  },
  modalText: {
    // marginBottom: 15,
    // textAlign: 'center',
    // flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center'
  },
});

export default ExercisePage;
