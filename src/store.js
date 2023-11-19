import { create } from 'zustand';

const storeStates = create((set) => (
    {
        // examples
        // lastName: '',
        // updateFirstName: (firstName) => set(() => ({ firstName: firstName })),

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
