import { useState, useEffect, useCallback } from "react";
import { Text, View, StyleSheet, Pressable, } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { TextInput } from "react-native-gesture-handler";
import Modal from "react-native-modal";
import Ionicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';


const CreateNewExerciseModal = ({
    setCreateNewExercise,
    createNewExercise,
}) => {

    // for react-native-dropdown-picker
    const [muscleValue, setMuscleValue] = useState(null);
    const [equipmentValue, setEquipmentValue] = useState(null);
    const [muscleOpen, setMuscleOpen] = useState(false);
    const [equipmentOpen, setEquipmentOpen] = useState(false);

    // new exercise name
    const [newExercise, setNewExercise] = useState('')

    const onMuscleOpen = useCallback(() => {
        setEquipmentOpen(false);
    }, []);

    const onEquipmentOpen = useCallback(() => {
        setMuscleOpen(false);
    }, []);

    clearAll = async () => {
        try {
            await AsyncStorage.clear()
        } catch (e) {
            // clear error
        }

        console.log('Done.')
    }

    const muscles = [
        { label: 'Biceps', value: 'biceps' },
        { label: 'Triceps', value: 'triceps' },
        { label: 'Chest', value: 'chest' },
        { label: 'Hamstrings', value: 'hamstrings' },
        { label: 'Quadriceps', value: 'quadriceps' },
        { label: 'Glutes', value: 'glutes' },
        { label: 'Core', value: 'core' },
        { label: 'Back', value: 'back' },
        { label: 'Calves', value: 'calves' },
        { label: 'Clear', value: 'clear' },
    ];

    const equipment = [
        { label: 'Barbell', value: 'barbell' },
        { label: 'Dumbbells', value: 'dumbbells' },
        { label: 'Cable', value: 'cable' },
        { label: 'Kettlebell', value: 'kettlebell' },
        { label: 'Bodyweight', value: 'bodyweight' },
        { label: 'Machine', value: 'machine' },
        { label: 'Other', value: 'other' },
    ];

    return (
        <Modal
            animationType="slide"
            transparent={true}
            isVisible={createNewExercise}
        >
            <View style={styles.modalCenteredView}>
                <View style={styles.createNewExerciseModalView}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 15 }}>
                        <Pressable
                            style={styles.closeExerciseModal}
                            onPress={() => {
                                // setSelectedExercises([]);
                                setCreateNewExercise(false)
                            }}
                        >
                            <Ionicons name="close-outline" color={"black"} size={35} />
                        </Pressable>
                        <Text>Create New Exercise</Text>
                        <Pressable
                            style={{ borderColor: 'black', borderWidth: 2, borderRadius: 6, padding: 10 }}
                            onPress={() => {
                                const finalNewExercise = {
                                    name: newExercise,
                                    muscle: muscleValue,
                                    equipment: equipmentValue
                                }

                                // console.log(finalNewExercise)

                                // logic that prevents savings when 
                                const storeData = async (finalNewExercise) => {
                                    try {
                                        // testing 
                                        const dataBefore = await AsyncStorage.getItem('masterExerciseList');
                                        console.log('data before', dataBefore)
                                        // end testing 

                                        const oldData = await AsyncStorage.getItem('masterExerciseList')
                                        if (oldData === null) {
                                            await AsyncStorage.setItem('masterExerciseList', JSON.stringify(finalNewExercise));

                                        } else {
                                            const updatedData = [oldData, finalNewExercise]
                                            // console.log('updatedData', updatedData)
                                            // const parsedUpdatedData = JSON.parse(updatedData)
                                            // console.log('parsedUpdatedData', parsedUpdatedData)
                                            await AsyncStorage.setItem('masterExerciseList', JSON.stringify(updatedData));
                                        }

                                        // testing 
                                        const dataAfter = await AsyncStorage.getItem('masterExerciseList');
                                        console.log('data after', dataAfter)
                                        // end testing 

                                        console.log('item saved')
                                        setCreateNewExercise(false)
                                    } catch (e) {
                                        // saving error
                                        console.log(e)
                                    }
                                };
                                storeData(finalNewExercise)

                            }}>
                            <Text>Save</Text>
                        </Pressable>
                    </View>
                    <View>
                        <Text style={{ paddingBottom: 6 }}>Name</Text>
                        <TextInput
                            style={{ borderRadius: 10, borderWidth: 2, borderColor: 'black', padding: 10, color: 'black' }}
                            onChangeText={(text) => setNewExercise(text)}
                            value={newExercise}
                            placeholder="New Exercise Name"
                        />
                    </View>
                    <View style={{ paddingBottom: 15, zIndex: 10, paddingTop: 10 }}>
                        <Text style={{ paddingBottom: 6 }}>Muscle</Text>
                        <DropDownPicker
                            style={{
                                ...(muscleValue
                                    ? styles.selectedExerciseOrEquipment
                                    : styles.noSelectedExerciseOrEquipment),
                            }}
                            open={muscleOpen}
                            onOpen={onMuscleOpen}
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

                    <View style={{ paddingBottom: 225, zIndex: 5, }}>
                        <Text style={{ paddingBottom: 6 }}>Equipment</Text>
                        <DropDownPicker
                            style={{
                                ...(equipmentValue
                                    ? styles.selectedExerciseOrEquipment
                                    : styles.noSelectedExerciseOrEquipment),
                            }}
                            open={equipmentOpen}
                            onOpen={onEquipmentOpen}
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
                        />
                    </View>
                    <View style={{ justifyContent: 'flex-end', alignItems: 'center' }}>
                        <Pressable style={{ padding: 25, borderRadius: 10, borderWidth: 2, borderColor: 'white', backgroundColor: 'red' }} onPress={clearAll}>
                            <Text style={{ color: 'white', fontSize: 20, fontWeight: 700 }}>DELETE ALL DATA</Text>
                        </Pressable>
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

export default CreateNewExerciseModal;
