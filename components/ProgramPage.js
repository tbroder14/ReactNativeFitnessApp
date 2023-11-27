import { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";

//                          to do list

//             feature roadmap

const ProgramPage = () => {

    console.log(navigation)
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
                    Program Page
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

export default ProgramPage;
