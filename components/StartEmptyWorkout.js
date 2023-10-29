import { useEffect, useState } from 'react'
import { Text, View, StyleSheet, TextInput, FlatList, Pressable, TouchableOpacity, Button } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { sortedExerciseList } from "./data.js";
// import Modal from "react-native-modal";

const StartEmptyWorkout = () => {

    const startOfWorkoutTime = new Date().getHours()
    const currentDate = new Date()
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth() + 1
    const day = currentDate.getDate()
    const dateWithoutTime = new Date(year, month - 1, day)

    let currentWorkoutName = ''

    // if (currentTemplate === null) {
    //     if (startOfWorkoutTime >= 21 || startOfWorkoutTime <= 4) {
    //         currentWorkoutName = 'Night Workout'
    //     } else if (startOfWorkoutTime >= 5 && startOfWorkoutTime <= 7) {
    //         currentWorkoutName = 'Early Morning Workout'
    //     } else if (startOfWorkoutTime >= 8 && startOfWorkoutTime <= 10) {
    //         currentWorkoutName = 'Morning Workout'
    //     } else if (startOfWorkoutTime >= 11 && startOfWorkoutTime <= 13) {
    //         currentWorkoutName = 'Mid-day Workout'
    //     } else if (startOfWorkoutTime >= 14 && startOfWorkoutTime <= 16) {
    //         currentWorkoutName = 'Afternoon Workout'
    //     } else if (startOfWorkoutTime >= 17 && startOfWorkoutTime <= 20) {
    //         currentWorkoutName = 'Evening Workout'
    //     }
    // } else {
    //     currentWorkoutName = currentTemplate.name
    // }

    const [workoutName, setWorkoutName] = useState(currentWorkoutName)
    function updateName(e) {
        setWorkoutName(e.target.value)
    }

    return (
        <View>Start Empty Workout</View>

    )
}

const styles = StyleSheet.create({

})