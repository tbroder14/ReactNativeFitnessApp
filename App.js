import "react-native-gesture-handler";
import React, {
  useCallback,
  useRef,
  useMemo,
  useState,
  useEffect,
} from "react";
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet from "@gorhom/bottom-sheet";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

// five bottom tabs
import StartWorkoutPage from "./components/StartWorkoutPage";
import HistoryPage from "./components/HistoryPage";
import ProgramPage from "./components/ProgramPage";
import Placeholder from "./components/Placeholder";
import ExercisePage from "./components/ExercisePage";
import Modal from "react-native-modal";
import BouncyCheckbox from "react-native-bouncy-checkbox";

import AddExerciseModal from "./components/AddExerciseModal";

//             to do list
// figure out how to create a state for workoutExercises and WorkoutData
// instead of prop drilling the state between multiple components
// use hookstate, redux, context, etc.

// format/style sets/text input parts 
// reorder exercises by long press and moving exercise
// how to delete exercise -> three buttons to dropdown menu? OR do a bottom sheet/bottom modal? 
// swipe to delete specific set
// keep entered data in text inputs when added sets or new/removed exercises => onchange, I believe

// figure out how to clear selectedExercises in this parent component?
// get Cancel Workout button to work? by updating setWorkoutExercises to empty array, which is then passed to AddExerciseModal.js
// cancelWorkout = line 153
//
// remove bottom unused styles and collapse/clean-up inline styles

//             feature roadmap
//

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

