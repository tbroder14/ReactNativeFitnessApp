import { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Pressable,
} from "react-native";
import { useStore } from "../src/store.js";

//             to do list
//

//             feature roadmap
//

const StartWorkoutPage = ({ bottomSheetRef, startOfWorkoutDateAndTime, setStartOfWorkoutDateAndTime, newTemplateBottomSheetRef }) => {

  const newTemplateBottomSheet = () => {
    newTemplateBottomSheetRef.current.snapToIndex(0)
  }

  // global state from store
  const toggleComingFromStartEmptyWorkout = useStore((state) => state.toggleComingFromStartEmptyWorkout);
  const toggleComingFromExercisePage = useStore((state) => state.toggleComingFromExercisePage);
  const openCreateNewExerciseModal = useStore((state) => state.openCreateNewExerciseModal);

  return (
    <View style={[styles.container]}>
      <View style={{ height: 20 }}></View>
      <View style={{ marginBottom: 10 }}>
        <Text
          style={{
            color: "#D3D3D3",
            fontSize: 40,
            // paddingLeft: 20,
            paddingBottom: 10,
            textAlign: "center",
          }}
        >
          Start Workout
        </Text>
      </View>
      <View style={{ height: 100, marginLeft: 15 }}>
        <Text style={{ color: "#D3D3D3", fontSize: 25 }}>Templates Here</Text>
        <View style={{ paddingHorizontal: 15, paddingTop: 10 }}>
          <Pressable style={{
            padding: 20,
            backgroundColor: 'green',
            borderRadius: 10
          }}
            onPress={openCreateNewExerciseModal}>
            <Text style={{ color: 'white' }}>Bring up Create Exercise Modal</Text>
          </Pressable>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          gap: 20,
          margin: 15,
        }}
      >
        <Pressable
          style={{
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: 12,
            paddingHorizontal: 12,
            borderRadius: 4,
            elevation: 3,
            backgroundColor: "#61FF7E",
            height: 50,
            width: 150,
            borderRadius: 20,
          }}
          onPress={() => newTemplateBottomSheet()}
        >
          <Text
            style={{
              fontSize: 14,
              lineHeight: 21,
              fontWeight: "bold",
              letterSpacing: 0.25,
              color: "#011638",
            }}
          >
            New Template
          </Text>
        </Pressable>
        <Pressable
          style={{
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: 12,
            paddingHorizontal: 12,
            borderRadius: 4,
            elevation: 3,
            backgroundColor: "#61FF7E",
            height: 50,
            width: 190,
            borderRadius: 20,
          }}
          onPress={() => {
            bottomSheetRef.current?.snapToIndex(1);
            const date = new Date()
            const dateToLocaleString = date.toLocaleString(("en-US"))
            setStartOfWorkoutDateAndTime(dateToLocaleString)
            toggleComingFromExercisePage(false)
            // toggleComingFromStartEmptyWorkout(true)
          }}
        >
          <Text
            style={{
              fontSize: 14,
              lineHeight: 21,
              fontWeight: "bold",
              letterSpacing: 0.25,
              color: "#011638",
            }}
          >
            Start Empty Workout
          </Text>
        </Pressable>

      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalCenteredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "#011638",
    borderRadius: 10,
    borderColor: "#D3D3D3",
    padding: 20,
    alignItems: "center",
    height: "100%",
    width: "120%",
    marginTop: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderColor: "white",
    borderWidth: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: 50,
    height: 50,
    marginRight: 10,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
    // textAlign: "center",
  },
  buttonClose: {
    // textAlign: "center",
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

    // marginRight: 10,
  },
  // cancelWorkoutButton: {
  //     borderRadius: 20,
  //     padding: 15,
  //     elevation: 2,
  //     width: '85%',
  //     height: 50,
  //     margin: 20,
  //     backgroundColor: 'red'
  //     // marginRight: 10,
  // },
  textStyle: {
    color: "#61FF7E",
    fontWeight: "bold",
    textAlign: "center",
    width: 150,
    marginLeft: 5,
    // flex: 1,
    // margin: 10
  },
  modalText: {
    // marginBottom: 15,
    textAlign: "center",
    marginLeft: 100,
    color: "white",
    // flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center'
  },
  workoutNameLabel: {
    height: 55,
    marginTop: 0,
    width: 100,
    fontSize: 11,
    textAlign: "center",
    padding: 12,
    color: "white",
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
    color: "white",
    borderColor: "white",
  },
});

export default StartWorkoutPage;

