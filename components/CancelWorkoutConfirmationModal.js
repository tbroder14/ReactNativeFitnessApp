import { Text, View, StyleSheet, Pressable, } from "react-native";
import Modal from "react-native-modal";

//             to do list
//

//             feature roadmap
// asdf

const CancelWorkoutConfirmationModal = ({
    setCancelWorkoutConfirmationModal,
    setWorkoutData,
    setWorkoutExercises,
    cancelWorkoutConfirmationModal,
    closeBottomSheet,
    setStartOfWorkoutDateAndTime
}) => {

    return (
        <Modal
            animationType="slide"
            transparent={true}
            isVisible={cancelWorkoutConfirmationModal}
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
                                    borderColor: 'red',
                                    backgroundColor: 'red'
                                }}
                                onPress={() => {
                                    setWorkoutExercises([])
                                    setWorkoutData([])
                                    closeBottomSheet()
                                    setStartOfWorkoutDateAndTime('')
                                    setCancelWorkoutConfirmationModal(false)
                                }}
                            >
                                <Text style={{ color: 'white', textAlign: 'center', fontSize: 24 }}>Cancel Workout</Text>
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
                                    setCancelWorkoutConfirmationModal(false)
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

export default CancelWorkoutConfirmationModal;
