import React,{useLayoutEffect, useEffect, useState} from "react";

import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native'

import { useNavigation, useRoute } from "@react-navigation/native";
import api from "../../service/api";
import PostItem from "../../components/PostItem";

export default function CategoryPosts(){
    const navigation = useNavigation()
    const route = useRoute()
    const [posts, setPosts] = useState([])
    const [ empty, setEmpty] = useState(false)

    useLayoutEffect(() => {
        navigation.setOptions({
            title: route.params?.title === '' ? "Categoria": route.params?.title
        })
    }, [navigation])

    useEffect(() => {
        async function loadPosts(){
            const response = await api.get(`api/categories/${route.params?.id}?fields=name&populate=posts,posts.cover`)
            setPosts(response.data?.data?.attributes?.posts?.data)
        }

        loadPosts()
    }, []);

    function handleBack(){
        navigation.goBack()
    }
    return(
        <View style={style.container}>
            {posts.length === 0 && (
                <View style={style.warningContainer}>
                    <Text style={style.warning}>
                        Essa Categoria ainda não tem post.
                    </Text>
                    <TouchableOpacity style={style.backButton} onPress={handleBack}>
                        <Text style={style.textButton}>Encontrar posts</Text>
                    </TouchableOpacity>
                </View>
            )}

            <FlatList
            style={{ flex: 1, paddingHorizontal: 18 }}
            showsHorizontalScrollIndicator={false}
            data={posts}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => <PostItem data={item} />}
            />
        </View>
    )
}

const style = StyleSheet.create({
    container:{
        flex: 1,
       padding: 18,
       backgroundColor:"#FFF"
    },
    warningContainer:{
        alignItems:'center',
    },
    warning:{
       fontSize: 16,
       fontWeight: 'bold'
    },
    backButton:{
        backgroundColor: "#122133",
        paddingVertical: 8,
        paddingHorizontal:15,
        marginTop: 12,
        borderRadius: 4,
    },
    textButton:{
        color: "#FFF",
    }
})