// export default function ActiveWorkoutPage({ setActivePage, setShowButtons, currentTemplate, setCurrentTemplate, currentWorkoutExercises, setCurrentWorkoutExercises, activeWorkoutData, setActiveWorkoutData, workoutData, setWorkoutData }) {
//
//     useEffect(() => {
//         const updatedWorkoutData = currentWorkoutExercises.reduce((acc, exercise) => {
//             const exerciseExists = workoutData.some((item) => item.name === exercise)
//             if (!exerciseExists) {
//                 const newExercise = {
//                     name: exercise,
//                     sets: [
//                         { weight: '50', reps: '10', distance: '0', seconds: '0', notes: '', complete: false },
//                         { weight: '60', reps: '8', distance: '0', seconds: '0', notes: '', complete: false }
//                     ]
//                 }
//                 return [...acc, newExercise]
//             }
//             return acc
//         }, workoutData)
//         const draftWorkoutData = updatedWorkoutData.filter((item) =>
//             currentWorkoutExercises.includes(item.name))
//         setWorkoutData(draftWorkoutData)
//     }, [currentWorkoutExercises])

//     const startOfWorkoutTime = new Date().getHours()
//     const currentDate = new Date()
//     const year = currentDate.getFullYear()
//     const month = currentDate.getMonth() + 1
//     const day = currentDate.getDate()
//     const dateWithoutTime = new Date(year, month - 1, day)

//     let currentWorkoutName = ''

//     if (currentTemplate === null) {
//         if (startOfWorkoutTime >= 21 || startOfWorkoutTime <= 4) {
//             currentWorkoutName = 'Night Workout'
//         } else if (startOfWorkoutTime >= 5 && startOfWorkoutTime <= 7) {
//             currentWorkoutName = 'Early Morning Workout'
//         } else if (startOfWorkoutTime >= 8 && startOfWorkoutTime <= 10) {
//             currentWorkoutName = 'Morning Workout'
//         } else if (startOfWorkoutTime >= 11 && startOfWorkoutTime <= 13) {
//             currentWorkoutName = 'Mid-day Workout'
//         } else if (startOfWorkoutTime >= 14 && startOfWorkoutTime <= 16) {
//             currentWorkoutName = 'Afternoon Workout'
//         } else if (startOfWorkoutTime >= 17 && startOfWorkoutTime <= 20) {
//             currentWorkoutName = 'Evening Workout'
//         }
//     } else {
//         currentWorkoutName = currentTemplate.name
//     }

//     const [workoutName, setWorkoutName] = useState(currentWorkoutName)
//     function updateName(e) {
//         setWorkoutName(e.target.value)
//     }

//     function addExercises() {
//         setActiveWorkoutData(workoutData)
//         setActivePage('Add Exercises')
//     }

//     function addNote(exercise) {
//         // // console.log('add note')
//         // setWorkoutData((prevData) => {
//         //   const updatedData = prevData.map((e) => {
//         //     if (exercise === e.name) {
//         //       const updatedNestedArray = [...e.sets, { weight: '60', reps: '8', distance: '0', seconds: '0', notes: '' }]
//         //       return { ...e, sets: updatedNestedArray }
//         //     }
//         //     return e
//         //   })
//         //   return updatedData
//         // })
//     }

//     function deleteExercise(exercise, index) {
//         setWorkoutData((prevData) => {
//             const updatedData = prevData.map((e) => {
//                 if (e.name === exercise) {
//                     workoutData.splice(index, 1)
//                 }
//                 return e
//             })
//             return updatedData
//         })

//         const newTempCurrentExercisesArray = currentWorkoutExercises.filter((item) => item !== exercise)
//         setCurrentWorkoutExercises(newTempCurrentExercisesArray)
//     }

//     //   function updateWeight () {
//     //   }

//     function updateReps() {
//     }

//     const shiftExerciseUp = (workoutData, fromIndex) => {
//         if (fromIndex !== 0) {
//             const toIndex = fromIndex - 1
//             const exerciseToMove = workoutData[fromIndex]
//             const updatedWorkoutData = [...workoutData]
//             updatedWorkoutData.splice(fromIndex, 1)
//             updatedWorkoutData.splice(toIndex, 0, exerciseToMove)
//             setWorkoutData(updatedWorkoutData)
//         }
//     }

//     const shiftExerciseDown = (workoutData, fromIndex) => {
//         const toIndex = fromIndex + 1
//         const exerciseToMove = workoutData[fromIndex]
//         const updatedWorkoutData = [...workoutData]
//         updatedWorkoutData.splice(fromIndex, 1)
//         updatedWorkoutData.splice(toIndex, 0, exerciseToMove)
//         setWorkoutData(updatedWorkoutData)
//     }

