import { useState, useEffect } from "react";
import { Text, View, StyleSheet, TextInput, FlatList, Pressable, TouchableOpacity } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { baseExerciseList } from "./data.js";
import Modal from "react-native-modal";
import CreateNewExerciseModal from "./CreateNewExerciseModal.js";
import AsyncStorage from '@react-native-async-storage/async-storage';
import ExerciseModal from "./ExerciseModal.js"

//             to do list
// figure out how to unselect muscle and/or equipment dropdown selections
// button to add new exercise
// format the exercise modal

//             feature roadmap
// add body outline with muscles and display exercises for selected muscle group (modal?)

const ExercisePage = () => {
  // for react-native-dropdown-picker
  const [muscleValue, setMuscleValue] = useState(null);
  const [equipmentValue, setEquipmentValue] = useState(null);
  const [muscleOpen, setMuscleOpen] = useState(false);
  const [equipmentOpen, setEquipmentOpen] = useState(false);

  // brings up modal to create new exercise
  const [createNewExercise, setCreateNewExercise] = useState(false)

  // displaying sorted list of exercises
  const [searchBarInput, setSearchBarInput] = useState("");
  const [muscleSort, setMuscleSort] = useState(null);
  const [equipmentSort, setEquipmentSort] = useState(null);
  const [filterExerciseList, setFilterExerciseList] = useState([]);
  const [masterExerciseList, setMasterExerciseList] = useState([])

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
    let filteredList = masterExerciseList;

    // this is just for testing
    if (muscleValue == "clear") {
      setFilterExerciseList(completeExerciseList);
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

  useEffect(() => {
    completeExerciseList()
  }, [])

  const completeExerciseList = async () => {
    try {
      const oldData = await AsyncStorage.getItem('userAddedExerciseList')
      const parsedOldData = JSON.parse(oldData)
      if (oldData === null) {
        setFilterExerciseList(baseExerciseList)

      } else {
        // console.log('parsedOldData:', parsedOldData)
        const combinedArrays = parsedOldData.concat(baseExerciseList)
        const sortedCombinedArrays = combinedArrays.sort((a, b) => a.name.localeCompare(b.name))
        setMasterExerciseList(sortedCombinedArrays)
        setFilterExerciseList(sortedCombinedArrays)
      }
    } catch (e) {
      // saving error
      console.log(e)
    }
  };

  function handleItemPress(itemName) {
    setExerciseNameForModal(itemName);
    setExerciseModal(true);
  };

  const Item = ({ name, handleItemPress }) => (
    <TouchableOpacity onPress={() => handleItemPress(name)}>
      <View style={styles.item}>
        <Text style={styles.title}>{name}</Text>
      </View>
    </TouchableOpacity>
  );

  const Separator = () => (
    <View style={{ height: 1, width: "100%", backgroundColor: "white" }}></View>
  );

  const ListHeader = () => {
    return (
      <View style={[styles.container]}>
        <View style={{ marginBottom: 15, flexDirection: 'row', gap: 20 }}>
          <Pressable style={{
            borderRadius: 10,
            borderWidth: 2,
            borderColor: 'white',
            padding: 10,
            marginLeft: 20
          }}
            onPress={() => setCreateNewExercise(true)}>
            <Text style={{
              color: "#D3D3D3",
              fontSize: 14,
            }}>Add</Text>
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
        <View style={{ paddingLeft: 20, paddingRight: 20 }}>
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
        <View style={{ padding: 20, flex: 1, flexDirection: "row" }}>
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
          <View style={{ width: "50%" }}>
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
          <CreateNewExerciseModal createNewExercise={createNewExercise} setCreateNewExercise={setCreateNewExercise} completeExerciseList={completeExerciseList} />
          <ExerciseModal exerciseModal={exerciseModal} setExerciseModal={setExerciseModal} exerciseNameForModal={exerciseNameForModal} setExerciseNameForModal={setExerciseNameForModal} />
        </View>
      </View>
    );
  };


  return (
    <FlatList
      style={{ marginTop: 50, borderRadius: 10 }}
      data={filterExerciseList}
      stickyHeaderIndices={[0]}
      renderItem={({ item }) => <Item name={item.name} handleItemPress={handleItemPress} />}
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
  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
