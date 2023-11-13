import { Text, View, StyleSheet, Pressable } from "react-native";
import Modal from "react-native-modal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';


//             to do list
//

//             feature roadmap
// asdf

const SaveWorkoutConfirmationModal = ({
    setSaveWorkoutConfirmationModal,
    setWorkoutData,
    setWorkoutExercises,
    saveWorkoutConfirmationModal,
    closeBottomSheet,
    workoutName,
    workoutData,
    currentWorkoutName,
    startOfWorkoutDateAndTime,
    setStartOfWorkoutDateAndTime
}) => {

    // console.log('StartOfWorkoutDateAndTime', startOfWorkoutDateAndTime)
    const startOfWorkoutTime = new Date().getHours();
    const currentDate = new Date();
    // const year = currentDate.getFullYear();
    // const month = currentDate.getMonth() + 1;
    // const day = currentDate.getDate();
    // const dateWithoutTime = new Date(year, month - 1, day);
    // const Date(year, month, day, hours, minutes, seconds)
    // const endOfWorkoutTime = new Date(year, month, day, hours, minutes)

    return (
        <Modal
            animationType="slide"
            transparent={true}
            isVisible={saveWorkoutConfirmationModal}
        >
            <View style={styles.modalCenteredView}>
                <View style={styles.addExerciseModalView}>
                    <View>
                        <View
                            style={{
                                paddingBottom: 25,
                                paddingTop: 25,
                            }}
                        >
                            <Pressable
                                style={{
                                    padding: 15,
                                    borderRadius: 10,
                                    borderWidth: 2,
                                    borderColor: "green",
                                    backgroundColor: "green",
                                }}
                                onPress={() => {
                                    // check for all sets to be completed
                                    const workoutUniqueID = uuidv4()
                                    // save workout data
                                    const finalWorkoutData = [
                                        {
                                            id: workoutUniqueID,
                                            date: startOfWorkoutDateAndTime,
                                            workoutName,
                                            workoutData,
                                        },
                                    ];

                                    console.log("final workout data", finalWorkoutData);

                                    const storeData = async (finalWorkoutData) => {
                                        try {
                                            const oldHistoryData = await AsyncStorage.getItem(
                                                "history"
                                            );
                                            const parsedOldHistoryData = JSON.parse(oldHistoryData);
                                            if (oldHistoryData === null) {
                                                await AsyncStorage.setItem(
                                                    "history",
                                                    JSON.stringify([finalWorkoutData])
                                                );
                                            } else {
                                                parsedOldHistoryData.unshift(finalWorkoutData);
                                                await AsyncStorage.setItem(
                                                    "history",
                                                    JSON.stringify(parsedOldHistoryData)
                                                );
                                            }
                                            console.log("workout saved");

                                            // verifies workout data was saved
                                            const currentData = await AsyncStorage.getItem("history");
                                            console.log("current workout data:", currentData);

                                            setWorkoutExercises([]);
                                            setWorkoutData([]);
                                            closeBottomSheet();
                                            // onChangeWorkoutName(currentWorkoutName)
                                            setStartOfWorkoutDateAndTime('')
                                            setSaveWorkoutConfirmationModal(false);
                                        } catch (e) {
                                            // saving error
                                            console.log(e);
                                        }
                                    };
                                    storeData(finalWorkoutData);
                                }}
                            >
                                <Text
                                    style={{ color: "white", textAlign: "center", fontSize: 24 }}
                                >
                                    Save Workout
                                </Text>
                            </Pressable>
                        </View>
                        <View>
                            <Pressable
                                style={{
                                    padding: 15,
                                    borderRadius: 10,
                                    borderWidth: 2,
                                    borderColor: "blue",
                                    backgroundColor: "blue",
                                }}
                                onPress={() => {
                                    setSaveWorkoutConfirmationModal(false);
                                }}
                            >
                                <Text
                                    style={{ color: "white", textAlign: "center", fontSize: 24 }}
                                >
                                    Resume
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalCenteredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    addExerciseModalView: {
        backgroundColor: "#011638",
        borderRadius: 10,
        borderColor: "#D3D3D3",
        height: "40%",
        width: "100%",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        padding: 10,
    },
});

export default SaveWorkoutConfirmationModal;
