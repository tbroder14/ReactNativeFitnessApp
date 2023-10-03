import { Text, View, StyleSheet, Pressable, } from "react-native";
import Modal from "react-native-modal";

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
    dateWithoutTime,
    workoutData
}) => {

    return (
        <Modal
            animationType="slide"
            transparent={true}
            isVisible={saveWorkoutConfirmationModal}
        >
            <View style={styles.modalCenteredView}>
                <View style={styles.addExerciseModalView}>
                    <View>
                        <View style={{
                            paddingBottom: 25,
                            paddingTop: 25

                        }}>
                            <Pressable
                                style={{
                                    padding: 15,
                                    borderRadius: 10,
                                    borderWidth: 2,
                                    borderColor: 'green',
                                    backgroundColor: 'green'
                                }}
                                onPress={() => {
                                    const finalWorkoutData = {
                                        date: dateWithoutTime,
                                        workoutName,
                                        workoutData
                                    }

                                    console.log('finalworkoutdata', finalWorkoutData)
                                    setWorkoutExercises([])
                                    setWorkoutData([])
                                    closeBottomSheet()
                                    setSaveWorkoutConfirmationModal(false)
                                }}
                            >
                                <Text style={{ color: 'white', textAlign: 'center', fontSize: 24 }}>Save Workout</Text>
                            </Pressable>
                        </View>
                        <View>
                            <Pressable
                                style={{
                                    padding: 15,
                                    borderRadius: 10,
                                    borderWidth: 2,
                                    borderColor: 'blue',
                                    backgroundColor: 'blue'
                                }}
                                onPress={() => {
                                    setSaveWorkoutConfirmationModal(false)
                                }}
                            >
                                <Text style={{ color: 'white', textAlign: 'center', fontSize: 24 }}>Resume</Text>
                            </Pressable>
                        </View>
                    </View>

                </View>
            </View>
        </Modal >
    );
};

const styles = StyleSheet.create({
    modalCenteredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
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
        padding: 10
    },
});

export default SaveWorkoutConfirmationModal;
