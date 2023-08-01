import { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";

//               to do list
// 
//             feature roadmap
// switch between one month, three month, and 12 month views
// weekly volume (with customizable options -> look at total/weekly volume/reps/sets for an exercise or muscle)

const HistoryPage = () => {

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
