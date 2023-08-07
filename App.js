import 'react-native-gesture-handler';
import React, { useCallback, useRef, useMemo, useState } from "react";
import { Text, View, StyleSheet, Pressable, ScrollView, TextInput } from "react-native";
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
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet from '@gorhom/bottom-sheet';
import Modal from "react-native-modal";

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

  const [bottomSheetBottomInset, setBottomSheetBottomInset] = useState(0)
  const [addExerciseModal, setAddExerciseModal] = useState(false)

  // ref
  const bottomSheetRef = useRef(null);
  const cancelWorkout = () => bottomSheetRef.current.close()

  // snap point variables
  const snapPoints = useMemo(() => ['15%', '94%'], []);

  // callbacks
  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
    if (index === 0) {
      setBottomSheetBottomInset(80)
    } else {
      setBottomSheetBottomInset(0)
    }
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

        <View>
          <BottomSheet
            ref={bottomSheetRef}
            index={1}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
            // enablePanDownToClose={cancelWorkout}
            bottomInset={bottomSheetBottomInset}
          >
            <View style={styles.contentContainer}>
              <Text>Awesome 🎉</Text>

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

              <Modal
                animationType="slide"
                transparent={true}
                isVisible={addExerciseModal}
                onRequestClose={() => {
                  setAddExerciseModal(!exerciseModal);
                }}
              >
                <View style={styles.modalCenteredView}>
                  <View style={styles.addExerciseModalView}>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "row",
                        justifyContent: "center",
                        gap: 30,
                        borderBottomColor: 'red',
                        borderBottomWidth: 2,
                      }}
                    >
                    </View>

                    <Pressable
                      onPress={() => {
                        setAddExerciseModal(!addExerciseModal);
                      }}>
                      <Text style={styles.closeExerciseModal}>Close Modal</Text>

                    </Pressable>
                    <ScrollView style={{ height: '85%', borderColor: 'red', borderWidth: 5, borderRadius: 10 }}>
                      <View style={{ flex: 1, flexDirection: 'row' }}>
                      </View>
                      <Text style={{ color: 'red', margin: 50, padding: 50, textAlign: 'center' }}>This is where the exercises go for a user to select</Text>

                    </ScrollView>
                  </View>
                </View>
              </Modal>
            </View>
          </BottomSheet>
        </View>

      </SafeAreaProvider>

    </GestureHandlerRootView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: "#011638",
  },
  modalCenteredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
  addExerciseModalView: {
    backgroundColor: "#011638",
    borderRadius: 10,
    borderColor: "#D3D3D3",
    padding: 20,
    alignItems: "center",
    height: "90%",
    width: "100%",
    marginTop: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderColor: 'white',
    borderWidth: 5
  },
  closeExerciseModal: {
    color: "#61FF7E",
    fontWeight: "bold",
    textAlign: "center",
    width: 150,
    marginLeft: 5,
    borderColor: 'black',
    borderWidth: 5,
    borderRadius: 10,
    borderColor: 'white',
    height: 60,
    padding: 15,
    // backgroundColor: 'white'
    // flex: 1,
    // margin: 10
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
