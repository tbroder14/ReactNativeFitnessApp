import React, { useCallback, useMemo, useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    Pressable,
    TextInput,
    TouchableOpacity,
    Animated
} from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import Ionicons from "react-native-vector-icons/Ionicons";
import DraggableFlatList, {
    ScaleDecorator,
} from "react-native-draggable-flatlist";
import Collapsible from "react-native-collapsible";
import AddExerciseToWorkoutOrTemplateModal from "./AddExerciseToWorkoutOrTemplateModal";
import { useStore } from "../src/store.js";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { RectButton } from "react-native-gesture-handler";

const NewTemplate = ({
    newTemplateBottomSheetRef,
    addExerciseModal,
    setAddExerciseModal,
    workoutExercises,
    setWorkoutExercises,
    templateExercises,
    setTemplateExercises,
    templateData,
    setTemplateData,
}) => {
    // ref
    // const bottomSheetRef = useRef(null);

    const comingFromNewTemplate = useStore(
        (state) => state.comingFromNewTemplate
    );
    const toggleComingFromNewTemplate = useStore(
        (state) => state.toggleComingFromNewTemplate
    );
    const [collapseHandler, setCollapseHandler] = useState(false);

    // variables
    const snapPoints = useMemo(() => ["100%"], []);

    // callbacks
    const handleSheetChanges = useCallback((index) => {
        // console.log('handleSheetChanges', index);
    }, []);

    const closeBottomSheet = () => {
        newTemplateBottomSheetRef.current.close();
    };
    // renders

    useEffect(() => {
        // determines if any exercises in workoutExercise aren't formatted properly
        let newExercise = templateExercises.filter(
            (exercise) =>
                !templateData.some((exercise2) => exercise2.name === exercise.name)
        );

        // formats new exercises to proper format with sets
        newExercise.forEach((i) => {
            i.sets = [
                {
                    weight: "50",
                    reps: "10",
                    distance: "0",
                    seconds: "0",
                    notes: "",
                    complete: false,
                },
            ];
        });

        const exerciseToBeRemoved = templateData.filter(
            (exercise) =>
                !templateExercises.some((exercise2) => exercise2.name === exercise.name)
        );
        const filteredWorkoutData = templateData.filter(
            (exercise) =>
                !exerciseToBeRemoved.some(
                    (exercise2) => exercise2.name === exercise.name
                )
        );
        const updatedWorkoutData = [...filteredWorkoutData, ...newExercise];
        setTemplateData(updatedWorkoutData);
    }, [templateExercises]);

    const addSet = (exerciseName) => {
        console.log('add set')
        copyOfTemplateData = templateData.map((i) => {
            if (exerciseName === i.name) {
                const newSet = {
                    weight: "50",
                    reps: "8",
                    distance: "0",
                    seconds: "0",
                    notes: "",
                    complete: false,
                };

                const newObj = {
                    equipment: i.equipment,
                    muscle: i.muscle,
                    name: i.name,
                    sets: [...i.sets, newSet],
                };
                return newObj;
            } else {
                return i;
            }
        });

        setTemplateData(copyOfTemplateData);
    };

    // swipeable functionality to delete one set in an exercise
    const renderRightActions = (progress, dragX) => {
        const trans = progress.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0],
        });

        const pressHandler = () => { };

        return (
            <Animated.View style={{ flex: 1, transform: [{ translateX: trans }] }}>
                <RectButton
                    style={{
                        alignItems: "center",
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "flex-end",
                        backgroundColor: "red",
                    }}
                >
                    <Text
                        style={{
                            color: "white",
                            fontSize: 16,
                            backgroundColor: "transparent",
                            padding: 10,
                        }}
                    >
                        Delete
                    </Text>
                </RectButton>
            </Animated.View>
        );
    };

    // this will delete a set after a swipeable action
    const removeThis = (item, sets, index) => {
        const setIndex = index;
        const exerciseName = item.name;
        const copyOfTemplateData = [...templateData];

        copyOfTemplateData.forEach((i) => {
            if (i.name === exerciseName) {
                i.sets.forEach((j, index) => {
                    if (index === setIndex) {
                        i.sets.splice(setIndex, 1);
                    }
                });
            }
        });

        setTemplateData(copyOfTemplateData);
    };

    function BottomSheetFooterComponents({
        setWorkoutExercises,
        workoutExercises,
        addExerciseModal,
        setAddExerciseModal,
        templateExercises,
        setTemplateExercises,
        templateData,
        setTemplateData,
    }) {
        // const cancelWorkout = () => {
        //     if (workoutData.length === 0) {
        //         closeBottomSheet();
        //     } else {
        //         // setCancelWorkoutConfirmationModal(true);
        //     }
        // };

        return (
            <View style={{ padding: 20, gap: 25 }}>
                <Pressable
                    style={{
                        borderRadius: 8,
                        backgroundColor: "blue",
                        padding: 10,
                    }}
                    onPress={() => {
                        setAddExerciseModal(true);
                        setTemplateExercises(templateData);
                        toggleComingFromNewTemplate(true)
                    }}
                >
                    <Text style={{ color: "white", fontSize: 18, textAlign: "center" }}>
                        Add Exercise
                    </Text>
                </Pressable>

                {/* <Pressable
                    style={{
                        borderRadius: 8,
                        backgroundColor: "red",
                        padding: 10,
                        marginBottom: 100,
                    }}
                    onPress={() => cancelWorkout()}
                >
                    <Text style={{ color: "white", fontSize: 18, textAlign: "center" }}>
                        Cancel Workout
                    </Text>
                </Pressable> */}
                <AddExerciseToWorkoutOrTemplateModal
                    addExerciseModal={addExerciseModal}
                    setAddExerciseModal={setAddExerciseModal}
                    workoutExercises={workoutExercises}
                    setWorkoutExercises={setWorkoutExercises}
                    templateExercises={templateExercises}
                    setTemplateExercises={setTemplateExercises}
                    templateData={templateData}
                    setTemplateData={setTemplateData}
                />
            </View>
        );
    }

    // Flatlist data items structure/functionality and style
    const draggableItem = ({ item, drag, isActive }) => {
        function onChangeWeight(weight, index, item) {
            const exerciseName = item.name;
            const setIndex = index;
            const copyOfTemplateData = [...templateData];

            const updatedData = copyOfTemplateData.map((i) => {
                if (exerciseName === i.name) {
                    const updatedSets = i.sets.map((set, index) => {
                        if (index === setIndex) {
                            return { ...set, weight: weight };
                        }
                        return set;
                    });
                    return {
                        ...i,
                        sets: updatedSets,
                    };
                }
                return i;
            });

            setTemplateData(updatedData);
        }

        function onChangeReps(reps, index, item) {
            const exerciseName = item.name;
            const setIndex = index;
            const copyOfTemplateData = [...templateData];

            const updatedData = copyOfTemplateData.map((i) => {
                if (exerciseName === i.name) {
                    const updatedSets = i.sets.map((set, index) => {
                        if (index === setIndex) {
                            return { ...set, reps: reps };
                        }
                        return set;
                    });
                    return {
                        ...i,
                        sets: updatedSets,
                    };
                }
                return i;
            });

            setTemplateData(updatedData);
        }

        // const collapseHandlerFunction = () => {
        //   drag
        //   setCollapseHandler(true)
        // }

        const updateTemplateDataAfterDragEnd = (templateData) => {
            console.log(templateData);
        };

        return (
            <ScaleDecorator>
                <View style={{ paddingBottom: 20, backgroundColor: "#011638" }}>
                    <View
                        style={{
                            paddingRight: 20,
                            paddingLeft: 20,
                            marginBottom: 20,
                            flex: 1,
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <TouchableOpacity
                            onLongPress={() => {
                                setCollapseHandler(true);
                                setTimeout(() => {
                                    drag();
                                }, 300);
                            }}
                            disabled={isActive}
                        >
                            <Text style={styles.exerciseTitle}>{item.name}</Text>
                        </TouchableOpacity>
                        <Pressable
                            onPress={() => {
                                exerciseThreeDotsOptions(item);
                                setExerciseForThreeDotsBS(item.name);
                                setTemplateData([]);
                                setTemplateExercises([]);
                            }}
                        >
                            <Ionicons
                                name="ellipsis-horizontal-outline"
                                size={30}
                                color={"white"}
                            />
                        </Pressable>
                    </View>
                    <Collapsible collapsed={collapseHandler}>
                        <View
                            style={{
                                flexDirection: "row",
                                width: "100%",
                                paddingLeft: 20,
                                paddingRight: 20,
                                marginBottom: 10,
                            }}
                        >
                            <Text
                                style={{
                                    color: "white",
                                    fontWeight: "bold",
                                    width: "10%",
                                    textAlign: "center",
                                    fontSize: 16,
                                }}
                            >
                                Set
                            </Text>
                            <Text
                                style={{
                                    color: "white",
                                    fontWeight: "bold",
                                    width: "35%",
                                    textAlign: "center",
                                    fontSize: 16,
                                }}
                            >
                                Previous
                            </Text>
                            <Text
                                style={{
                                    color: "white",
                                    fontWeight: "bold",
                                    width: "22.5%",
                                    textAlign: "center",
                                    fontSize: 16,
                                }}
                            >
                                +lbs
                            </Text>
                            <Text
                                style={{
                                    color: "white",
                                    fontWeight: "bold",
                                    width: "22.5%",
                                    textAlign: "center",
                                    fontSize: 16,
                                }}
                            >
                                Reps
                            </Text>
                            <Text
                                style={{
                                    color: "white",
                                    fontWeight: "bold",
                                    width: "10%",
                                    fontSize: 16,
                                    textAlign: "right",
                                }}
                            >
                                CM
                            </Text>
                        </View>
                        {item.sets?.map((sets, index) => (
                            <Swipeable
                                renderRightActions={renderRightActions}
                                onSwipeableWillOpen={() => removeThis(item, sets, index)}
                                rightThreshold={250}
                                style={{
                                    backgroundColor: "#011638",
                                }}
                            >
                                <View
                                    style={{
                                        flexDirection: "row",
                                        width: "100%",
                                        paddingLeft: 20,
                                        paddingRight: 20,
                                        backgroundColor: sets.complete ? "green" : "#011638",
                                        paddingTop: 8,
                                        paddingBottom: 8,
                                        alignItems: "center",
                                    }}
                                >
                                    <Text
                                        style={[
                                            styles.setColumn,
                                            sets.complete
                                                ? { color: "white" }
                                                : styles.setColumnSetNotComplete,
                                        ]}
                                    >
                                        {index + 1}
                                    </Text>
                                    <Text
                                        style={{
                                            color: "white",
                                            fontWeight: "bold",
                                            width: "35%",
                                            textAlign: "center",
                                        }}
                                    >
                                        60x8
                                    </Text>
                                    <TextInput
                                        style={[
                                            styles.weightColumn,
                                            sets.complete
                                                ? { color: "white" }
                                                : styles.weightColumnSetNotComplete,
                                        ]}
                                        onChangeText={(weight) =>
                                            onChangeWeight(weight, index, item)
                                        }
                                        value={sets.weight}
                                        placeholder={sets.weight}
                                        keyboardType="numeric"
                                        maxLength={999}
                                    />
                                    <TextInput
                                        style={[
                                            styles.repsColumn,
                                            sets.complete
                                                ? { color: "white" }
                                                : styles.repsColumnSetNotComplete,
                                        ]}
                                        onChangeText={(reps) => onChangeReps(reps, index, item)}
                                        value={sets.reps}
                                        placeholder={sets.reps}
                                        keyboardType="numeric"
                                    />
                                    <View style={{ width: "10%", justifyContent: 'right', backgroundColor: '#011638' }}>
                                        <Text
                                            style={{
                                                color: "white",
                                                fontWeight: "bold",
                                                textAlign: "right",
                                            }}>
                                            --
                                        </Text>
                                    </View>
                                    {/* fontWeight: "bold",
                                    width: "10%",
                                    fontSize: 16,
                                    textAlign: "right",
                                    padding: 10,
                                    borderRadius: 6, */}
                                    {/* <BouncyCheckbox
                                        style={styles.bouncyCheckmark}
                                        isChecked={sets.complete}
                                        disableText={true}
                                        onPress={() => handleCheckboxChange(item, index)}
                                        innerIconStyle={{
                                            borderRadius: 4,
                                            borderWidth: 2,
                                        }}
                                        iconStyle={{
                                            borderRadius: 6,
                                        }}
                                        unfillColor="white"
                                        fillColor="#61FF7E"

                                    // text="Custom Checkbox"
                                    // iconStyle={{ borderColor: "red" }}
                                    // innerIconStyle={{ borderWidth: 2 }}
                                    // textStyle={{ fontFamily: "JosefinSans-Regular" }}
                                    /> */}
                                </View>
                            </Swipeable>
                        ))}
                        <Pressable
                            style={{
                                margin: 10,
                                paddingLeft: 160,
                                paddingRight: 50,
                                paddingTop: 13,
                                paddingBottom: 13,
                                borderRadius: 10,
                                borderWidth: 1,
                                borderColor: "#61FF7E",
                                backgroundColor: "#61FF7E",
                            }}
                            onPress={() => addSet(item.name)}
                        >
                            <Text style={{ color: "#011638", fontWeight: "bold" }}>
                                Add Set
                            </Text>
                        </Pressable>
                    </Collapsible>
                </View>
            </ScaleDecorator >
        );
    };

    return (
        <BottomSheet
            ref={newTemplateBottomSheetRef}
            index={-1}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
            enableContentPanningGesture={false}
            enableHandlePanningGesture={false}
            handleIndicatorStyle={{ display: "none" }}
            backgroundStyle={{ backgroundColor: "#011638" }}
        >
            <View style={styles.contentContainer}>
                <View style={{ padding: 20 }}></View>
                <View>
                    <View
                        style={{
                            flexDirection: "row",
                            gap: 60,
                            justifyContent: "center",
                            alignItems: "center",
                            paddingTop: 10,
                            paddingLeft: 20,
                            paddingRight: 20,
                            marginBottom: 20,
                        }}
                    >
                        <Pressable
                            style={{
                                borderRadius: 10,
                                borderWidth: 2,
                                backgroundColor: "#61FF7E",
                                padding: 10,
                            }}
                            onPress={closeBottomSheet}
                        >
                            <Ionicons name="close-outline" color={"#011638"} size={25} />
                        </Pressable>
                        <Text style={{ color: "white", fontSize: 20 }}>New Template</Text>

                        <Pressable
                            style={{
                                borderRadius: 10,
                                padding: 15,
                                borderWidth: 2,
                                borderColor: "white",
                            }}
                        >
                            <Text style={{ color: "white" }}>Save</Text>
                        </Pressable>
                    </View>
                    <View
                        style={{ flexDirection: "row", gap: 15, justifyContent: "center", marginBottom: 15 }}
                    >
                        <Text
                            style={{
                                fontSize: 15,
                                color: "white",
                                textAlign: "center",
                                marginLeft: 10,
                                justifyContent: "center",
                            }}
                        >
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
                                marginRight: 20,
                                flex: 1,
                                textAlign: "center",
                            }}
                            value={"Template Name"}
                        // onChange={onChangeWorkoutName}
                        // placeholder={currentWorkoutName}
                        />
                    </View>
                    <DraggableFlatList
                        data={templateData}
                        // onDragEnd={updateTemplateDataAfterDragEnd(templateData)}
                        onDragEnd={() => setCollapseHandler(false)}
                        keyExtractor={(item) => item.name}
                        renderItem={draggableItem}
                        // ItemSeparatorComponent={<Separator />}
                        ListFooterComponent={() => (
                            <BottomSheetFooterComponents
                                addExerciseModal={addExerciseModal}
                                setAddExerciseModal={setAddExerciseModal}
                                workoutExercises={workoutExercises}
                                setWorkoutExercises={setWorkoutExercises}
                                templateExercises={templateExercises}
                                setTemplateExercises={setTemplateExercises}
                                templateData={templateData}
                                setTemplateData={setTemplateData}
                            />
                        )}
                    />
                </View>
            </View>
        </BottomSheet>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "green",
    },
    contentContainer: {
        alignItems: "center",
        flex: 1,
    },
    exerciseItem: {
        padding: 16,
        backgroundColor: "red",
    },
    exerciseTitle: {
        fontSize: 18,
        color: "white",
        fontWeight: "bold",
    },
    setColumn: {
        color: "#011638",
        fontWeight: "bold",
        width: "10%",
        paddingLeft: 8,
        fontSize: 16,
        overflow: "hidden",
        padding: 6,
        marginRight: 5,
        textAlign: "center",
    },
    setColumnSetNotComplete: {
        backgroundColor: "#61FF7E",
        borderWidth: 0,
        borderRadius: 6,
    },
    weightColumn: {
        fontWeight: "bold",
        width: "20%",
        textAlign: "center",
        paddingTop: 6,
        paddingBottom: 6,
        marginRight: 5,
        color: "#011638",
    },
    weightColumnSetNotComplete: {
        backgroundColor: "#61FF7E",
        borderColor: "red",
        borderRadius: 8,
    },
    repsColumn: {
        color: "#011638",
        fontWeight: "bold",
        width: "20%",
        textAlign: "center",
        // padding: 6,
        paddingTop: 6,
        paddingBottom: 6,
        marginRight: 5,
    },
    repsColumnSetNotComplete: {
        backgroundColor: "#61FF7E",
        borderColor: "red",
        borderRadius: 8,
    },
    bouncyCheckmark: {
        fontWeight: "bold",
        width: "10%",
        fontSize: 16,
        textAlign: "right",
        padding: 10,
        borderRadius: 6,
    },
});

export default NewTemplate;
