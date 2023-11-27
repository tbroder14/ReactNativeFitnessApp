import { useEffect, useState, useMemo, useIsFocused } from "react";
import { Text, View, StyleSheet, Pressable, FlatList, TextInput, TouchableOpacity } from "react-native";
import { useStore } from "../src/store.js";
import { baseExerciseList } from "./data.js";
import DropDownPicker from "react-native-dropdown-picker";
import { helperFunctions } from "../functions/helperFunctions.js";
import ExerciseModalForExercisePage from "./ExerciseModalForExercisePage.js";
import CreateNewExerciseModal from "./CreateNewExerciseModal.js";
import { useShallow } from 'zustand/react/shallow'
import { constSelector } from "recoil";
import { useNavigation } from '@react-navigation/native';


//             to do list
// figure out how to unselect muscle and/or equipment dropdown selections

//             feature roadmap
// add body outline with muscles and display exercises for selected muscle group (modal?)

const ExercisePage = () => {

  // // console.log(navigation)

  // useEffect(() => {
  //   if (navigation) {
  //     console.log('inside navigation')
  //     const updateComingFrom = navigation.addListener('tabPress', (e) => {
  //       e.preventDefault();
  //       toggleComingFromExercisePage(true);
  //       toggleComingFromStartEmptyWorkout(false);
  //       console.log(e);
  //     });
  //     console.log('updateComingFrom: ', updateComingFrom)
  //     return updateComingFrom;
  //   }
  // }, [navigation]);

  // for exercise modal
  const [exerciseModal, setExerciseModal] = useState(false);
  const [exerciseNameForModal, setExerciseNameForModal] = useState(undefined);

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

  // fix this
  // const [masterExerciseList, setMasterExerciseList] = useState([]);


  // global states
  const comingFromStartEmptyWorkout = useStore((state) => state.comingFromStartEmptyWorkout);
  const toggleComingFromStartEmptyWorkout = useStore((state) => state.toggleComingFromStartEmptyWorkout);
  const comingFromExercisePage = useStore((state) => state.comingFromExercisePage);
  const toggleComingFromExercisePage = useStore((state) => state.toggleComingFromExercisePage);
  const comingFromNewTemplate = useStore((state) => state.comingFromNewTemplate);
  const toggleComingFromNewTemplate = useStore((state) => state.toggleComingFromNewTemplate);
  const toggleCreateNewExerciseModal = useStore((state) => state.toggleCreateNewExerciseModal)
  const openCreateNewExerciseModal = useStore((state) => state.openCreateNewExerciseModal);

  const masterExerciseList = useStore((state) => state.masterExerciseList);
  const memoizedExerciseList = useMemo(() => masterExerciseList, [masterExerciseList]);


  const initializeMasterExerciseList = useStore(useShallow((state) => state.initializeMasterExerciseList));

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


  // useEffect(() => {
  //   async function fetchData() {
  //     await initializeMasterExerciseList();
  //   }
  //   fetchData();
  // }, []);


  // useEffect(() => {
  //   setFilterExerciseList(memoizedExerciseList);
  //   console.log('memoizedExerciseList from ExercisePage', memoizedExerciseList)

  // }, [memoizedExerciseList]);

  // const { masterExerciseList } = useStore(); // Access the masterExerciseList from the store

  // useEffect(() => {
  //   async function fetchMasterExerciseList() {
  //     // initializeMasterExerciseList()
  //     const list = masterExerciseList;
  //     console.log(list)
  //     setFilterExerciseList(list);
  //   }
  //   fetchMasterExerciseList();
  // }, [initializeMasterExerciseList]);

  // useEffect(() => {
  //   async function fetchData() {
  //     await initializeMasterExerciseList()
  //     setFilterExerciseList(masterExerciseList)
  //   }
  //   fetchData()
  // }, []);

  // console.log('masterExerciseList in ExercisePage: ', masterExerciseList)

  // useEffect(() => {
  //   // Fetch and set the masterExerciseList on component mount
  //   async function fetchMasterExerciseList() {
  //     const list = await masterExerciseList
  //     // const list = await initializeMasterExerciseList();
  //     console.log('list: ', list)
  //     setFilterExerciseList(list);
  //   }
  //   fetchMasterExerciseList();
  // }, [initializeMasterExerciseList]);

  // useEffect(() => {
  //   console.log(masterExerciseList)
  //   // setFilterExerciseList(masterExerciseList)
  //   // await masterExerciseList
  // }, [masterExerciseList]);

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
    let filteredList = [...memoizedExerciseList];

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

  if (comingFromStartEmptyWorkout) {
    // useEffect for selectedExercises? 
    // 
  }

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

  const Item = ({ item, handleItemPress }) => (
    <TouchableOpacity onPress={() => handleItemPress(item)}>
      <View
        style={styles.exerciseIsNotSelected}
      >
        <Text style={styles.exerciseTitle}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  const handleItemPress = (item) => {
    // console.log('comingFromExercisePage', comingFromExercisePage)
    // console.log('comingFromStartEmptyWorkout', comingFromStartEmptyWorkout)
    if (comingFromExercisePage) {
      setExerciseNameForModal(item.name);
      setExerciseModal(true);
    } else if (comingFromStartEmptyWorkout) {
      const exerciseName = item.name;
      console.log(exerciseName);
      if (selectedExercises.some((exercise) => exercise.name === item.name)) {
        const arrayWithoutExercise = selectedExercises.filter((exercise) => {
          return exerciseName !== exercise.name;
        });
        setSelectedExercises(arrayWithoutExercise);
      } else {
        setSelectedExercises([...selectedExercises, item]);
      }
    }
  };

  const Separator = () => (
    <View style={{ height: 1, width: "100%", backgroundColor: "white" }}></View>
  );

  const ListHeader = () => {
    return (
      <View>
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
          onPress={() => { openCreateNewExerciseModal(), toggleComingFromExercisePage(true) }}
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
      <FlatList
        style={{ marginTop: 10, borderRadius: 10 }}
        data={filterExerciseList}
        stickyHeaderIndices={[0]}
        renderItem={({ item }) => (
          <Item
            item={item}
            handleItemPress={() => handleItemPress(item)}
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
                  paddingTop: 15
                }}
              >
                No exercise matches your search criteria.
              </Text>
            ) : null}
          </View>
        )}
      />
      {/* <ListOfExercises
        exerciseModal={exerciseModal}
        setExerciseModal={setExerciseModal}
        exerciseNameForModal={exerciseNameForModal}
        setExerciseNameForModal={setExerciseNameForModal}
        workoutExercises={workoutExercises}
      /> */}
      <ExerciseModalForExercisePage
        exerciseModal={exerciseModal}
        setExerciseModal={setExerciseModal}
        exerciseNameForModal={exerciseNameForModal}
        setExerciseNameForModal={setExerciseNameForModal}
      />
      <CreateNewExerciseModal
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
