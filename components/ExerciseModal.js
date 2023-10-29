import { useState, useCallback } from "react";
import { Text, View, StyleSheet, Pressable, } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { TextInput } from "react-native-gesture-handler";
import Modal from "react-native-modal";
import Ionicons from "react-native-vector-icons/Ionicons";

const ExercisePage = ({ exerciseModal, setExerciseModal, exerciseNameForModal, setExerciseNameForModal }) => {
    console.log('exerciseNameForModal', exerciseNameForModal)

    return (
        <Modal
            animationType="slide"
            transparent={true}
            isVisible={exerciseModal}
        >
            <View style={styles.modalCenteredView}>
                <View style={styles.createNewExerciseModalView}>
                    <View style={{ width: '50%', alignItems: 'center', padding: 15 }}>
                        <Pressable
                            style={{ borderColor: 'black', borderWidth: 2, borderRadius: 6, padding: 10 }}
                            onPress={() => {
                                setExerciseModal(false)
                                setExerciseNameForModal(undefined)
                            }}>
                            <Text>Close Exercise Modal</Text>
                        </Pressable>
                    </View>
                    <View style={{ alignItems: 'center', paddingBottom: 15 }}>
                        <Text>EXERCISE MODAL</Text>
                    </View >
                    <View style={{ alignItems: 'center', padding: 15 }}>
                        <Text>FOR {exerciseNameForModal}</Text>

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
    createNewExerciseModalView: {
        backgroundColor: "white",
        borderRadius: 10,
        borderColor: "#D3D3D3",
        height: "80%",
        width: "100%",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        padding: 15
    },
    selectedExerciseOrEquipment: {
        backgroundColor: "#011638",
        color: "#61FF7E",
        borderColor: "#D3D3D3",
        fontWeight: "bold",
    },
    noSelectedExerciseOrEquipment: {
        backgroundColor: "#364156",
        color: "black",
        borderColor: "#D3D3D3",
    },
});

export default ExercisePage;
