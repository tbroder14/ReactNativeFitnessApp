import "react-native-gesture-handler";
import React, {
  useCallback,
  useRef,
  useMemo,
  useState,
  useEffect,
  useContext
} from "react";
import {
  Text,
  Animated,
  View,
  StyleSheet,
  Pressable,
  FlatList,
  TextInput,
  TouchableOpacity,
  TextComponent,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { RectButton } from "react-native-gesture-handler";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet from "@gorhom/bottom-sheet";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import DraggableFlatList, {
  ScaleDecorator,
} from "react-native-draggable-flatlist";
import Collapsible from "react-native-collapsible";
// import { LevelContext } from './LevelContext.js';

// state management library
import { useStore } from "./src/store";

// five bottom tabs
import StartWorkoutPage from "./components/StartWorkoutPage";
import HistoryPage from "./components/HistoryPage";
import ProgramPage from "./components/ProgramPage";
import Placeholder from "./components/Placeholder";
import ExercisePage from "./components/ExercisePage";

// components
import ExerciseThreeDotsBottomSheet from "./components/ExerciseThreeDotsBottomSheet";
import CancelWorkoutConfirmationModal from "./components/CancelWorkoutConfirmationModal";
import SaveWorkoutConfirmationModal from "./components/SaveWorkoutConfirmationModal";
import NotAllSetsCompleteAlertModal from "./components/NotAllSetsCompleteAlertModal";
import NewTemplate from "./components/NewTemplate";
import AddExerciseToWorkoutOrTemplateModal from "./components/AddExerciseToWorkoutOrTemplateModal";

//             to do list
// figure out how to create a state for workoutExercises and WorkoutData instead of prop drilling (i.e. use hookstate, redux, context, etc.)
// if someone has selects exercises and tries to create a new exercise, those previously selected exercises are lost 
// save templates to local data
// long press to reorder exercises -> https://github.com/computerjazz/react-native-draggable-flatlist/
// update exercise list from Start Empty Workout to have utilize async storage and update the create New Exercise functionality
// saving new order of collapsible exercises
// three button dropdown/bottom sheet to delete exercise -> complete styling
// format/style sets/text input parts
// finish logic in SaveWorkoutConfirmationModal that checks if all sets are completed when hitting the "Save" button
// remove bottom unused styles and collapse/clean-up inline styles
// refactor code to simplify app.js; possibly move things to single component files
// on Strong app, when you select "Add Exercises", none are selected -> meaning, you could have two more or more of the same exercise in the same workout

//             bugs
// clicking "X" in AddExerciseModal should return exercises to originals and remove changes
// if there are three sets and I delete the second one, the delete slider remains open on the (newly) second set
// when changing workoutName, keyboard stays up
// workoutName edits remain between saving of multiple workouts

//             feature roadmap
// save workoutdata to local storage
// display saved workoutdata on history page
// rest timer
// warmup/dropsets/supersets
// creating templates

function ExerciseScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#011638",
        paddingBottom: 5,
      }}
    >
      <ExercisePage />
    </View>
  );
}

function PlaceholderScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#011638",
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
    >
      <Placeholder />
    </View>
  );
}

function StartWorkoutScreen({
  bottomSheetRef,
  startOfWorkoutDateAndTime,
  setStartOfWorkoutDateAndTime,
  newTemplateBottomSheetRef,
}) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#011638",
        paddingBottom: insets.bottom,
        paddingTop: insets.top,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
    >
      <StartWorkoutPage
        bottomSheetRef={bottomSheetRef}
        startOfWorkoutDateAndTime={startOfWorkoutDateAndTime}
        setStartOfWorkoutDateAndTime={setStartOfWorkoutDateAndTime}
        newTemplateBottomSheetRef={newTemplateBottomSheetRef}
      />
    </View>
  );
}

function HistoryScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#011638",
        paddingTop: insets.top,
        // paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
    >
      <HistoryPage />
    </View>
  );
}

function ProgramScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#011638",
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
    >
      <ProgramPage />
    </View>
  );
}

