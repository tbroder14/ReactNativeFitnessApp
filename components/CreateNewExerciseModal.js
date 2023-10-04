import { useState, useEffect } from "react";
import { Text, View, StyleSheet, Pressable, } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { TextInput } from "react-native-gesture-handler";
import Modal from "react-native-modal";

//             to do list
//

//             feature roadmap
// asdf

const CreateNewExerciseModal = ({
    setCreateNewExercise,
    createNewExercise,
}) => {

    // for react-native-dropdown-picker
    const [muscleValue, setMuscleValue] = useState(null);
    const [equipmentValue, setEquipmentValue] = useState(null);
    const [muscleOpen, setMuscleOpen] = useState(false);
    const [equipmentOpen, setEquipmentOpen] = useState(false);

    const muscles = [
        { label: "Biceps", value: "biceps" },
        { label: "Triceps", value: "triceps" },
        { label: "Chest", value: "chest" },
        { label: "Hamstrings", value: "hamstrings" },
        { label: "Quadriceps", value: "quadriceps" },
        { label: "Glutes", value: "glutes" },
        { label: "Core", value: "core" },
        { label: "Back", value: "back" },
        { label: "Calves", value: "calves" },
        { label: "Clear", value: "clear" },
    ];

    const equipment = [
        { label: "Barbell", value: "barbell" },
        { label: "Dumbbells", value: "dumbbells" },
        { label: "Cable", value: "cable" },
        { label: "Kettlebell", value: "kettlebell" },
        { label: "Bodyweight", value: "bodyweight" },
        { label: "Machine", value: "machine" },
        { label: "Other", value: "other" },
    ];

    console.log('create new exercise modal is activated')

    return (
        <Modal
            animationType="slide"
            transparent={true}
            isVisible={createNewExercise}
        >
            <View style={styles.modalCenteredView}>
                <View style={styles.createNewExerciseModalView}>
                    <View>
                        <View style={{
                            paddingBottom: 25,
                            paddingTop: 25

                        }}>
                            <DropDownPicker
                                style={{
                                    ...(muscleValue
                                        ? styles.selectedExerciseOrEquipment
                                        : styles.noSelectedExerciseOrEquipment),
                                }}
                                open={muscleOpen}
                                value={muscleValue}
                                items={muscles}
                                setOpen={setMuscleOpen}
                                setValue={setMuscleValue}
                                textStyle={{
                                    color: "#61FF7E",
                                }}
                                labelStyle={{
                                    fontWeight: "bold",
                                }}
                                dropDownContainerStyle={{
                                    backgroundColor: "#011638",
                                    maxHeight: 500,
                                    borderColor: "white",
                                }}
                            />
                        </View>
                        <View style={{ width: "50%" }}>
                            <DropDownPicker
                                style={{
                                    // zIndex: 1000,
                                    ...(equipmentValue
                                        ? styles.selectedExerciseOrEquipment
                                        : styles.noSelectedExerciseOrEquipment),
                                }}
                                open={equipmentOpen}
                                value={equipmentValue}
                                items={equipment}
                                setOpen={setEquipmentOpen}
                                setValue={setEquipmentValue}
                                textStyle={{
                                    color: "#61FF7E",
                                }}
                                labelStyle={{
                                    fontWeight: "bold",
                                }}
                                dropDownContainerStyle={{
                                    backgroundColor: "#011638",
                                    maxHeight: 500,
                                    borderColor: "white",
                                }}
                                selectedItemContainerStyle={{
                                    backgroundColor: "black",
                                }}
                            // listItemLabelStyle={{
                            //     color: "red"
                            // }}
                            />
                        </View>
                    </View>
                    <View>
                        <TextInput>

                        </TextInput>
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
        padding: 10
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

export default CreateNewExerciseModal;
