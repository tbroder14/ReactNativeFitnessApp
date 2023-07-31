import * as React from "react";
import { Text, View } from "react-native";
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
import ProgramPage from "./components/HistoryPage";



function ExerciseScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        backgroundColor: "royalblue",
        flex: 1,
        backgroundColor: "#011638",
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
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
      <Text>Placeholder!</Text>
    </View>
  );
}

function StartWorkoutScreen() {
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
      <StartWorkoutPage />
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
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Exercise"
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarStyle: {
              backgroundColor: "#011638",
              height: 80,
              fontWeight: "",
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
          <Tab.Screen name="Start Workout" component={StartWorkoutScreen} />
          <Tab.Screen name="Exercise" component={ExerciseScreen} />
          <Tab.Screen name="Placeholder" component={PlaceholderScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
