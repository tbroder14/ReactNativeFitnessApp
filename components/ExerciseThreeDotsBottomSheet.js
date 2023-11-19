import React, { useCallback, useMemo, useRef } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { useStore } from "../src/store.js";

const ExerciseThreeDotsBottomSheet = ({ threeDotsBottomSheetRef, deleteExerciseFunction, ExerciseName }) => {
    // ref
    // const bottomSheetRef = useRef(null);

    // variables
    const snapPoints = useMemo(() => ['50%'], []);

    const exerciseName = ExerciseName

    const comingFromReplaceExercise = useStore((state) => state.comingFromReplaceExercise);
    const toggleComingFromReplaceExercise = useStore((state) => state.toggleComingFromReplaceExercise);

    // callbacks
    const handleSheetChanges = useCallback((index) => {
        // console.log('handleSheetChanges', index);
    }, []);

    // renders
    return (

        <BottomSheet
            ref={threeDotsBottomSheetRef}
            index={-1}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
            enablePanDownToClose
        >
            <View style={styles.contentContainer}>
                <View style={{ padding: 10 }}>
                    <Pressable
                        style={{
                            padding: 25,
                            borderRadius: 6,
                            borderWidth: 2,
                        }}
                        onPress={() => deleteExerciseFunction(exerciseName)}>
                        <Text
                            style={{
                                color: 'red',
                                fontSize: 20
                            }}>
                            Delete Exercise </Text>
                    </Pressable>
                </View >
                <View style={{ padding: 10 }}>
                    <Pressable style={{
                        padding: 25,
                        borderRadius: 6,
                        borderWidth: 2,
                    }}
                        onPress={() => toggleComingFromReplaceExercise(true)}
                    >
                        <Text style={{ color: 'red', fontSize: 20 }}>Replace Exercise</Text>
                    </Pressable>
                </View>
            </View>

        </BottomSheet>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
    },
    contentContainer: {
        alignItems: 'center',
        flex: 1
    },
});

export default ExerciseThreeDotsBottomSheet;