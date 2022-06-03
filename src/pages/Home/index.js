import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  Button,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import api from "../../service/api";

import CategoryItem from "../../components/CategoryItem";
import { getFavorite, setFavorite } from "../../service/favorite";
import FavoritePost from "../../components/FavoritePost";
import PostItem from "../../components/PostItem";
import * as Animatable from 'react-native-animatable'

const FlatListAnimated = Animatable.createAnimatableComponent(FlatList)

export default function Home() {
  const navigation = useNavigation();
  const [categories, setCategories] = useState([]);
  const [favCategory, setFavCategory] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadData() {
      await getListPosts();

      const category = await api.get("/api/categories?populate=icon");
      setCategories(category.data.data);
    }

    loadData();
  }, []);

  async function getListPosts() {
    setLoading(true);
    const response = await api.get(
      "api/posts?populate=cover&sort=createdAt:desc"
    );
    setPosts(response.data.data);
    setLoading(false);
  }

  useEffect(() => {
    async function favorite() {
      const response = await getFavorite();
      setFavCategory(response);
    }
  }, []);

  async function handleFavorite(id) {
    const response = await setFavorite(id);
    setFavCategory(response);
  }

  return (
    <SafeAreaView style={style.container}>
      <View style={style.header}>
        <Animatable.Text animation='fadeInLeft' style={style.name}>DevBlog</Animatable.Text>
        <TouchableOpacity onPress={() => navigation.navigate("Search")}>
          <Feather name="search" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>

      <FlatListAnimated
        animation='flipInX'
        delay={500}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        contentContainerStyle={{ paddingRight: 12 }}
        style={style.categories}
        data={categories}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <CategoryItem data={item} favorite={() => handleFavorite(item.id)} />
        )}
      />

      <View style={style.main}>
        {favCategory.length !== 0 && (
          <FlatList
            style={{ marginTop: 50, maxHeight: 100, paddingStart: 18 }}
            contentContainerStyle={{ paddingEnd: 18 }}
            data={favCategory}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => <FavoritePost data={item} />}
          />
        )}

        <Text
          style={[style.title, { marginTop: favCategory.length > 0 ? 14 : 46 }]}
        >
          Conteudo em alta
        </Text>

        <FlatList
          style={{ flex: 1, paddingHorizontal: 18 }}
          showsHorizontalScrollIndicator={false}
          data={posts}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => <PostItem data={item} />}
          refreshing={loading}
          onRefresh={() => getListPosts()}
        />
      </View>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#232630",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 18,
    marginTop: 18,
    marginBottom: 24,
  },
  name: {
    fontSize: 28,
    color: "#fff",
    fontWeight: "bold",
  },
  categories: {
    maxHeight: 115,
    backgroundColor: "#EFEFEF",
    marginHorizontal: 18,
    borderRadius: 8,
    zIndex: 9,
  },
  main: {
    backgroundColor: "#FFF",
    flex: 1,
    marginTop: -30,
  },
  title: {
    fontSize: 21,
    paddingHorizontal: 18,
    marginBottom: 14,
    fontWeight: "bold",
    color: "#162133",
  },
});
