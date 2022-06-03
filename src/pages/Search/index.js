import React, { useState,useEffect } from "react";

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Keyboard,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import api from '../../service/api'
import PostItem from "../../components/PostItem";

export default function Search() {
  const [input, setInput] = useState('');
  const [ posts, setPosts] = useState([])
  const [ empty, setEmpty] = useState(false)

 async function handleSearchInput() {
    if(input === ''){
        alert('Digite algum nome!')
        return
    }

    const response = await api.get(`api/posts?filters[title][$containsi]=${input}&populate=cover`)

    if( response.data?.data.length === 0){
        setEmpty(true)
        setPosts([])
        return
    }
     setPosts(response.data?.data)
     setEmpty(false)
     setInput('')
     Keyboard.dismiss()
    
  }

 useEffect(() => {
     
 }, []);

  return (
    <View style={style.container}>
      <View style={style.containerInput}>
        <TextInput
          value={input}
          onChangeText={(text) => setInput(text)}
          style={style.input}
          placeholder="O que está buscando"
        />
        <TouchableOpacity
          style={style.searchButton}
          onPress={handleSearchInput}
        >
          <Feather name="search" size={25} color="#000" />
        </TouchableOpacity>
      </View>

      {empty && (
          <View>
              <Text style={style.emptyText}>
                  Ops não nenhum post encontrado...
              </Text>
          </View>
      )}

      <FlatList
      style={{flex: 1}}
      showsHorizontalScrollIndicator={false}
      data={posts}
      keyExtractor={ (item) => String(item.id)}
      renderItem={({item}) => <PostItem data={item}/>}
      />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    padding: 18,
  },
  containerInput: {
    flexDirection: "row",
    width: "100%",
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  input: {
    width: "85%",
    backgroundColor: "#C4C4C4",
    height: 45,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    padding: 8,
    fontSize: 16,
  },
  searchButton: {
    width: "15%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#C4C4C4",
    height: 45,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    marginLeft: -1,
  },
  emptyText:{
      textAlign: 'center',
      justifyContent: 'center',
      alignItems: 'center'
  }
});