//     //   function completedSets () {
//     //     console.log('box is checked')
//     //   }

//     const handleCheckboxChange = (exercise, index) => {
//         const exerciseName = exercise.name
//         const setIndex = index

//         setWorkoutData((prevData) => {
//             const updatedData = prevData.map((e) => {
//                 if (exerciseName === e.name && e.sets[setIndex].complete === false) {
//                     const updatedSets = exercise.sets.map((set, index) => {
//                         if (index === setIndex) {
//                             return { ...set, complete: true }
//                         }
//                         return set
//                     })
//                     return {
//                         ...exercise,
//                         sets: updatedSets
//                     }
//                 } else if (exerciseName === e.name && e.sets[setIndex].complete === true) {
//                     const updatedSets = exercise.sets.map((set, index) => {
//                         if (index === setIndex) {
//                             return { ...set, complete: false }
//                         }
//                         return set
//                     })
//                     return {
//                         ...exercise,
//                         sets: updatedSets
//                     }
//                 }
//                 return e
//             })
//             return updatedData
//         })
//     }

//     const addSet = (exercise, event) => {
//         event.preventDefault()

//         setWorkoutData((prevData) => {
//             const updatedData = prevData.map((e) => {
//                 if (exercise === e.name) {
//                     const updatedNestedArray = [...e.sets, { weight: '60', reps: '8', distance: '0', seconds: '0', notes: '', complete: false }]
//                     return { ...e, sets: updatedNestedArray }
//                 }
//                 return e
//             })
//             return updatedData
//         })
//     }

//     function finishWorkout() {
//         console.log('this workout would be saved')
//         // console.log(workoutData)
//         // const finalWorkoutData =
//         // {
//         // date:"5/14/2012",
//         // exerciseName:,
//         // workoutName: workoutName,
//         // equipment:"",
//         // set:[
//         //     {weight:"50", reps:"10", distance:"0", seconds:"0", notes:""},
//         //     {weight:"60", reps:"8", distance:"0", seconds:"0", notes:""}]
//         // }
//         const finalWorkoutData = {
//             date: dateWithoutTime,
//             workoutName,
//             workoutData

//         }
//         console.log(finalWorkoutData)
//     }

//     function returnToHomePageButton() {
//         setActiveWorkoutData([])
//         setCurrentWorkoutExercises([])
//         setCurrentTemplate(null)
//         setActivePage('Show Templates')
//         setShowButtons(true)
//     }

