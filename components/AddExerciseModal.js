import { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Modal from "react-native-modal";
import { sortedExerciseList } from "./data.js";
import Ionicons from "react-native-vector-icons/Ionicons";
import DropDownPicker from "react-native-dropdown-picker";
import { FlatList } from "react-native-gesture-handler";

//             to do list
// select exercises and change the background color
// add selected exercises to an array
// when clicking "add", pass selected exercises to StartWorkoutPage
// receive selected exercises when user returns to AddExerciseModal
// do I need to create like five different useStates?
// one for the exercises and one for the workoutData?

//             feature roadmap
// asdf

const AddExerciseModal = ({
  addExerciseModal,
  setAddExerciseModal,
  workoutExercises,
  setWorkoutExercises,
}) => {
  // for react-native-dropdown-picker
  const [muscleValue, setMuscleValue] = useState(null);
  const [equipmentValue, setEquipmentValue] = useState(null);
  const [muscleOpen, setMuscleOpen] = useState(false);
  const [equipmentOpen, setEquipmentOpen] = useState(false);

  // for tracking of exercise selection between app.js and AddExerciseModal
  const [selectedExercises, setSelectedExercises] = useState(workoutExercises);
  console.log("selectedExercises:", selectedExercises);

  // displaying sorted list of exercises
  const [searchBarInput, setSearchBarInput] = useState("");
  const [filterExerciseList, setFilterExerciseList] =
    useState(sortedExerciseList);
  const [muscleSort, setMuscleSort] = useState(null);
  const [equipmentSort, setEquipmentSort] = useState(null);

  // for exercise modal
  const [exerciseModal, setExerciseModal] = useState(false);
  const [exerciseNameForModal, setExerciseNameForModal] = useState(undefined);

  const muscles = [
    { label: "Biceps", value: "biceps" },
    { label: "Triceps", value: "triceps" },
    { label: "Chest", value: "chest" },
    { label: "Hamstrings", value: "hamstrings" },
    { label: "Quadriceps", value: "quadriceps" },
    { label: "Glutes", value: "glutes" },
    { label: "Core", value: "core" },
    { label: "Back", value: "back" },
    { label: "Calves", value: "calves" },
    { label: "Clear", value: "clear" },
  ];

  const equipment = [
    { label: "Barbell", value: "barbell" },
    { label: "Dumbbells", value: "dumbbells" },
    { label: "Cable", value: "cable" },
    { label: "Kettlebell", value: "kettlebell" },
    { label: "Bodyweight", value: "bodyweight" },
    { label: "Machine", value: "machine" },
    { label: "Other", value: "other" },
  ];

  useEffect(() => {
    let filteredList = sortedExerciseList;

    // this is just for testing
    if (muscleValue == "clear") {
      setFilterExerciseList(filteredList);
      return;
    }
    // end testing

    if (equipmentValue) {
      filteredList = filteredList.filter(
        (exercise) => exercise.equipment === equipmentValue
      );
    }

    if (muscleValue) {
      filteredList = filteredList.filter(
        (exercise) => exercise.muscle === muscleValue
      );
    }

    if (searchBarInput !== "") {
      const searchInputLowerCase = searchBarInput.toLowerCase();
      filteredList = filteredList.filter((exercise) =>
        exercise.name.toLowerCase().includes(searchInputLowerCase)
      );
    }

    setFilterExerciseList(filteredList);
  }, [equipmentValue, muscleValue, searchBarInput, sortedExerciseList]);

  const handleItemPress = (itemName) => {
    // add exercise to an array
    // change the background color of the selected exercises
    if (selectedExercises.includes(itemName)) {
      const arrayCopy = [...selectedExercises];
      const newIndex = selectedExercises.indexOf(itemName);
      arrayCopy.splice(newIndex, 1);
      setSelectedExercises(arrayCopy);
    } else {
      setSelectedExercises((prevState) => [...prevState, itemName]);
    }
  };

  const Item = ({ name, handleItemPress }) => (
    <TouchableOpacity onPress={() => handleItemPress(name)}>
      <View style={styles.exerciseItem}>
        <Text style={styles.exerciseTitle}>{name}</Text>
      </View>
    </TouchableOpacity>
  );

  const Separator = () => (
    <View
      style={{
        height: 1,
        width: "95%",
        backgroundColor: "white",
        marginLeft: 8,
      }}
    ></View>
  );
  return (
    <Modal
      animationType="slide"
      transparent={true}
      isVisible={addExerciseModal}
    >
      <View style={styles.modalCenteredView}>
        <View style={styles.addExerciseModalView}>
          <View style={styles.topRow}>
            <View style={styles.topRowLeftSide}>
              <Pressable
                style={styles.closeExerciseModal}
                onPress={() => {
                  setSelectedExercises([]);
                  setAddExerciseModal(!addExerciseModal);
                }}
              >
                <Ionicons name="close-outline" color={"white"} size={40} />
              </Pressable>
            </View>
            <View style={styles.topRowRightSide}>
              {/* // add Exercise button */}
              <Pressable
                onPress={() => {
                  setWorkoutExercises(selectedExercises),
                    setAddExerciseModal(!addExerciseModal);
                }}
              >
                <Text style={styles.textStyle}>Add</Text>
              </Pressable>
            </View>
          </View>
          <View style={styles.searchBarRow}>
            <TextInput
              editable
              maxLength={50}
              placeholder={"Search for exercise..."}
              style={{
                padding: 10,
                backgroundColor: "#D3D3D3",
                fontWeight: "bold",
              }}
              onChangeText={(newText) => setSearchBarInput(newText)}
            />
          </View>
          <View style={styles.muscleOrEquipmentDropdownRow}>
            <View style={{ width: "50%", paddingRight: 5 }}>
              <DropDownPicker
                style={{
                  ...(muscleValue
                    ? styles.selectedExerciseOrEquipment
                    : styles.noSelectedExerciseOrEquipment),
                }}
                open={muscleOpen}
                value={muscleValue}
                items={muscles}
                setOpen={setMuscleOpen}
                setValue={setMuscleValue}
                textStyle={{
                  color: "#61FF7E",
                }}
                labelStyle={{
                  fontWeight: "bold",
                }}
                dropDownContainerStyle={{
                  backgroundColor: "#011638",
                  maxHeight: 500,
                  borderColor: "white",
                }}
              />
            </View>
            <View style={{ width: "50%", marginRight: 5 }}>
              <DropDownPicker
                style={{
                  // zIndex: 1000,
                  ...(equipmentValue
                    ? styles.selectedExerciseOrEquipment
                    : styles.noSelectedExerciseOrEquipment),
                }}
                open={equipmentOpen}
                value={equipmentValue}
                items={equipment}
                setOpen={setEquipmentOpen}
                setValue={setEquipmentValue}
                textStyle={{
                  color: "#61FF7E",
                }}
                labelStyle={{
                  fontWeight: "bold",
                }}
                dropDownContainerStyle={{
                  backgroundColor: "#011638",
                  maxHeight: 500,
                  borderColor: "white",
                }}
                selectedItemContainerStyle={{
                  backgroundColor: "black",
                }}
                // listItemLabelStyle={{
                //     color: "red"
                // }}
              />
            </View>
          </View>
          <View style={styles.listOfExercises}>
            <FlatList
              // style={{ marginTop: 50, borderRadius: 10 }}
              data={filterExerciseList}
              renderItem={({ item }) => (
                <Item name={item.name} handleItemPress={handleItemPress} />
              )}
              keyExtractor={(item) => item.name}
              // ListHeaderComponent={<ListHeader />}
              // ListHeaderComponentStyle={{ backgroundColor: '#011638' }}
              // ListFooterComponent={<ModalComponent />}
              ItemSeparatorComponent={<Separator />}
              ListEmptyComponent={() => (
                <View>
                  {filterExerciseList.length === 0 ? (
                    <Text
                      style={{
                        fontSize: 18,
                        color: "#61FF7E",
                        textAlign: "center",
                        marginBottom: 350,
                      }}
                    >
                      No exercise matches your search criteria.
                    </Text>
                  ) : null}
                </View>
              )}
            />
          </View>
        </View>
      </View>
    </Modal>
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
  },
  topRow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
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
  textStyle: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    // textAlign: "center",
    // width: 10
    // flex: 1,
    // margin: 10
  },
});

export default AddExerciseModal;