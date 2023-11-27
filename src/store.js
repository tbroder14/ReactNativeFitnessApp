import { create } from 'zustand';
import { useShallow } from 'zustand/react/shallow'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { baseExerciseList } from "../components/data";
import { parse } from 'uuid';

const storeStates = create((set) => (
    {
        // examples
        // lastName: '',
        // updateFirstName: (firstName) => set(() => ({ firstName: firstName })),

        masterExerciseList: [],

        initializeMasterExerciseList: async () => {
            try {
                const userAddedExerciseList = await AsyncStorage.getItem('userAddedExerciseList');
                const parsedUserAddedExerciseList = JSON.parse(userAddedExerciseList) || [];

                const combinedArrays = parsedUserAddedExerciseList.concat(baseExerciseList);
                const sortedCombinedArrays = combinedArrays.sort((a, b) => a.name.localeCompare(b.name));
                set({ masterExerciseList: sortedCombinedArrays });
            } catch (error) {
                console.error('Error initializing masterExerciseList:', error);
            }
        },

        addNewExerciseToExerciseList: async (newExercise) => {
            try {
                const userAddedExerciseList = await AsyncStorage.getItem('userAddedExerciseList');
                const parsedUserAddedExerciseList = JSON.parse(userAddedExerciseList) || [];

                const updatedList = [...parsedUserAddedExerciseList, newExercise];
                await AsyncStorage.setItem('userAddedExerciseList', JSON.stringify(updatedList));

                const combinedArrays = updatedList.concat(baseExerciseList);
                const sortedCombinedArrays = combinedArrays.sort((a, b) => a.name.localeCompare(b.name));
                set({ masterExerciseList: sortedCombinedArrays });

            } catch (error) {
                console.error('Error adding new exercise:', error);
            }
        },

        comingFromStartEmptyWorkout: false,
        toggleComingFromStartEmptyWorkout: (comingFromStartEmptyWorkout) => set(() => ({ comingFromStartEmptyWorkout: comingFromStartEmptyWorkout })),

        comingFromExercisePage: false,
        toggleComingFromExercisePage: (comingFromExercisePage) => set(() => ({ comingFromExercisePage: comingFromExercisePage })),

        comingFromNewTemplate: false,
        toggleComingFromNewTemplate: (comingFromNewTemplate) => set(() => ({ comingFromNewTemplate: comingFromNewTemplate })),

        comingFromReplaceExercise: false,
        toggleComingFromReplaceExercise: (comingFromReplaceExercise) => set(() => ({ comingFromReplaceExercise: comingFromReplaceExercise })),

        comingFromStartEmptyWorkoutOrNewTemplateOrReplaceExercise: false,
        toggleComingFromStartEmptyWorkoutOrNewTemplateOrReplaceExercise: (comingFromStartEmptyWorkoutOrNewTemplateOrReplaceExercise) => set(() => ({ comingFromStartEmptyWorkoutOrNewTemplateOrReplaceExercise: comingFromStartEmptyWorkoutOrNewTemplateOrReplaceExercise })),

        createNewExerciseModal: false,
        closeCreateNewExerciseModal: () => set({ createNewExerciseModal: false }),
        openCreateNewExerciseModal: () => set({ createNewExerciseModal: true }),
        toggleCreateNewExerciseModal: (createNewExerciseModal) => set(() => ({ createNewExerciseModal: createNewExerciseModal })),

    }
))

// workoutData = comes from App.js
// workoutExercises = comes from App.js
// selectedExercises = can be useState

export const useStore = storeStates;

// export const useStore = {
//     addExerciseModalState,
//     createNewExerciseModalState
// };