function StartWorkoutScreen({ bottomSheetRef }) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#011638",
        paddingTop: insets.top,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
    >
      <StartWorkoutPage bottomSheetRef={bottomSheetRef} />
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
        paddingBottom: insets.bottom,
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
  addExerciseModal,
  setAddExerciseModal,
  bottomSheetRef,
  setWorkoutExercises,
  workoutExercises
}) {
  const cancelWorkout = ({ setWorkoutExercises }) => {
    // why is this not clearing workoutExercises to an empty array? 
    setWorkoutExercises([]);
    bottomSheetRef.current.close();
  };

  return (
    <View style={{ padding: 20, gap: 25 }}>
      <Pressable
        style={{
          borderRadius: 8,
          backgroundColor: "blue",
          padding: 10,
        }}
        onPress={() => setAddExerciseModal(!addExerciseModal)}
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
        }}
        onPress={() => cancelWorkout({ setWorkoutExercises })}
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
  const [addExerciseModal, setAddExerciseModal] = useState(false);
  const [threeButtonModal, setThreeButtonModal] = useState(false)
  const [workoutExercises, setWorkoutExercises] = useState([]);
  const [workoutData, setWorkoutData] = useState([]);

  // workout name useState
  const startOfWorkoutTime = new Date().getHours();
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();
  const dateWithoutTime = new Date(year, month - 1, day);
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

  const [workoutName, setWorkoutName] = useState(currentWorkoutName);

  useEffect(() => {

    // determines the differences between workoutExercises (from AddExerciseModal) and workoutData
    let differences = workoutExercises.filter(exercise => {
      return !workoutData.some(exercise2 => exercise2.name === exercise.name);
    });

    // formats new exercises (the differences) to proper format with sets 
    differences.forEach((i) => {
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
    })

    // combines two arrays 
    const combinedWorkoutDataAndDifferences = [...workoutData, ...differences]

    setWorkoutData(combinedWorkoutDataAndDifferences)
  }, [workoutExercises]);

  // ref
  const bottomSheetRef = useRef(null);
  // snap point variables
  const snapPoints = useMemo(() => ["15%", "94%"], []);

  // callbacks
  const handleSheetChanges = useCallback((index) => { }, []);

  const addSet = (exerciseName) => {
    const copyOfWorkoutData = [...workoutData]

    copyOfWorkoutData.forEach((i) => {
      if (exerciseName === i.name) {
        const newSet = {
          weight: "50",
          reps: "8",
          distance: "0",
          seconds: "0",
          notes: "",
          complete: false,
        }
        i.sets.push(newSet)
      }
    })

    setWorkoutData(copyOfWorkoutData)
  }

  const handleCheckboxChange = (exercise, index) => {
    const exerciseName = exercise.name
    const setIndex = index
    const copyOfWorkoutData = [...workoutData]

    const updatedData = copyOfWorkoutData.map((e) => {
      if (exerciseName === e.name) {
        const updatedSets = e.sets.map((set, index) => {
          if (index === setIndex) {
            return { ...set, complete: !e.sets[setIndex].complete }
          }
          return set
        })
        return {
          ...e,
          sets: updatedSets
        }
      }
      return e
    })
    // is possibly delayed by one checkmark? 
    setWorkoutData(updatedData)

  }

  const Separator = () => (
    <View style={{ paddingLeft: 10, paddingRight: 10, marginBottom: 20 }}>
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "white",
        }}
      ></View>
    </View>
  );

  // Flatlist data items structure/functionality and style
  const Item = ({ item }) => (
    <View style={{ paddingBottom: 20 }}>
      <View
        style={{
          paddingRight: 20,
          paddingLeft: 20,
          marginBottom: 20,
        }}
      >
        <Text style={styles.exerciseTitle}>{item.name}</Text>
        <Pressable>

        </Pressable>
      </View>
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          paddingLeft: 20,
          paddingRight: 20,
          marginBottom: 10,
        }}
      >
        <Text style={{
          color: "white",
          fontWeight: "bold",
          width: "10%",
          textAlign: 'center',
          fontSize: 16,
        }}>
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
            textAlign: 'right'
          }}
        >
          CM
        </Text>
      </View>

      {item.sets?.map((sets, index) => (
        <Swipeable
        // onSwipeableOpen(right)
        // renderRightActions={rightSwipeAction}
        >
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              paddingLeft: 20,
              paddingRight: 20,
              // backgroundColor: "#466e67",
              paddingTop: 8,
              paddingBottom: 8,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "#011638",
                fontWeight: "bold",
                width: "10%",
                paddingLeft: 8,
                fontSize: 16,
                overflow: 'hidden',
                backgroundColor: '#61FF7E',
                borderWidth: 2,
                borderRadius: 6,
                padding: 6,
                marginRight: 5,
                textAlign: 'center'
              }}
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
              style={{
                fontWeight: "bold",
                width: "20%",
                textAlign: "center",
                backgroundColor: '#61FF7E',
                borderColor: 'red',
                borderRadius: 8,
                paddingTop: 6,
                paddingBottom: 6,
                marginRight: 5,
                color: '#011638'
              }}
              // onChangeText={onChangeNumber}
              // value={number}
              placeholder={sets.weight}
              keyboardType="numeric"
            />
            <TextInput
              style={{
                color: "#011638",
                fontWeight: "bold",
                width: "20%",
                textAlign: "center",
                backgroundColor: '#61FF7E',
                borderColor: 'red',
                borderRadius: 8,
                // padding: 6,
                paddingTop: 6,
                paddingBottom: 6,
                marginRight: 5
              }}
              // onChangeText={onChangeNumber}
              // value={number}
              placeholder={sets.reps}
              keyboardType="numeric"
            />
            <BouncyCheckbox
              style={{
                fontWeight: "bold",
                width: "10%",
                fontSize: 16,
                textAlign: 'right',
                padding: 10,
                borderRadius: 6
              }}
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
      ))
      }

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
        <Text style={{ color: "#011638", fontWeight: "bold", }}>Add Set</Text>
      </Pressable>
    </View >
  );

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
                <StartWorkoutScreen bottomSheetRef={bottomSheetRef} />
              )}
            />
            <Tab.Screen name="Exercise" component={ExerciseScreen} />
            <Tab.Screen name="Placeholder" component={PlaceholderScreen} />
          </Tab.Navigator>
        </NavigationContainer>
        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          index={-1}
          bottomInset={80}
          backgroundStyle={{ backgroundColor: "#011638" }}
          style={{
            // shadowColor: "gray",
            // shadowOffset: {
            //   width: 0,
            //   height: 5,
            // },
            // shadowOpacity: 1,
            // shadowRadius: 16.0,

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
                paddingRight: 35,
                paddingLeft: 35,
              }}
              value={workoutName}
            />
          </View>
          <FlatList
            data={workoutData}
            renderItem={({ item }) => <Item item={item} />}
            keyExtractor={(item) => {
              item.name;
            }}
            ItemSeparatorComponent={<Separator />}
            ListFooterComponent={
              <BottomSheetFooterComponents
                setAddExerciseModal={setAddExerciseModal}
                addExerciseModal={addExerciseModal}
                bottomSheetRef={bottomSheetRef}
                setWorkoutExercises={setWorkoutExercises}
                workoutExercises={workoutExercises}
              />
            }
          />
          {
            <AddExerciseModal
              addExerciseModal={addExerciseModal}
              setAddExerciseModal={setAddExerciseModal}
              workoutExercises={workoutExercises}
              setWorkoutExercises={setWorkoutExercises}
            />
          }
        </BottomSheet>
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
});
