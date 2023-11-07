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
            // console.log('parsed old data', parsedOldData)
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
        <Pressable style={{ padding: 12 }} key={item[0].id}>
            <View style={{ borderRadius: 10, backgroundColor: '#011638', padding: 15, borderColor: '#61FF7E', borderWidth: 3 }} >
                <Text style={{ color: 'white' }}>{item[0].workoutName}</Text>
                <Text style={{ paddingBottom: 10, color: 'white' }}>{item[0].date}</Text>
                <View style={{ flex: 1, height: 1, backgroundColor: 'white' }}></View>
                {item[0].workoutData.map((i) => (
                    <View style={{ paddingBottom: 5, paddingTop: 10 }} key={i.name}>
                        <Text style={{ fontWeight: 700, color: 'white' }}>{i.name}</Text>
                        {i.sets.map((j, index) => (
                            <Text style={{ color: 'white' }} key={index}>
                                Set {index + 1}: {j.weight} lbs x {j.reps} reps
                            </Text>
                        ))}
                    </View>
                ))}
            </View>
        </Pressable>
    );


    // const Separator = () => (
    //     <View style={{ height: 1, width: "100%", backgroundColor: "white" }}></View>
    // );

    const Footer = () => {
        return (<View style={{ alignItems: 'center', paddingBottom: 25, paddingTop: 15 }}>
            <Pressable style={{ padding: 10, borderRadius: 10, borderWidth: 2, borderColor: 'white', backgroundColor: 'red' }} onPress={deleteData}>
                <Text style={{ color: 'white', fontSize: 20, fontWeight: 700 }}>DELETE ALL HISTORY DATA</Text>
            </Pressable>
        </View>
        )
    }

    const ListHeader = () => {
        return (
            <View style={[styles.container]}>
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
            renderItem={({ item }) => <Item item={item} key={item.id} />}
            keyExtractor={(item) => item.id}
            ListHeaderComponent={<ListHeader />}
            ListHeaderComponentStyle={{ backgroundColor: "#011638" }}
            // ItemSeparatorComponent={<Separator />}
            ListFooterComponent={<Footer />}
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
