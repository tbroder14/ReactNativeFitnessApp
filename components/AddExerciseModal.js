import { useState, useEffect } from "react";
import { Text, View, StyleSheet, Pressable, ScrollView, TextInput } from "react-native";
import Modal from "react-native-modal";
import { sortedExerciseList, mainData } from "./data.js";
import Ionicons from "react-native-vector-icons/Ionicons";
import DropDownPicker from "react-native-dropdown-picker";



const AddExerciseModal = ({ addExerciseModal, setAddExerciseModal }) => {

    // for react-native-dropdown-picker
    const [muscleValue, setMuscleValue] = useState(null);
    const [equipmentValue, setEquipmentValue] = useState(null);
    const [muscleOpen, setMuscleOpen] = useState(false);
    const [equipmentOpen, setEquipmentOpen] = useState(false);

    // displaying sorted list of exercises
    const [searchBarInput, setSearchBarInput] = useState("");
    const [filterExerciseList, setFilterExerciseList] = useState(sortedExerciseList);
    const [muscleSort, setMuscleSort] = useState(null);
    const [equipmentSort, setEquipmentSort] = useState(null);

    // for exercise modal
    const [exerciseModal, setExerciseModal] = useState(false);
    const [exerciseNameForModal, setExerciseNameForModal] = useState(undefined);

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
        { label: "Clear", value: "clear" }
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

    useEffect(() => {
        let filteredList = sortedExerciseList;

        // this is just for testing
        if (muscleValue == 'clear') {
            setFilterExerciseList(filteredList)
            return
        }
        // end testing

        if (equipmentValue) {
            filteredList = filteredList.filter(
                (exercise) => exercise.equipment === equipmentValue
            );
        }

        if (muscleValue) {
            filteredList = filteredList.filter(
                (exercise) => exercise.muscle === muscleValue
            );
        }

        if (searchBarInput !== "") {
            const searchInputLowerCase = searchBarInput.toLowerCase();
            filteredList = filteredList.filter((exercise) =>
                exercise.name.toLowerCase().includes(searchInputLowerCase)
            );
        }

        setFilterExerciseList(filteredList);

    }, [equipmentValue, muscleValue, searchBarInput, sortedExerciseList]);

    const Item = ({ name, handleItemPress }) => (
        <TouchableOpacity onPress={() => handleItemPress(name)}>
            <View style={styles.item}>
                <Text style={styles.title}>{name}</Text>
            </View>
        </TouchableOpacity>
    );

    const Seperator = () => (
        <View style={{ height: 1, width: '100%', backgroundColor: 'white' }}>

        </View >
    )
    return (
        <Modal
            animationType="slide"
            transparent={true}
            isVisible={addExerciseModal} >
            <View style={styles.modalCenteredView}>
                <View style={styles.addExerciseModalView}>
                    <View style={styles.topRow}>
                        <View style={styles.topRowLeftSide}>
                            <Pressable
                                style={styles.closeExerciseModal}
                                onPress={() => {
                                    setAddExerciseModal(!addExerciseModal);
                                }}>
                                <Ionicons name="close-outline" color={'white'} size={40} />
                            </Pressable>
                        </View>
                        <View style={styles.topRowRightSide}>
                            {/* // add Exercise button */}
                            <Pressable>
                                <Text>Add</Text>
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
        alignItems: "center",
    },
    addExerciseModalView: {
        backgroundColor: "#282a2f",
        borderRadius: 10,
        borderColor: "#D3D3D3",
        height: "90%",
        width: "100%",
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    topRow: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})

export default AddExerciseModal;
