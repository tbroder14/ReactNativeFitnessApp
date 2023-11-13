import { useState, useEffect } from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import Modal from "react-native-modal";
import Ionicons from "react-native-vector-icons/Ionicons";
import ListOfExercises from "./ListOfExercises.js";
// import CreateNewExerciseModal from "./CreateNewExerciseModal.js";
import { useStore } from "../src/store.js";
import CreateNewExerciseModal from "./CreateNewExerciseModal.js";


//             to do list
//

//             feature roadmap
// asdf

const AddExerciseToWorkoutModal = ({
  workoutExercises,
  setWorkoutExercises,
  createNewExerciseModal,
  setCreateNewExerciseModal,
  addExerciseToWorkoutModal,
  setAddExerciseToWorkoutModal,
  updateCreateNewExerciseModal,
}) => {

  // for tracking of exercise selection between app.js and AddExerciseModal
  const [selectedExercises, setSelectedExercises] = useState(workoutExercises);

  useEffect(() => {
    setSelectedExercises(workoutExercises);
  }, [workoutExercises]);

  const toggleComingFromStartEmptyWorkout = useStore(state => state.toggleComingFromStartEmptyWorkout);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      isVisible={addExerciseToWorkoutModal}
    // onModalHide={() => toggleCreateNewExerciseModalState(true)}
    >
      <View style={styles.modalCenteredView}>
        <View style={styles.addExerciseModalView}>
          <View style={styles.topRow}>
            <View style={styles.topRowLeftSide}>
              <Pressable
                style={styles.closeExerciseModal}
                onPress={() => {
                  setAddExerciseToWorkoutModal(false)
                }}
              >
                <Ionicons name="close-outline" color={"white"} size={35} />
              </Pressable>
              <Pressable
                style={{
                  paddingTop: 10,
                  paddingLeft: 8,
                }}
                // onPress={() => setAddExerciseToWorkoutModal(false)}

                onPress={() => {
                  setAddExerciseToWorkoutModal(false)
                  toggleComingFromStartEmptyWorkout(true)
                  setTimeout(() => {
                    // toggleCreateNewExerciseModalState(true)
                    setCreateNewExerciseModal(true)
                  }, '200')
                }}
              >
                <Text style={styles.textStyle}>New</Text>
              </Pressable>
            </View>
            <View style={styles.topRowRightSide}>
              {/* // add Exercise button */}
              <Pressable
                onPress={() => {
                  setWorkoutExercises(selectedExercises);
                  setAddExerciseToWorkoutModal(false)
                }}
              >
                <Text style={styles.textStyle}>Add</Text>
              </Pressable>
            </View>
          </View>
          <View>
            <ListOfExercises
              updateCreateNewExerciseModal={updateCreateNewExerciseModal}
            />
          </View>
          <CreateNewExerciseModal
            addExerciseToWorkoutModal={addExerciseToWorkoutModal}
            setAddExerciseToWorkoutModal={setAddExerciseToWorkoutModal}
            createNewExerciseModal={createNewExerciseModal}
            setCreateNewExerciseModal={setCreateNewExerciseModal}
          />
        </View>
      </View>
    </Modal >
  );
};

const styles = StyleSheet.create({
  modalCenteredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  addExerciseModalView: {
    backgroundColor: "#011638",
    borderRadius: 10,
    borderColor: "#D3D3D3",
    height: "90%",
    width: "100%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    padding: 10,
  },
  topRow: {
    // flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  topRowLeftSide: {
    flexDirection: "row",
  },
  topRowRightSide: {
    margin: 10,
  },
  searchBarRow: {
    flex: 1,
    marginRight: 8,
    marginLeft: 8,
  },
  muscleOrEquipmentDropdownRow: {
    flex: 1,
    flexDirection: "row",
    marginLeft: 8,
    marginRight: 8,
    zIndex: 1,
  },
  listOfExercises: {
    flex: 14,
    marginTop: 10,
    marginBottom: 10,
  },
  exerciseItem: {
    padding: 16,
    // marginVertical: 4,
    // marginHorizontal: 16,
    backgroundColor: "green",
  },
  exerciseTitle: {
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
  exerciseIsSelected: {
    padding: 16,
    backgroundColor: "green",
  },
  exerciseIsNotSelected: {
    padding: 16,
    backgroundColor: "#011638",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    // textAlign: "center",
    // width: 10
    // flex: 1,
    // margin: 10
  },
});

export default AddExerciseToWorkoutModal;
