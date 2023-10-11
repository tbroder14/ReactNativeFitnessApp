import { useState, useEffect } from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from "react";

//               to do list
// 
//             feature roadmap
// switch between one month, three month, and 12 month views
// weekly volume (with customizable options -> look at total/weekly volume/reps/sets for an exercise or muscle)

const HistoryPage = () => {
    const [historyData, setHistoryData] = useState([])

    useFocusEffect(

        useCallback(() => {
            const getData = async () => {
                try {
                    const jsonValue = await AsyncStorage.getItem('history');
                    const data = jsonValue != null ? JSON.parse(jsonValue) : null;
                    setHistoryData(jsonValue)
                    console.log('retrieved data')
                    console.log(historyData)
                } catch (e) {
                    // error reading value
                    console.log(e)
                }
            };

            getData()
        }, [historyData])
    );

    clearAll = async () => {
        try {
            await AsyncStorage.clear()
        } catch (e) {
            // clear error
        }

        console.log('Done.')
    }

    return (
        <View style={[styles.container]}>
            <View style={{ height: 20 }}></View>
            <View style={{ marginBottom: 10 }}>
                <Text
                    style={{
                        color: "#D3D3D3",
                        fontSize: 40,
                        // paddingLeft: 20,
                        paddingBottom: 10,
                        textAlign: 'center'
                    }}
                >
                    History Page
                </Text>
            </View>
            <View>
                <Text>{historyData[0]["workoutName"]}</Text>
            </View>
            <View style={{ justifyContent: 'flex-end', alignItems: 'center' }}>
                <Pressable style={{ padding: 25, borderRadius: 10, borderWidth: 2, borderColor: 'white', backgroundColor: 'red' }} onPress={clearAll}>
                    <Text style={{ color: 'white', fontSize: 20, fontWeight: 700 }}>DELETE ALL DATA</Text>
                </Pressable>
            </View>


        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        backgroundColor: "#D3D3D3",
        padding: 20,
        marginVertical: 4,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 16,
        color: "#011638",
    },
});

export default HistoryPage;
