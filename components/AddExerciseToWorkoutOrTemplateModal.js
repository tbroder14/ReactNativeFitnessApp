import { useState, useEffect } from "react";
import { Text, View, StyleSheet, Pressable, FlatList, TextInput, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useStore } from "../src/store.js";
import CreateNewExerciseModal from "./CreateNewExerciseModal.js";
import { baseExerciseList } from "./data.js";
import { helperFunctions } from "../functions/helperFunctions.js";
import DropDownPicker from "react-native-dropdown-picker";

//             to do list
//

//             feature roadmap
// asdf

const AddExerciseToWorkoutOrTemplateModal = ({
  workoutExercises,
  setWorkoutExercises,
  addExerciseModal,
  setAddExerciseModal,
  templateExercises,
  setTemplateExercises,
  templateData,
  setTemplateData
}) => {

  // for tracking of exercise selection between app.js and AddExerciseModal

  const [selectedExercises, setSelectedExercises] = useState(workoutExercises);

  // console.log('setTemplateExercises in AddExercise...Modal', templateExercises)

  useEffect(() => {
    setSelectedExercises(workoutExercises)
    // console.log('selected exercises', selectedExercises)
  }, [workoutExercises])

  // for react-native-dropdown-picker
  const [muscleValue, setMuscleValue] = useState(null);
  const [equipmentValue, setEquipmentValue] = useState(null);
  const [muscleOpen, setMuscleOpen] = useState(false);
  const [equipmentOpen, setEquipmentOpen] = useState(false);

  // displaying sorted list of exercises
  const [searchBarInput, setSearchBarInput] = useState("");
  const [muscleSort, setMuscleSort] = useState(null);
  const [equipmentSort, setEquipmentSort] = useState(null);

  const [filterExerciseList, setFilterExerciseList] = useState([]);
  // const [masterExerciseList, setMasterExerciseList] = useState([])

  // fix this
  const [masterExerciseList, setMasterExerciseList] = useState([]);

  // global states
  const comingFromStartEmptyWorkout = useStore((state) => state.comingFromStartEmptyWorkout);
  const toggleComingFromStartEmptyWorkout = useStore((state) => state.toggleComingFromStartEmptyWorkout);

  const comingFromNewTemplate = useStore((state) => state.comingFromNewTemplate);

  const comingFromReplaceExercise = useStore((state) => state.comingFromReplaceExercise);

  const comingFromStartEmptyWorkoutOrNewTemplateOrReplaceExercise = useStore((state) => state.comingFromStartEmptyWorkoutOrNewTemplateOrReplaceExercise);
  const toggleComingFromStartEmptyWorkoutOrNewTemplateOrReplaceExercise = useStore((state) => state.toggleComingFromStartEmptyWorkoutOrNewTemplateOrReplaceExercise);

  const toggleCreateNewExerciseModal = useStore((state) => state.toggleCreateNewExerciseModal)
  const openCreateNewExerciseModal = useStore((state) => state.openCreateNewExerciseModal);

  useEffect(() => {
    async function fetchData() {
      try {
        const totalExerciseList = await helperFunctions.completeExerciseList();
        // console.log('totalExerciseList', totalExerciseList)
        setFilterExerciseList(totalExerciseList);
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, []);

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
    let filteredList = masterExerciseList;

    // this is just for testing
    if (muscleValue == "clear") {
      setFilterExerciseList();
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
  }, [equipmentValue, muscleValue, searchBarInput, baseExerciseList]);

  // this is the logic for adding exercises to start empty workout from the add exercise to workout modal
  // const handleItemPress = (item) => {
  //     const exerciseName = item.name

  //     if (selectedExercises.some(exercise => exercise.name === item.name)) {
  //         const arrayWithoutExercise = selectedExercises.filter(exercise => {
  //             return exerciseName !== exercise.name
  //         })
  //         setSelectedExercises(arrayWithoutExercise)
  //     }
  //     else {
  //         setSelectedExercises([...selectedExercises, item]);
  //     }
  // };

  // const Item = ({ name, handleItemPress }) => (
  //     <TouchableOpacity onPress={() => handleItemPress(name)}>
  //         <View style={styles.item}>
  //             <Text style={styles.title}>{name}</Text>
  //         </View>
  //     </TouchableOpacity>
  // );

  const Item = ({ item, handleItemPress, isSelected }) => (
    <TouchableOpacity onPress={() => handleItemPress(item)}>
      <View
        style={
          isSelected ? styles.exerciseIsSelected : styles.exerciseIsNotSelected
        }
      >
        <Text style={styles.exerciseTitle}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  const handleItemPress = (item) => {
    // console.log('comingFromExercisePage', comingFromExercisePage)
    // console.log('comingFromStartEmptyWorkout', comingFromStartEmptyWorkout)
    // console.log('selectedExercise in handleItemPress', selectedExercises)
    if (comingFromStartEmptyWorkout || comingFromNewTemplate) {
      console.log(item)
      const exerciseName = item.name;
      // console.log(exerciseName);
      if (selectedExercises.some((exercise) => exercise.name === item.name)) {
        const arrayWithoutExercise = selectedExercises.filter((exercise) => {
          return exerciseName !== exercise.name;
        });
        setSelectedExercises(arrayWithoutExercise);
      } else {
        setSelectedExercises([...selectedExercises, item]);
      }
    } else if (comingFromReplaceExercise) {

    }
  };

  const Separator = () => (
    <View style={{ height: 1, width: "100%", backgroundColor: "white" }}></View>
  );

  const ListHeader = () => {
    return (
      <View style={[styles.container]}>
        <View style={styles.searchBarRow}>
          <TextInput
            editable
            maxLength={50}
            placeholder={"Search for exercise..."}
            style={{
              padding: 10,
              backgroundColor: "#D3D3D3",
              fontWeight: "bold",
              borderRadius: 5,
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
            />
          </View>
        </View>
      </View>
    );
  };

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
                  setAddExerciseModal(false)
                }}
              >
                <Ionicons name="close-outline" color={"white"} size={35} />
              </Pressable>
              <Pressable
                style={{
                  paddingTop: 10,
                  paddingLeft: 8,
                }}
                onPress={() => {
                  // toggleComingFromStartEmptyWorkoutOrNewTemplateOrReplaceExercise(true)
                  setAddExerciseModal(false)
                  toggleComingFromStartEmptyWorkout(true)
                  setTimeout(openCreateNewExerciseModal, '350')
                }}
              >
                <Text style={styles.textStyle}>New</Text>
              </Pressable>
            </View>
            <View style={styles.topRowRightSide}>
              {/* // add Exercise button */}
              <Pressable
                onPress={() => {
                  if (comingFromStartEmptyWorkout) {
                    setWorkoutExercises(selectedExercises);
                  } else if (comingFromNewTemplate) {
                    console.log('comingFromNewTemplate from Add in AddExercise...Modal')
                    setTemplateExercises(selectedExercises)
                  }
                  setAddExerciseModal(false)
                }}
              >
                <Text style={styles.textStyle}>Add</Text>
              </Pressable>
            </View>
          </View>
          <FlatList
            style={{ marginTop: 10, borderRadius: 10 }}
            data={filterExerciseList}
            stickyHeaderIndices={[0]}
            renderItem={({ item }) => (
              <Item
                item={item}
                handleItemPress={() => handleItemPress(item)}
                isSelected={selectedExercises.some((exercise) => exercise.name === item.name)}
              />
            )}
            keyExtractor={(item) => item.name}
            ListHeaderComponent={<ListHeader />}
            ListHeaderComponentStyle={{ backgroundColor: "#011638" }}
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
          {/* <CreateNewExerciseModal
            addExerciseModal={addExerciseModal}
            setAddExerciseModal={setAddExerciseModal}
            createNewExerciseModal={createNewExerciseModal}
            setCreateNewExerciseModal={setCreateNewExerciseModal}
          /> */}
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
  },
  topRowLeftSide: {
    flexDirection: "row",
  },
  topRowRightSide: {
    margin: 10,
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
  exerciseTitle: {
    fontSize: 16,
    color: "white",
  },
  listOfExercises: {
    flex: 14,
    marginTop: 10,
    marginBottom: 10,
  },
  searchBarRow: {
    flex: 1,
    marginRight: 8,
    marginLeft: 8,
    paddingBottom: 10,
  },
  muscleOrEquipmentDropdownRow: {
    flex: 1,
    flexDirection: "row",
    marginLeft: 8,
    marginRight: 8,
    zIndex: 1,
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

export default AddExerciseToWorkoutOrTemplateModal;
