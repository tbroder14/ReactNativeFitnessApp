import React, { useCallback, useMemo, useRef } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';

const ExerciseThreeDotsBottomSheet = ({ threeDotsBottomSheetRef, deleteExerciseFunction, ExerciseName }) => {
    // ref
    // const bottomSheetRef = useRef(null);

    // variables
    const snapPoints = useMemo(() => ['50%'], []);

    const exerciseName = ExerciseName

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
                <Text>Awesome 🎉</Text>
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
                            fontSize: 26
                        }}>
                        Delete Exercise </Text>
                </Pressable>
            </View>
            <View>
                <Pressable style={{
                    padding: 25,
                    borderRadius: 6,
                    borderWidth: 2,
                }}>
                    <Text style={{ color: 'red', fontSize: 20 }}>Replace Exercise</Text>
                </Pressable>
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