function BottomSheetFooterComponents({
  setCancelWorkoutConfirmationModal,
  setWorkoutExercises,
  workoutExercises,
  workoutData,
  closeBottomSheet,
  addExerciseModal,
  setAddExerciseModal,
  templateExercises,
  setTemplateExercises,
  templateData,
  setTemplateData
}) {
  const cancelWorkout = () => {
    if (workoutData.length === 0) {
      closeBottomSheet();
    } else {
      setCancelWorkoutConfirmationModal(true);
    }
  };

  // console.log('workoutExercises in BottomSheet', workoutExercises)
  // console.log('workoutData in BottomSheet', workoutData)

  return (
    <View style={{ padding: 20, gap: 25 }}>
      <Pressable
        style={{
          borderRadius: 8,
          backgroundColor: "blue",
          padding: 10,
        }}
        onPress={() => {
          setAddExerciseModal(true);
          setWorkoutExercises(workoutData);
        }}
      >
        <Text style={{ color: "white", fontSize: 18, textAlign: "center" }}>
          Add Exercise
        </Text>
      </Pressable>

      <Pressable
        style={{
          borderRadius: 8,
          backgroundColor: "red",
          padding: 10,
          marginBottom: 100,
        }}
        onPress={() => cancelWorkout()}
      >
        <Text style={{ color: "white", fontSize: 18, textAlign: "center" }}>
          Cancel Workout
        </Text>
      </Pressable>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  const [saveWorkoutConfirmationModal, setSaveWorkoutConfirmationModal] = useState(false);
  const [notAllSetsCompleteAlert, setNotAllSetsCompleteAlert] = useState(false);
  const [cancelWorkoutConfirmationModal, setCancelWorkoutConfirmationModal] = useState(false);
  const [workoutExercises, setWorkoutExercises] = useState([]);
  const [workoutData, setWorkoutData] = useState([]);
  const [exerciseForThreeDotsBS, setExerciseForThreeDotsBS] = useState("");
  const [collapseHandler, setCollapseHandler] = useState(false);
  const [startOfWorkoutDateAndTime, setStartOfWorkoutDateAndTime] = useState("");
  const [addExerciseModal, setAddExerciseModal] = useState(false);
  const [templateExercises, setTemplateExercises] = useState([]);
  const [templateData, setTemplateData] = useState([]);

  // hides bottomSheet
  const [bottomSheetBottomInset, setBottomSheetBottomInset] = useState(0);

  // global states from store
  const comingFromStartEmptyWorkout = useStore(
    (state) => state.comingFromStartEmptyWorkout
  );
  const toggleComingFromStartEmptyWorkout = useStore(
    (state) => state.toggleComingFromStartEmptyWorkout
  );
  const comingFromExercisePage = useStore(
    (state) => state.comingFromExercisePage
  );
  const toggleComingFromExercisePage = useStore(
    (state) => state.toggleComingFromExercisePage
  );

  // workout name useState
  const startOfWorkoutTime = new Date().getHours();
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();
  const dateWithoutTime = new Date(year, month - 1, day);
  // const Date(year, month, day, hours, minutes, seconds)
  let currentTemplate = null;
  let currentWorkoutName = "";

  if (currentTemplate === null) {
    if (startOfWorkoutTime >= 21 || startOfWorkoutTime <= 4) {
      currentWorkoutName = "Night Workout";
    } else if (startOfWorkoutTime >= 5 && startOfWorkoutTime <= 7) {
      currentWorkoutName = "Early Morning Workout";
    } else if (startOfWorkoutTime >= 8 && startOfWorkoutTime <= 10) {
      currentWorkoutName = "Morning Workout";
    } else if (startOfWorkoutTime >= 11 && startOfWorkoutTime <= 13) {
      currentWorkoutName = "Mid-day Workout";
    } else if (startOfWorkoutTime >= 14 && startOfWorkoutTime <= 16) {
      currentWorkoutName = "Afternoon Workout";
    } else if (startOfWorkoutTime >= 17 && startOfWorkoutTime <= 20) {
      currentWorkoutName = "Evening Workout";
    }
  } else {
    currentWorkoutName = currentTemplate.name;
  }
  const [workoutName, onChangeWorkoutName] = useState(currentWorkoutName);

  const closeBottomSheet = () => {
    bottomSheetRef.current.close();
  };

  useEffect(() => {
    // determines if any exercises in workoutExercise aren't formatted properly
    let newExercise = workoutExercises.filter(
      (exercise) =>
        !workoutData.some((exercise2) => exercise2.name === exercise.name)
    );

    // formats new exercises to proper format with sets
    newExercise.forEach((i) => {
      i.sets = [
        {
          weight: "50",
          reps: "10",
          distance: "0",
          seconds: "0",
          notes: "",
          complete: false,
        },
      ];
    });

    const exerciseToBeRemoved = workoutData.filter(
      (exercise) =>
        !workoutExercises.some((exercise2) => exercise2.name === exercise.name)
    );
    const filteredWorkoutData = workoutData.filter(
      (exercise) =>
        !exerciseToBeRemoved.some(
          (exercise2) => exercise2.name === exercise.name
        )
    );
    const updatedWorkoutData = [...filteredWorkoutData, ...newExercise];
    setWorkoutData(updatedWorkoutData);
  }, [workoutExercises]);

  // ref
  const bottomSheetRef = useRef(null);
  const threeDotsBottomSheetRef = useRef(null);
  const newTemplateBottomSheetRef = useRef(null);

  // snap point variables
  const snapPoints = useMemo(() => ["15%", "94%"], []);

  // callbacks
  const handleSheetChanges = (index) => {
    console.log(index);
    if (index === 0) {
      setBottomSheetBottomInset(80);
    } else if (index === -1) {
      setBottomSheetBottomInset(0);
      toggleComingFromStartEmptyWorkout(false);
    } else {
      toggleComingFromStartEmptyWorkout(true);
      toggleComingFromExercisePage(false);
      setBottomSheetBottomInset(0);
    }
  };

  // adds a new set to an exercise
  const addSet = (exerciseName) => {
    copyOfWorkoutData = workoutData.map((i) => {
      if (exerciseName === i.name) {
        const newSet = {
          weight: "50",
          reps: "8",
          distance: "0",
          seconds: "0",
          notes: "",
          complete: false,
        };

        const newObj = {
          equipment: i.equipment,
          muscle: i.muscle,
          name: i.name,
          sets: [...i.sets, newSet],
        };
        return newObj;
      } else {
        return i;
      }
    });

    setWorkoutData(copyOfWorkoutData);
  };

  const handleCheckboxChange = (exercise, index) => {
    const exerciseName = exercise.name;
    const setIndex = index;
    const copyOfWorkoutData = [...workoutData];

    const updatedData = copyOfWorkoutData.map((e) => {
      if (exerciseName === e.name) {
        const updatedSets = e.sets.map((set, index) => {
          if (index === setIndex) {
            return { ...set, complete: !e.sets[setIndex].complete };
          }
          return set;
        });
        return {
          ...e,
          sets: updatedSets,
        };
      }
      return e;
    });
    // is possibly delayed by one checkmark?
    setWorkoutData(updatedData);
  };

  const Separator = () => (
    <View style={{ paddingLeft: 10, paddingRight: 10, marginBottom: 10 }}>
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "white",
        }}
      ></View>
    </View>
  );

  // swipeable functionality to delete one set in an exercise
  const renderRightActions = (progress, dragX) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0],
    });

    const pressHandler = () => { };

    return (
      <Animated.View style={{ flex: 1, transform: [{ translateX: trans }] }}>
        <RectButton
          style={{
            alignItems: "center",
            flex: 1,
            justifyContent: "center",
            alignItems: "flex-end",
            backgroundColor: "red",
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 16,
              backgroundColor: "transparent",
              padding: 10,
            }}
          >
            Delete
          </Text>
        </RectButton>
      </Animated.View>
    );
  };

  // this will delete a set after a swipeable action
  const removeThis = (item, sets, index) => {
    const setIndex = index;
    const exerciseName = item.name;
    const copyOfWorkoutData = [...workoutData];

    copyOfWorkoutData.forEach((i) => {
      if (i.name === exerciseName) {
        i.sets.forEach((j, index) => {
          if (index === setIndex) {
            i.sets.splice(setIndex, 1);
          }
        });
      }
    });

    setWorkoutData(copyOfWorkoutData);
  };

  // this brings up a bottom sheet with options for a specific exercise
  const exerciseThreeDotsOptions = () => {
    threeDotsBottomSheetRef.current.snapToIndex(0);
  };

  // this deletes an exercise from workoutData from ExerciseThreeDotsBottomSheet
  function deleteExerciseFunction(exerciseName) {
    const newArrayWithoutExercise = workoutData.filter(function (i) {
      return i.name !== exerciseName;
    });

    setWorkoutData(newArrayWithoutExercise);
    setWorkoutExercises(newArrayWithoutExercise);
    setExerciseForThreeDotsBS("");
    threeDotsBottomSheetRef.current.forceClose();
  }

  function makeMovable() {
    console.log("long press registered");
  }

  // const renderDraggableItem = ({ item, drag, isActive }) => {
  //   return (
  //     <ScaleDecorator>
  //       <TouchableOpacity
  //         onLongPress={drag}
  //         disabled={isActive}
  //         style={{ backgroundColor: isActive ? "red" : "green", padding: 25 }}
  //       >
  //         <Text>{item.name}</Text>
  //       </TouchableOpacity>
  //     </ScaleDecorator>
  //   );
  // };

  const saveWorkout = () => {
    const areAllSetsComplete = workoutData.every((exercise) =>
      exercise.sets.every((set) => set.complete === true)
    );

    console.log("areAllSetsComplete", areAllSetsComplete);

    if (areAllSetsComplete) {
      console.log("all sets are complete");
      setSaveWorkoutConfirmationModal(true);
    } else {
      console.log("not all sets are complete");
      setNotAllSetsCompleteAlert(true);
    }
  };

  // Flatlist data items structure/functionality and style
  const draggableItem = ({ item, drag, isActive }) => {
    function onChangeWeight(weight, index, item) {
      const exerciseName = item.name;
      const setIndex = index;
      const copyOfWorkoutData = [...workoutData];

      const updatedData = copyOfWorkoutData.map((i) => {
        if (exerciseName === i.name) {
          const updatedSets = i.sets.map((set, index) => {
            if (index === setIndex) {
              return { ...set, weight: weight };
            }
            return set;
          });
          return {
            ...i,
            sets: updatedSets,
          };
        }
        return i;
      });

      setWorkoutData(updatedData);
    }

    function onChangeReps(reps, index, item) {
      const exerciseName = item.name;
      const setIndex = index;
      const copyOfWorkoutData = [...workoutData];

      const updatedData = copyOfWorkoutData.map((i) => {
        if (exerciseName === i.name) {
          const updatedSets = i.sets.map((set, index) => {
            if (index === setIndex) {
              return { ...set, reps: reps };
            }
            return set;
          });
          return {
            ...i,
            sets: updatedSets,
          };
        }
        return i;
      });

      setWorkoutData(updatedData);
    }

    // const collapseHandlerFunction = () => {
    //   drag
    //   setCollapseHandler(true)
    // }

    const updateWorkoutDataAfterDragEnd = (workoutData) => {
      console.log(workoutData);
    };

    return (
      <ScaleDecorator>
        <View style={{ paddingBottom: 20, backgroundColor: "#011638" }}>
          <View
            style={{
              paddingRight: 20,
              paddingLeft: 20,
              marginBottom: 20,
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              onLongPress={() => {
                setCollapseHandler(true);
                setTimeout(() => {
                  drag();
                }, 300);
              }}
              disabled={isActive}
            >
              <Text style={styles.exerciseTitle}>{item.name}</Text>
            </TouchableOpacity>
            <Pressable
              onPress={() => {
                exerciseThreeDotsOptions(item),
                  setExerciseForThreeDotsBS(item.name);
              }}
            >
              <Ionicons
                name="ellipsis-horizontal-outline"
                size={30}
                color={"white"}
              />
            </Pressable>
          </View>
          <Collapsible collapsed={collapseHandler}>
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                paddingLeft: 20,
                paddingRight: 20,
                marginBottom: 10,
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontWeight: "bold",
                  width: "10%",
                  textAlign: "center",
                  fontSize: 16,
                }}
              >
                Set
              </Text>
              <Text
                style={{
                  color: "white",
                  fontWeight: "bold",
                  width: "35%",
                  textAlign: "center",
                  fontSize: 16,
                }}
              >
                Previous
              </Text>
              <Text
                style={{
                  color: "white",
                  fontWeight: "bold",
                  width: "22.5%",
                  textAlign: "center",
                  fontSize: 16,
                }}
              >
                +lbs
              </Text>
              <Text
                style={{
                  color: "white",
                  fontWeight: "bold",
                  width: "22.5%",
                  textAlign: "center",
                  fontSize: 16,
                }}
              >
                Reps
              </Text>
              <Text
                style={{
                  color: "white",
                  fontWeight: "bold",
                  width: "10%",
                  fontSize: 16,
                  textAlign: "right",
                }}
              >
                CM
              </Text>
            </View>
            {item.sets?.map((sets, index) => (
              <Swipeable
                renderRightActions={renderRightActions}
                onSwipeableWillOpen={() => removeThis(item, sets, index)}
                rightThreshold={250}
                style={{
                  backgroundColor: "#011638",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    width: "100%",
                    paddingLeft: 20,
                    paddingRight: 20,
                    backgroundColor: sets.complete ? "green" : "#011638",
                    paddingTop: 8,
                    paddingBottom: 8,
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={[
                      styles.setColumn,
                      sets.complete
                        ? { color: "white" }
                        : styles.setColumnSetNotComplete,
                    ]}
                  >
                    {index + 1}
                  </Text>
                  <Text
                    style={{
                      color: "white",
                      fontWeight: "bold",
                      width: "35%",
                      textAlign: "center",
                    }}
                  >
                    60x8
                  </Text>
                  <TextInput
                    style={[
                      styles.weightColumn,
                      sets.complete
                        ? { color: "white" }
                        : styles.weightColumnSetNotComplete,
                    ]}
                    onChangeText={(weight) =>
                      onChangeWeight(weight, index, item)
                    }
                    value={sets.weight}
                    placeholder={sets.weight}
                    keyboardType="numeric"
                    maxLength={999}
                  />
                  <TextInput
                    style={[
                      styles.repsColumn,
                      sets.complete
                        ? { color: "white" }
                        : styles.repsColumnSetNotComplete,
                    ]}
                    onChangeText={(reps) => onChangeReps(reps, index, item)}
                    value={sets.reps}
                    placeholder={sets.reps}
                    keyboardType="numeric"
                  />
                  <BouncyCheckbox
                    style={styles.bouncyCheckmark}
                    isChecked={sets.complete}
                    disableText={true}
                    onPress={() => handleCheckboxChange(item, index)}
                    innerIconStyle={{
                      borderRadius: 4,
                      borderWidth: 2,
                    }}
                    iconStyle={{
                      borderRadius: 6,
                    }}
                    unfillColor="white"
                    fillColor="#61FF7E"

                  // text="Custom Checkbox"
                  // iconStyle={{ borderColor: "red" }}
                  // innerIconStyle={{ borderWidth: 2 }}
                  // textStyle={{ fontFamily: "JosefinSans-Regular" }}
                  />
                </View>
              </Swipeable>
            ))}
            <Pressable
              style={{
                margin: 10,
                paddingLeft: 160,
                paddingRight: 50,
                paddingTop: 13,
                paddingBottom: 13,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: "#61FF7E",
                backgroundColor: "#61FF7E",
              }}
              onPress={() => addSet(item.name)}
            >
              <Text style={{ color: "#011638", fontWeight: "bold" }}>
                Add Set
              </Text>
            </Pressable>
          </Collapsible>
        </View>
      </ScaleDecorator>
    );
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Tab.Navigator
            initialRouteName="Start Workout"
            screenOptions={({ route }) => ({
              headerShown: false,
              tabBarStyle: {
                backgroundColor: "#011638",
              },
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                switch (route.name) {
                  case "Program":
                    iconName = "clipboard";
                    break;
                  case "History":
                    iconName = "bar-chart";
                    break;
                  case "Start Workout":
                    iconName = "add-outline";
                    size = 40;
                    break;
                  case "Exercise":
                    iconName = "barbell-sharp";
                    break;
                  case "Placeholder":
                    iconName = "fitness";
                    break;
                  default:
                    iconName = "barbell-sharp";
                    break;
                }
                // You can return any component that you like here!
                return <Ionicons name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: "#61FF7E",
              tabBarInactiveTintColor: "#D3D3D3",
            })}
          >
            <Tab.Screen name="Program" component={ProgramScreen} />
            <Tab.Screen name="History" component={HistoryScreen} />
            <Tab.Screen
              name="Start Workout"
              children={() => (
                <StartWorkoutScreen
                  bottomSheetRef={bottomSheetRef}
                  startOfWorkoutDateAndTime={startOfWorkoutDateAndTime}
                  setStartOfWorkoutDateAndTime={setStartOfWorkoutDateAndTime}
                  newTemplateBottomSheetRef={newTemplateBottomSheetRef}
                />
              )}
            />
            <Tab.Screen
              name="Exercise"
              // component={ExerciseScreen}
              listeners={{
                tabPress: (e) => {
                  console.log("inside tab press");
                  toggleComingFromExercisePage(true);
                  toggleComingFromStartEmptyWorkout(false);
                },
              }}
              children={() => <ExerciseScreen />}
            />
            <Tab.Screen name="Placeholder" component={PlaceholderScreen} />
          </Tab.Navigator>
        </NavigationContainer>
        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          index={-1}
          bottomInset={bottomSheetBottomInset}
          backgroundStyle={{ backgroundColor: "#011638" }}
          style={{
            elevation: 5,
          }}
          handleIndicatorStyle={{ backgroundColor: "white" }}
        >
          <View
            style={{
              flexDirection: "row",
              gap: 15,
              justifyContent: "center",
              alignItems: "center",
              paddingTop: 10,
              paddingLeft: 20,
              paddingRight: 20,
              marginBottom: 20,
            }}
          >
            <Text style={{ fontSize: 15, color: "white", textAlign: "center" }}>
              Workout {"\n"} Name
            </Text>
            <TextInput
              style={{
                fontSize: 18,
                color: "white",
                borderColor: "white",
                borderRadius: 10,
                borderWidth: 2,
                paddingTop: 15,
                paddingBottom: 15,
                paddingRight: 15,
                paddingLeft: 15,
                flex: 1,
                textAlign: "center",
              }}
              value={workoutName}
              onChange={onChangeWorkoutName}
              placeholder={currentWorkoutName}
            />
            <Pressable
              style={{ borderColor: "white", borderRadius: 10, borderWidth: 2 }}
              onPress={(workoutData) => saveWorkout(workoutData)}
            >
              <Text style={{ color: "white", padding: 15 }}>Save</Text>
            </Pressable>
          </View>
          <DraggableFlatList
            data={workoutData}
            // onDragEnd={updateWorkoutDataAfterDragEnd(workoutData)}
            onDragEnd={() => setCollapseHandler(false)}
            keyExtractor={(item) => item.name}
            renderItem={draggableItem}
            ItemSeparatorComponent={<Separator />}
            ListFooterComponent={() => (
              <BottomSheetFooterComponents
                bottomSheetRef={bottomSheetRef}
                setWorkoutExercises={setWorkoutExercises}
                workoutExercises={workoutExercises}
                setWorkoutData={setWorkoutData}
                workoutData={workoutData}
                setCancelWorkoutConfirmationModal={
                  setCancelWorkoutConfirmationModal
                }
                closeBottomSheet={closeBottomSheet}
                addExerciseModal={addExerciseModal}
                setAddExerciseModal={setAddExerciseModal}
                templateExercises={templateExercises}
                setTemplateExercises={setTemplateExercises}
                templateData={templateData}
                setTemplateData={setTemplateData}
              />
            )}
          />
        </BottomSheet>
        <SaveWorkoutConfirmationModal
          setSaveWorkoutConfirmationModal={setSaveWorkoutConfirmationModal}
          setWorkoutData={setWorkoutData}
          workoutName={workoutName}
          dateWithoutTime={dateWithoutTime}
          workoutData={workoutData}
          setWorkoutExercises={setWorkoutExercises}
          saveWorkoutConfirmationModal={saveWorkoutConfirmationModal}
          closeBottomSheet={closeBottomSheet}
          onChangeWorkoutName={onChangeWorkoutName}
          currentWorkoutName={currentWorkoutName}
          startOfWorkoutDateAndTime={startOfWorkoutDateAndTime}
          setStartOfWorkoutDateAndTime={setStartOfWorkoutDateAndTime}
        />
        <CancelWorkoutConfirmationModal
          setCancelWorkoutConfirmationModal={setCancelWorkoutConfirmationModal}
          setWorkoutData={setWorkoutData}
          setWorkoutExercises={setWorkoutExercises}
          cancelWorkoutConfirmationModal={cancelWorkoutConfirmationModal}
          closeBottomSheet={closeBottomSheet}
          setStartOfWorkoutDateAndTime={setStartOfWorkoutDateAndTime}
        />
        <NotAllSetsCompleteAlertModal
          notAllSetsCompleteAlert={notAllSetsCompleteAlert}
          setNotAllSetsCompleteAlert={setNotAllSetsCompleteAlert}
        // setSaveWorkoutConfirmationModal={setSaveWorkoutConfirmationModal}
        // setWorkoutData={setWorkoutData}
        // workoutName={workoutName}
        // dateWithoutTime={dateWithoutTime}
        // workoutData={workoutData}
        // setWorkoutExercises={setWorkoutExercises}
        // saveWorkoutConfirmationModal={saveWorkoutConfirmationModal}
        // closeBottomSheet={closeBottomSheet}
        // onChangeWorkoutName={onChangeWorkoutName
        // currentWorkoutName={currentWorkoutName}
        // startOfWorkoutDateAndTime={startOfWorkoutDateAndTime}
        // setStartOfWorkoutDateAndTime={setStartOfWorkoutDateAndTime}
        />
        <ExerciseThreeDotsBottomSheet
          threeDotsBottomSheetRef={threeDotsBottomSheetRef}
          deleteExerciseFunction={deleteExerciseFunction}
          ExerciseName={exerciseForThreeDotsBS}
        />
        <NewTemplate
          newTemplateBottomSheetRef={newTemplateBottomSheetRef}
          addExerciseModal={addExerciseModal}
          setAddExerciseModal={setAddExerciseModal}
          workoutExercises={workoutExercises}
          setWorkoutExercises={setWorkoutExercises}
          templateExercises={templateExercises}
          setTemplateExercises={setTemplateExercises}
          templateData={templateData}
          setTemplateData={setTemplateData}
        />
        {/* <CreateNewExerciseModal
          addExerciseModal={addExerciseModal}
          setAddExerciseModal={setAddExerciseModal}
        /> */}
        <AddExerciseToWorkoutOrTemplateModal
          workoutExercises={workoutExercises}
          setWorkoutExercises={setWorkoutExercises}
          addExerciseModal={addExerciseModal}
          setAddExerciseModal={setAddExerciseModal}
          templateExercises={templateExercises}
          setTemplateExercises={setTemplateExercises}
          templateData={templateData}
          setTemplateData={setTemplateData}
        />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    backgroundColor: "#011638",
  },
  workoutNameRow: {
    flex: 1,
    marginTop: 10,
  },
  workoutNameLabel: {
    marginTop: 0,
    width: 75,
    fontSize: 12,
    textAlign: "center",
    padding: 12,
    color: "white",
  },
  workoutNameTextInput: {
    width: 270,
    fontSize: 16,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    color: "white",
    borderColor: "white",
    backgroundColor: "blue",
  },
  addExerciseButton: {
    borderRadius: 20,
    padding: 15,
    elevation: 2,
    width: "85%",
    height: 50,
    margin: 20,
    color: "white",
    backgroundColor: "blue",
    marginTop: 100,
  },
  cancelWorkoutButton: {
    borderRadius: 20,
    padding: 15,
    elevation: 2,
    width: "85%",
    height: 50,
    margin: 20,
    backgroundColor: "red",
  },
  listOfExercises: {
    marginTop: 10,
    marginBottom: 10,
  },
  exerciseItem: {
    padding: 16,
    backgroundColor: "red",
  },
  exerciseTitle: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
  textStyle: {
    color: "#61FF7E",
    fontWeight: "bold",
    textAlign: "center",
    width: 150,
    marginLeft: 5,
  },
  setColumn: {
    color: "#011638",
    fontWeight: "bold",
    width: "10%",
    paddingLeft: 8,
    fontSize: 16,
    overflow: "hidden",
    padding: 6,
    marginRight: 5,
    textAlign: "center",
  },
  setColumnSetNotComplete: {
    backgroundColor: "#61FF7E",
    borderWidth: 0,
    borderRadius: 6,
  },
  weightColumn: {
    fontWeight: "bold",
    width: "20%",
    textAlign: "center",
    paddingTop: 6,
    paddingBottom: 6,
    marginRight: 5,
    color: "#011638",
  },
  weightColumnSetNotComplete: {
    backgroundColor: "#61FF7E",
    borderColor: "red",
    borderRadius: 8,
  },
  repsColumn: {
    color: "#011638",
    fontWeight: "bold",
    width: "20%",
    textAlign: "center",
    // padding: 6,
    paddingTop: 6,
    paddingBottom: 6,
    marginRight: 5,
  },
  repsColumnSetNotComplete: {
    backgroundColor: "#61FF7E",
    borderColor: "red",
    borderRadius: 8,
  },
  bouncyCheckmark: {
    fontWeight: "bold",
    width: "10%",
    fontSize: 16,
    textAlign: "right",
    padding: 10,
    borderRadius: 6,
  },
});
