import { useState, useEffect } from "react";
import { Text, View, StyleSheet, Pressable, FlatList } from "react-native";
import Modal from "react-native-modal";
import Ionicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ExercisePage = ({ exerciseModal, setExerciseModal, exerciseNameForModal, setExerciseNameForModal }) => {
    const [exerciseData, setExerciseData] = useState([])

    useEffect(() => {
        singleExerciseData()
    }, [])

    const singleExerciseData = async () => {
        try {
            const oldData = await AsyncStorage.getItem('history')
            const parsedHistoryData = JSON.parse(oldData)
            setExerciseData(parsedHistoryData)
        } catch (e) {
            // saving error
            console.log(e)
        }
    };

    const filteredData = exerciseData.reduce((result, workout) => {
        const filteredWorkoutData = workout[0].workoutData.filter(exercise => exercise.name === exerciseNameForModal);

        if (filteredWorkoutData.length > 0) {
            result.push({
                date: workout[0].date,
                workoutName: workout[0].workoutName,
                workoutData: filteredWorkoutData
            });
        }
        return result;
    }, []);

    const Item = ({ item }) => (
        <Pressable style={{ padding: 15 }}>
            <View style={{ borderRadius: 10, backgroundColor: '#011638', padding: 15, borderColor: '#61FF7E', borderWidth: 3 }}>
                <Text style={{ color: 'white' }}>{item.workoutName}</Text>
                <Text style={{ paddingBottom: 10, color: 'white' }}>{item.date}</Text>
                <View style={{ flex: 1, height: 1, backgroundColor: 'white' }}></View>
                {item.workoutData.map((i) => (
                    <View style={{ paddingTop: 10 }} key={item.date}>
                        {i.sets.map((j, setIndex) => (
                            <Text key={setIndex} style={{ color: 'white' }}>
                                Set {setIndex + 1}: {j.weight} lbs x {j.reps} reps
                            </Text>
                        ))}
                    </View>
                )
                )}
            </View>
        </Pressable>
    );

    // const Separator = () => (
    //     <View style={{ height: 1, width: "100%", backgroundColor: "white" }}></View>
    // );

    // const Footer = () => {
    //     <View style={{ alignItems: 'center' }}>
    //         <Pressable style={{ padding: 10, borderRadius: 10, borderWidth: 2, borderColor: 'white', backgroundColor: 'red' }} onPress={deleteData}>
    //             <Text style={{ color: 'white', fontSize: 20, fontWeight: 700 }}>DELETE ALL DATA</Text>
    //         </Pressable>
    //     </View>
    // }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            isVisible={exerciseModal}
        >
            <View style={styles.modalCenteredView}>
                <View style={styles.createNewExerciseModalView}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
                        <View style={{ justifyContent: 'center' }}>
                            <Text style={{ color: 'white' }}>EDIT</Text>
                        </View>
                        <View style={{ justifyContent: 'center' }}>
                            <Text style={{ color: 'white', fontSize: 15, fontWeight: 700 }}>{exerciseNameForModal}</Text>
                        </View>
                        <Pressable
                            style={{ borderColor: 'white', borderWidth: 2, borderRadius: 6, padding: 2 }}
                            onPress={() => {
                                setExerciseModal(false)
                                setExerciseNameForModal(undefined)
                            }}>
                            <Ionicons name="close-outline" color={"white"} size={35} />
                        </Pressable>
                    </View>
                    <View style={{ height: 1, backgroundColor: 'white' }}></View>
                    <FlatList
                        style={{ marginTop: 10 }}
                        data={filteredData}
                        // stickyHeaderIndices={[0]}
                        renderItem={({ item }) => <Item item={item} />}
                        keyExtractor={(item) => item.date}
                    // ListHeaderComponent={<ListHeader />}
                    // ListHeaderComponentStyle={{ backgroundColor: "#011638" }}
                    // ItemSeparatorComponent={<Separator />}
                    // ListFooterComponent={<Footer />}
                    // ListFooterComponentStyle={{}}
                    />
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
        backgroundColor: "#011638",
        borderRadius: 10,
        borderColor: "#D3D3D3",
        height: "85%",
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