//     return (
//         <>
//             <div className='flex justify-between content-center'>
//                 <button className='btn btn-square' onClick={() => returnToHomePageButton()}>
//                     <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 18L18 6M6 6l12 12' /></svg>
//                 </button>
//                 <h1 className='text-2xl self-center'>ACTIVE WORKOUT</h1>
//                 <div className='btn h-6 w-16' type='submit' value='Save Template'>Save</div>
//             </div>
//             <div className='form-control'>
//                 <label className='label cursor-pointer'>
//                     <span className='label-text'>Workout Name</span>
//                     <input
//                         type='text'
//                         name='Name'
//                         id='Name'
//                         value={workoutName}
//                         onChange={updateName}
//                         placeholder='Workout Name'
//                         className='input input-bordered w-full input-lg max-w-xs my-2'
//                         required
//                     />
//                 </label>
//             </div>
//             <div>
//                 {workoutData &&
//                     <div className='p-1'>
//                         {workoutData.map((exercise, index) =>
//                             <div className='text-left mt-3 font-bold' key={index}>
//                                 <span className='flex justify-between content-center items-center'>
//                                     <div className='text-base'> {exercise.name}
//                                     </div>
//                                     <div className='flex content-center items-center'>
//                                         <div>
//                                             <details className='dropdown'>
//                                                 <summary className='ml-2 btn mr-1 font-bold'>...</summary>
//                                                 <ul className='p-2 shadow menu dropdown-content bg-neutral rounded-box w-40'>
//                                                     <li>
//                                                         <button onClick={addNote} className='w-full text-left text-base'>Add Note</button>
//                                                     </li>
//                                                     <li>
//                                                         <button onClick={(event) => deleteExercise(exercise.name, index)} className='w-full text-left text-base'>Delete Exercise</button>
//                                                     </li>
//                                                 </ul>
//                                             </details>
//                                         </div>
//                                         <div className='flex content-center items-center'>
//                                             <svg className='inline nowrap' onClick={() => shiftExerciseUp(workoutData, index)} width='58px' height='58px' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
//                                                 <path fillRule='evenodd' clipRule='evenodd' d='M3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355ZM8.46967 14.0303C8.76256 14.3232 9.23744 14.3232 9.53033 14.0303L12 11.5607L14.4697 14.0303C14.7626 14.3232 15.2374 14.3232 15.5303 14.0303C15.8232 13.7374 15.8232 13.2626 15.5303 12.9697L12.5303 9.96967C12.3897 9.82902 12.1989 9.75 12 9.75C11.8011 9.75 11.6103 9.82902 11.4697 9.96967L8.46967 12.9697C8.17678 13.2626 8.17678 13.7374 8.46967 14.0303Z' fill='#1B192E' />
//                                             </svg>
//                                             <svg className='inline nowrap' onClick={() => shiftExerciseDown(workoutData, index)} width='58px' height='58px' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
//                                                 <path fillRule='evenodd' clipRule='evenodd' d='M3.46447 3.46447C2 4.92893 2 7.28595 2 12C2 16.714 2 19.0711 3.46447 20.5355C4.92893 22 7.28595 22 12 22C16.714 22 19.0711 22 20.5355 20.5355C22 19.0711 22 16.714 22 12C22 7.28595 22 4.92893 20.5355 3.46447C19.0711 2 16.714 2 12 2C7.28595 2 4.92893 2 3.46447 3.46447ZM8.46967 9.96967C8.76256 9.67678 9.23744 9.67678 9.53033 9.96967L12 12.4393L14.4697 9.96967C14.7626 9.67678 15.2374 9.67678 15.5303 9.96967C15.8232 10.2626 15.8232 10.7374 15.5303 11.0303L12.5303 14.0303C12.3897 14.171 12.1989 14.25 12 14.25C11.8011 14.25 11.6103 14.171 11.4697 14.0303L8.46967 11.0303C8.17678 10.7374 8.17678 10.2626 8.46967 9.96967Z' fill='#1B192E' />
//                                             </svg>
//                                         </div>
//                                     </div>
//                                 </span>
//                                 <form>
//                                     <table className='w-full text-center border-none'>
//                                         <thead>
//                                             <tr className='text-center'>
//                                                 <th className='text-right'>Set</th>
//                                                 <th>Previous</th>
//                                                 <th className='w-16 m-0'>lbs</th>
//                                                 <th>Reps</th>
//                                                 <th className='text-2xl'>&#10003;</th>
//                                             </tr>
//                                         </thead>
//                                         <tbody>
//                                             {exercise.sets.map((row, index) =>
//                                                 <tr key={index} id='set row' className={`h-12 rounded-lg ${row.complete ? 'bg-info' : ''}`}>
//                                                     <td className='align-middle'><div className='bg-black rounded-lg h-8 pt-1'>{index + 1}</div></td>
//                                                     <td className='mx-8 h-8 w-36'>140x8</td>
//                                                     <td className=''>
//                                                         <input
//                                                             type='number'
//                                                             name='Weight'
//                                                             id='weight'
//                                                             min='1'
//                                                             max='999'
//                                                             placeholder={row.weight}
//                                                             className='input bg-black rounded-lg w-16 h-8 text-center'
//                                                         />
//                                                     </td>
//                                                     <td>
//                                                         <input
//                                                             type='number'
//                                                             name='Reps'
//                                                             id='reps'
//                                                             min='1'
//                                                             max='999'
//                                                             placeholder={row.reps}
//                                                             className='input bg-black rounded-lg w-16 text-center h-8'
//                                                             onChange={updateReps}
//                                                         />
//                                                     </td>
//                                                     <td>
//                                                         <input
//                                                             type='checkbox'
//                                                             className='checkbox'
//                                                             checked={row.complete}
//                                                             // checked={false}
//                                                             onChange={() => handleCheckboxChange(exercise, index)}
//                                                         />
//                                                     </td>
//                                                 </tr>
//                                             )}
//                                             <tr>
//                                                 <td colSpan='5'>
//                                                     <button className='btn w-full mt-1 mb-2' onClick={(event) => addSet(exercise.name, event)}>Add Set</button>
//                                                 </td>
//                                             </tr>
//                                         </tbody>
//                                     </table>
//                                 </form>
//                                 <hr className='border-b border-black' />
//                             </div>)}
//                     </div>}
//             </div>
//             <button className='btn m-4' onClick={addExercises}>Add Exercises</button>
//             <button className='btn btn-primary m-4' onClick={finishWorkout}>Finish Workout</button>
//             <button className='btn btn-secondary mt-2 mb-20' onClick={() => returnToHomePageButton()}>Cancel Workout</button>
//         </>
//     )
// }
