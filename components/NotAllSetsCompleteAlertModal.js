import { Text, View, StyleSheet, Pressable } from "react-native";
import Modal from "react-native-modal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';


//             to do list
//

//             feature roadmap
// asdf

const NotAllSetsCompleteAlertModal = ({
    notAllSetsCompleteAlert,
    setNotAllSetsCompleteAlert
    // setSaveWorkoutConfirmationModal,
    // setWorkoutData,
    // setWorkoutExercises,
    // saveWorkoutConfirmationModal,
    // closeBottomSheet,
    // workoutName,
    // workoutData,
    // currentWorkoutName,
    // startOfWorkoutDateAndTime,
    // setStartOfWorkoutDateAndTime
}) => {

    // console.log('StartOfWorkoutDateAndTime', startOfWorkoutDateAndTime)
    // const startOfWorkoutTime = new Date().getHours();
    // const currentDate = new Date();
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
            isVisible={notAllSetsCompleteAlert}
        >
            <View style={styles.modalCenteredView}>
                <View style={styles.addExerciseModalView}>
                    <View>
                        <View style={{
                            paddingTop: 5,
                        }}>
                            <Text style={{ color: 'white', fontSize: 18, textAlign: 'center', padding: 10 }}>Finish workout?</Text>
                        </View>
                        <View style={{
                            paddingBottom: 5,
                        }}>
                            <Text style={{ color: 'white', fontSize: 18, textAlign: 'center', padding: 10 }}>There are sets within this workout that have not been marked as complete. Invalid or empty sets cannot be included in a finished workout and will be removed.</Text>
                        </View>
                        <View
                            style={{
                                margin: 15
                            }}
                        >
                            <Pressable
                                style={{
                                    padding: 10,
                                    borderRadius: 10,
                                    borderWidth: 2,
                                    borderColor: "orange",
                                    backgroundColor: "orange",
                                }}
                            // onPress={
                            // iterates through and completes all sets that were not completed
                            // setNotAllSetsCompleteAlert(false);
                            // 
                            // }
                            >
                                <Text
                                    style={{ color: "white", textAlign: "center", fontSize: 20 }}
                                >
                                    Complete All Unfinished Sets (Functionality Not Done)
                                </Text>
                            </Pressable>
                        </View>
                        <View style={{
                            margin: 15
                        }}>
                            <Pressable
                                style={{
                                    padding: 10,
                                    borderRadius: 10,
                                    borderWidth: 2,
                                    borderColor: "red",
                                    backgroundColor: "red",
                                }}
                            // onPress={() => {
                            // removes incomplete sets from workout
                            // setNotAllSetsCompleteAlert(false);
                            // }}
                            >
                                <Text
                                    style={{ color: "white", textAlign: "center", fontSize: 20 }}
                                >
                                    Discard All Unfinished Sets (Functionality Not Done)
                                </Text>
                            </Pressable>
                        </View>
                        <View style={{
                            margin: 15
                        }}>
                            <Pressable
                                style={{
                                    padding: 10,
                                    borderRadius: 10,
                                    borderWidth: 2,
                                    borderColor: "green",
                                    backgroundColor: "green",
                                }}
                                onPress={() => {
                                    setNotAllSetsCompleteAlert(false);
                                }}
                            >
                                <Text
                                    style={{ color: "white", textAlign: "center", fontSize: 20 }}
                                >
                                    Return to Workout
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
        height: "60%",
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

export default NotAllSetsCompleteAlertModal;
