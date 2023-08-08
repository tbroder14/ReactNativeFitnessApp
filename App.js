import 'react-native-gesture-handler';
import React, { useCallback, useRef, useMemo, useState } from "react";
import { Text, View, StyleSheet, Pressable, ScrollView, TextInput, Animated } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import ExercisePage from "./components/ExercisePage";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import StartWorkoutPage from "./components/StartWorkoutPage";
import HistoryPage from "./components/HistoryPage";
import ProgramPage from "./components/ProgramPage";
import Placeholder from "./components/Placeholder";
import { GestureHandlerRootView, GestureDetector } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetFooter } from '@gorhom/bottom-sheet';
import AddExerciseModal from './components/AddExerciseModal';

//             to do list
// get navbar to show up over the bottom sheet when bottom sheet at 15%
// push navbar when bottom sheet is at 90%
// slowly add/subtract navbar position when pulling up/down on bottom sheet when it is at the bottom

// can I move the bottom sheet/empty workout to another component? or does all of this code have to be on this page?

//             feature roadmap

function ExerciseScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        backgroundColor: "royalblue",
        flex: 1,
        backgroundColor: "#011638",
        paddingBottom: 5
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

const Tab = createBottomTabNavigator();


export default function App() {

  const [addExerciseModal, setAddExerciseModal] = useState(true)

  // workout name useState
  const startOfWorkoutTime = new Date().getHours()
  const currentDate = new Date()
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth() + 1
  const day = currentDate.getDate()
  const dateWithoutTime = new Date(year, month - 1, day)
  let currentTemplate = null
  let currentWorkoutName = ''

  if (currentTemplate === null) {
    if (startOfWorkoutTime >= 21 || startOfWorkoutTime <= 4) {
      currentWorkoutName = 'Night Workout'
    } else if (startOfWorkoutTime >= 5 && startOfWorkoutTime <= 7) {
      currentWorkoutName = 'Early Morning Workout'
    } else if (startOfWorkoutTime >= 8 && startOfWorkoutTime <= 10) {
      currentWorkoutName = 'Morning Workout'
    } else if (startOfWorkoutTime >= 11 && startOfWorkoutTime <= 13) {
      currentWorkoutName = 'Mid-day Workout'
    } else if (startOfWorkoutTime >= 14 && startOfWorkoutTime <= 16) {
      currentWorkoutName = 'Afternoon Workout'
    } else if (startOfWorkoutTime >= 17 && startOfWorkoutTime <= 20) {
      currentWorkoutName = 'Evening Workout'
    }
  } else {
    currentWorkoutName = currentTemplate.name
  }

  const [workoutName, setWorkoutName] = useState(currentWorkoutName)

  // ref
  const bottomSheetRef = useRef(null);
  const cancelWorkout = () => bottomSheetRef.current.close()

  // snap point variables
  const snapPoints = useMemo(() => ['15%', '94%'], []);

  // callbacks
  const handleSheetChanges = useCallback((index) => {

  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Tab.Navigator
            initialRouteName="Start Workout"
            screenOptions={({ route }) => ({
              headerShown: false,
              tabBarStyle: {
                backgroundColor: "#011638"
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
            <Tab.Screen name="Start Workout" children={() => <StartWorkoutScreen bottomSheetRef={bottomSheetRef} />} />
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
        >
          <View style={styles.contentContainer}>
            <Text style={{ color: 'white', margin: 30 }}>Awesome 🎉</Text>
            <View style={{ flex: 1, flexDirection: 'row', gap: 15 }}>
              <Text style={styles.workoutNameLabel}>Workout Name</Text>
              <TextInput
                style={styles.workoutNameTextInput}
                onChangeText={setWorkoutName}
                value={workoutName}
              />
            </View>
            <Pressable
              style={[styles.addExerciseButton]}
              onPress={() => {
                setAddExerciseModal(!addExerciseModal);
              }}
            >
              <Text style={styles.textStyle}>Add Exercise</Text>

            </Pressable>
            <Pressable
              style={[styles.cancelWorkoutButton]}
              onPress={cancelWorkout}
            >
              <Text>Cancel Workout</Text>
            </Pressable>
            <AddExerciseModal addExerciseModal={addExerciseModal} setAddExerciseModal={setAddExerciseModal} />
          </View>
        </BottomSheet>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: "#011638",
  },
  workoutNameLabel: {
    height: 55,
    marginTop: 0,
    width: 75,
    fontSize: 12,
    textAlign: 'center',
    padding: 12,
    color: 'white',
    // marginRight: 8,
    // borderColor: 'white',
    // borderRadius: 10,
    // borderWidth: 1,
  },
  workoutNameTextInput: {
    height: 55,
    width: 270,
    fontSize: 16,
    // margin: 2,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    color: 'white',
    borderColor: 'white',
    backgroundColor: 'blue'
  },
  addExerciseButton: {
    borderRadius: 20,
    padding: 15,
    elevation: 2,
    width: '85%',
    height: 50,
    margin: 20,
    color: 'white',
    backgroundColor: "blue",
    marginTop: 100,
    // marginRight: 10,
  },
  cancelWorkoutButton: {
    borderRadius: 20,
    padding: 15,
    elevation: 2,
    width: '85%',
    height: 50,
    margin: 20,
    backgroundColor: 'red'
    // marginRight: 10,
  },
  textStyle: {
    color: "#61FF7E",
    fontWeight: "bold",
    textAlign: "center",
    width: 150,
    marginLeft: 5,
    // flex: 1,
    // margin: 10
  },
})
