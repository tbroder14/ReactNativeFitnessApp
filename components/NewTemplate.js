import React, { useCallback, useMemo, useRef, } from 'react';
import { View, Text, StyleSheet, Pressable, TextInput } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import Ionicons from "react-native-vector-icons/Ionicons";
import DraggableFlatList, { ScaleDecorator, } from "react-native-draggable-flatlist";
import Collapsible from 'react-native-collapsible';

const NewTemplate = ({ newTemplateBottomSheetRef }) => {
    // ref
    // const bottomSheetRef = useRef(null);

    // variables
    const snapPoints = useMemo(() => ['100%'], []);

    // callbacks
    const handleSheetChanges = useCallback((index) => {
        // console.log('handleSheetChanges', index);
    }, []);


    const closeBottomSheet = () => {
        newTemplateBottomSheetRef.current.close()
    }
    // renders
    return (

        <BottomSheet
            ref={newTemplateBottomSheetRef}
            index={-1}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
            enableContentPanningGesture={false}
            enableHandlePanningGesture={false}
            handleIndicatorStyle={{ display: "none" }}
            backgroundStyle={{ backgroundColor: '#011638' }}
        >
            <View style={styles.contentContainer}>
                <View style={{ padding: 20 }}></View>
                <View >
                    <View style={{
                        flexDirection: "row",
                        gap: 55,
                        justifyContent: "center",
                        alignItems: "center",
                        paddingTop: 10,
                        paddingLeft: 20,
                        paddingRight: 20,
                        marginBottom: 20,
                    }}>
                        <Pressable
                            style={{ borderRadius: 10, borderWidth: 2, backgroundColor: '#61FF7E', padding: 10 }}
                            onPress={closeBottomSheet}
                        >
                            <Ionicons name="close-outline" color={"#011638"} size={25} />

                        </Pressable>
                        <Text style={{ color: 'white', fontSize: 20 }}>New Template</Text>

                        <Pressable style={{ borderRadius: 10, padding: 15, borderWidth: 2, borderColor: 'white' }}>
                            <Text style={{ color: 'white' }}>Save</Text>
                        </Pressable>
                    </View>
                    <View style={{ flexDirection: 'row' }} >
                        <Text style={{ fontSize: 15, color: "white", textAlign: "center" }}>
                            Workout {"\n"} Name
                        </Text>
                        <TextInput
                            style={{
                                fontSize: 18,
                                color: "white",
                                borderColor: "white",
                                borderRadius: 10,
                                borderWidth: 2,
                                paddingTop: 15,
                                paddingBottom: 15,
                                paddingRight: 15,
                                paddingLeft: 15,
                                flex: 1,
                                textAlign: 'center'
                            }}
                            value={'Template Name'}
                        // onChange={onChangeWorkoutName}
                        // placeholder={currentWorkoutName}
                        />
                    </View>
                    <View>
                        <Pressable
                            style={{
                                borderRadius: 8,
                                backgroundColor: "blue",
                                padding: 10,
                            }}
                            onPress={() => {
                                //     setAddExerciseModal(!addExerciseModal)
                                //     setWorkoutExercises(workoutData)
                                console.log('add exercises here')
                            }}
                        >
                            <Text style={{ color: "white", fontSize: 18, textAlign: "center" }}>
                                Add Exercise
                            </Text>
                        </Pressable>
                    </View>
                    <View>
                        {/* <DraggableFlatList
                            data={templateData}
                            // onDragEnd={updateWorkoutDataAfterDragEnd(workoutData)}
                            onDragEnd={() => setCollapseHandler(false)}
                            keyExtractor={(item) => item.name}
                            renderItem={draggableItem}
                        // ItemSeparatorComponent={<Separator />}
                        // ListFooterComponent={() =>
                        //     <BottomSheetFooterComponents
                        //         setAddExerciseModal={setAddExerciseModal}
                        //         addExerciseModal={addExerciseModal}
                        //         bottomSheetRef={bottomSheetRef}
                        //         setWorkoutExercises={setWorkoutExercises}
                        //         workoutExercises={workoutExercises}
                        //         setWorkoutData={setWorkoutData}
                        //         workoutData={workoutData}
                        //         setCancelWorkoutConfirmationModal={setCancelWorkoutConfirmationModal}
                        //         closeBottomSheet={closeBottomSheet}
                        //     />
                        // }
                        /> */}
                    </View>
                </View>
            </View>
        </BottomSheet >
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'green',
    },
    contentContainer: {
        alignItems: 'center',
        flex: 1
    },
});

export default NewTemplate;