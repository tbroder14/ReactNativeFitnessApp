import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseExerciseList } from "../components/data.js";

// Returns the complete list of exercises from users data or default data if user hasn't stored anything yet
async function completeExerciseList() {
    try {
        const userAddedExerciseList = await AsyncStorage.getItem('userAddedExerciseList')
        const parsedUserAddedExerciseList = JSON.parse(userAddedExerciseList)
        if (userAddedExerciseList === null) {
            return baseExerciseList
        } else {
            const combinedArrays = parsedUserAddedExerciseList.concat(baseExerciseList)
            const sortedCombinedArrays = combinedArrays.sort((a, b) => a.name.localeCompare(b.name))
            return sortedCombinedArrays
        }
    } catch (error) {
        console.log(error)
    }
};

// Sorts the exercise list alphabetically
async function sortExercises() {
    try {
        const userAddedExerciseList = await AsyncStorage.getItem('userAddedExerciseList')
        const parsedUserAddedExerciseList = JSON.parse(userAddedExerciseList)
        if (userAddedExerciseList === null) {
            return baseExerciseList
        } else {
            const combinedArrays = parsedUserAddedExerciseList.concat(baseExerciseList)
            const sortedCombinedArrays = combinedArrays.sort((a, b) => a.name.localeCompare(b.name))
            await AsyncStorage.setItem('userAddedExerciseList', JSON.stringify(sortedCombinedArrays));

            // return sortedCombinedArrays
        }
    } catch (error) {
        console.log(error)
    }
}

export const helperFunctions = {
    completeExerciseList,
    sortExercises
};
