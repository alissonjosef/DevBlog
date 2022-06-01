import React from "react";

import {View, Text, StyleSheet} from 'react-native'

export default function Detail(){
    return(
        <View style={style.container}>
            <Text>
                Pagina Detail
            </Text>
        </View>
    )
}

const style = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})