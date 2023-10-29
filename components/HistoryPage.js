import { useState, useEffect } from "react";
import { Text, View, StyleSheet, Pressable, FlatList, TouchableOpacity } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

//               to do list
// HOW DO I RERENDER THIS PAGE WHEN A WORKOUT IS SAVED IN SAVEWORKOUTCONFIRMATIONMODAL? 
// 
//             feature roadmap
// switch between one month, three month, and 12 month views
// weekly volume (with customizable options -> look at total/weekly volume/reps/sets for an exercise or muscle)

const HistoryPage = () => {
    const [historyData, setHistoryData] = useState([])

    useEffect(() => {
        completeWorkoutHistory()
    }, [])

    const completeWorkoutHistory = async () => {
        try {
            const oldData = await AsyncStorage.getItem('history')
            const parsedOldData = JSON.parse(oldData)
            console.log('parsed old data', parsedOldData)
            setHistoryData(parsedOldData)
        } catch (e) {
            // saving error
            console.log(e)
        }
    };

    deleteData = async () => {
        try {
            await AsyncStorage.removeItem('history')
        } catch (e) {
            // remove error
        }

        console.log('All history data has been deleted.')
    }
    const Item = ({ item }) => (
        <TouchableOpacity style={{ padding: 15 }}>
            <View style={{ borderRadius: 10, backgroundColor: 'white', padding: 15, borderColor: 'red', borderWidth: 3 }}>
                <Text>{item[0].workoutName}</Text>
                <Text>{item[0].date}</Text>
                {item[0].workoutData.map((i) => (
                    <View style={{ paddingBottom: 10 }}>
                        <Text>{i.name}</Text>
                        <Text>{i.equipment}</Text>
                        {i.sets.map((j) => (
                            <Text>
                                {j.reps}
                                {j.weight}
                            </Text>
                        ))}
                    </View>
                ))}
            </View>
        </TouchableOpacity>
    );


    const Separator = () => (
        <View style={{ height: 1, width: "100%", backgroundColor: "white" }}></View>
    );

    // const Footer = () => {
    //     <View style={{ alignItems: 'center' }}>
    //         <Pressable style={{ padding: 10, borderRadius: 10, borderWidth: 2, borderColor: 'white', backgroundColor: 'red' }} onPress={deleteData}>
    //             <Text style={{ color: 'white', fontSize: 20, fontWeight: 700 }}>DELETE ALL DATA</Text>
    //         </Pressable>
    //     </View>
    // }

    const ListHeader = () => {
        return (
            <View style={[styles.container]}>
                <View style={{ alignItems: 'center' }}>
                    <Pressable style={{ padding: 10, borderRadius: 10, borderWidth: 2, borderColor: 'white', backgroundColor: 'red' }} onPress={deleteData}>
                        <Text style={{ color: 'white', fontSize: 20, fontWeight: 700 }}>DELETE DATA</Text>
                    </Pressable>
                </View>
                <View style={{}}>
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

            </View>
        );
    };


    return (
        <FlatList
            style={{ marginTop: 10 }}
            data={historyData}
            stickyHeaderIndices={[0]}
            renderItem={({ item }) => <Item item={item} />}
            keyExtractor={(item) => item.workoutName}
            ListHeaderComponent={<ListHeader />}
            ListHeaderComponentStyle={{ backgroundColor: "#011638" }}
            ItemSeparatorComponent={<Separator />}
        // ListFooterComponent={<Footer />}
        // ListFooterComponentStyle={{}}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 0
    },
    item: {
        backgroundColor: "#D3D3D3",
        padding: 20,
        // marginVertical: 4,
        // marginHorizontal: 16,
    },
    title: {
        fontSize: 16,
        color: "red",
        backgroundColor: 'green',
        padding: 20
    },
});

export default HistoryPage;
