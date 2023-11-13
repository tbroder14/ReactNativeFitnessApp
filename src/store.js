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
    }
))

// const [saveWorkoutConfirmationModal, setSaveWorkoutConfirmationModal] = useState(false)
// const [notAllSetsCompleteAlert, setNotAllSetsCompleteAlert] = useState(false)
// const [cancelWorkoutConfirmationModal, setCancelWorkoutConfirmationModal] = useState(false)
// const [workoutExercises, setWorkoutExercises] = useState([]);
// const [workoutData, setWorkoutData] = useState([]);
// const [exerciseForThreeDotsBS, setExerciseForThreeDotsBS] = useState('')
// const [collapseHandler, setCollapseHandler] = useState(false)
// const [startOfWorkoutDateAndTime, setStartOfWorkoutDateAndTime] = useState('')

export const useStore = storeStates;

// export const useStore = {
//     addExerciseModalState,
//     createNewExerciseModalState
// };
